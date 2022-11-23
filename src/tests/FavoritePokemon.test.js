import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemon from '../pages/FavoritePokemon';

describe('Teste o componente <FavoritePokemon.js >', () => {
  test('Teste se é exibida na tela a mensagem "No favorite pokemon found"', () => {
    renderWithRouter(<FavoritePokemon />);
    const favNotFound = screen.getByText('No favorite Pokémon found');
    expect(favNotFound).toBeInTheDocument();
  });
});
