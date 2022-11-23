import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemon from '../pages/FavoritePokemon';

describe('3. Teste o componente <FavoritePokemon.js >', () => {
  test('3.1- Teste se é exibida na tela a mensagem "No favorite pokemon found"', () => {
    renderWithRouter(<FavoritePokemon />);
    const favNotFound = screen.getByText('No favorite Pokémon found');
    expect(favNotFound).toBeInTheDocument();
  });
});
