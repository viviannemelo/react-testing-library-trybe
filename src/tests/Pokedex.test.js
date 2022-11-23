import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemonList from '../data';

describe('Teste o componente <Pokedex.js />', () => {
  test('Teste se a página contém um heading h2 com o texto Encountered Pokémon', () => {
    renderWithRouter(<App />);

    const titleHeading = screen.getByRole('heading', {
      name: /encountered pokémon/i,
      level: 2,
    });

    expect(titleHeading).toBeInTheDocument();
  });

  test('Teste se é exibido o próximo Pokémon da lista quando o botão Próximo Pokémon é clicado', () => {
    renderWithRouter(<App />);

    const buttonNextPokemon = screen.getByRole('button', { name: /Próximo Pokémon/ });
    const pokemonName = screen.getByTestId('pokemon-name');

    pokemonList.forEach((nextPokemon) => {
      userEvent.click(buttonNextPokemon);
      expect(pokemonName).toBeInTheDocument(nextPokemon);
    });
  });

  test('Teste se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);

    const buttonType = screen.getAllByTestId('pokemon-type-button');
    const typesOfPokemon = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];
    buttonType.forEach((pokemon, index) => {
      expect(pokemon).toHaveTextContent(typesOfPokemon[index]);
    });
  });

  test('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);

    const resetFilterButton = screen.getByText('All');

    userEvent.click(resetFilterButton);
    expect(resetFilterButton).toBeInTheDocument();
  });
});
