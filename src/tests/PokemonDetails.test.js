import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemonList from '../data';

describe('Testa o componente <PokemonDetails />', () => {
  const pokemonInfo = pokemonList[0];
  test('Teste se as informações detalhadas do Pokémon selecionado são mostradas na tela', () => {
    const { getByText } = renderWithRouter(<App />);

    const detailsPikachu = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(detailsPikachu);

    const detailsName = screen.getByRole('heading', {
      name: `${pokemonInfo.name} Details`,
    });
    const summaryHeading = screen.getByRole('heading', {
      name: /summary/i,
      level: 2,
    });
    const paragraph = getByText(pokemonInfo.summary);

    expect(detailsName).toBeInTheDocument();
    expect(summaryHeading).toBeInTheDocument();
    expect(paragraph).toBeInTheDocument();
  });

  test('Teste se existe na página uma seção com os mapas contendo as localizações do Pokémon', () => {
    const { getAllByAltText } = renderWithRouter(<App />);

    const detailsPikachu = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(detailsPikachu);

    const nameLocation = screen.getByRole('heading', {
      name: `Game Locations of ${pokemonInfo.name}`,
    });
    expect(nameLocation).toBeInTheDocument();

    const screenLocation = [
      'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png',
      'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png',
    ];
    const locationPikachu = getAllByAltText(`${pokemonInfo.name} location`);
    locationPikachu.forEach(
      (location, index) => expect(location.src).toBe(screenLocation[index]),
    );
  });

  test('Teste se o usuário pode favoritar um Pokémon através da página de detalhes', () => {
    renderWithRouter(<App />);
    const detailsPikachu = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(detailsPikachu);

    const checkboxFavorite = screen.getByRole('checkbox', {
      name: /pokémon favoritado\?/i,
    });
    expect(checkboxFavorite).toBeInTheDocument();
    userEvent.click(checkboxFavorite);

    const isMarked = screen.getByRole('img', {
      name: /pikachu is marked as favorite/i,
    });
    expect(isMarked).toBeInTheDocument();
    userEvent.click(checkboxFavorite);
    expect(isMarked).not.toBeInTheDocument();
  });
});
