import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemonList from '../data';

describe('Testa o componente <Pokemon />', () => {
  const pokemonInfo = pokemonList[0];

  test('Testa se é renderizado as informações do pokemon corretamente', () => {
    renderWithRouter(<App />);
    const { averageWeight: { value, measurementUnit } } = pokemonInfo;

    const namePikachu = screen.getByTestId('pokemon-name');
    const typePikachu = screen.getByTestId('pokemon-type');
    const weightPikachu = screen.getByTestId('pokemon-weight');
    const imagePikachu = screen.getByRole('img', {
      name: /pikachu sprite/i,
    });

    expect(namePikachu).toHaveTextContent(pokemonInfo.name);
    expect(typePikachu).toHaveTextContent(pokemonInfo.type);
    expect(weightPikachu).toHaveTextContent(
      `Average weight: ${value} ${measurementUnit}`,
    );
    expect(imagePikachu).toHaveAttribute('src', pokemonInfo.image);
    expect(imagePikachu).toHaveAttribute('alt', `${pokemonInfo.name} sprite`);
  });

  test('Teste se existe um ícone de estrela nos Pokémon favoritados', () => {
    renderWithRouter(<App />);

    const detailsPikachu = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(detailsPikachu);

    const favPikachu = screen.getByRole('checkbox', {
      name: /pokémon favoritado\?/i,
    });
    userEvent.click(favPikachu);

    const favoriteMarked = screen.getByRole('img', {
      name: /pikachu is marked as favorite/i,
    });
    expect(favoriteMarked).toBeInTheDocument();
    expect(favoriteMarked).toHaveAttribute('src', '/star-icon.svg');
  });

  test('Teste se é exibido na tela o link href /pokemon/<id>', () => {
    const { history } = renderWithRouter(<App />);

    const pokemonDetails = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(pokemonDetails);

    const { location: { pathname } } = history;
    expect(pathname).toBe(`/pokemon/${pokemonInfo.id}`);
  });
});
