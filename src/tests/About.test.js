import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import About from '../pages/About';

describe('2. Teste o componente <About.js />', () => {
  test('2.1- Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    renderWithRouter(<About />);

    const aboutHead = screen.getByRole('heading', {
      name: /About Pokédex/i,
      level: 2,
    });
    expect(aboutHead).toBeInTheDocument();
  });

  test('2.2- Teste se a página contém dois parágrafos com texto sobre Pokédex', () => {
    renderWithRouter(<About />);

    const paragraphsPokedex = screen.getAllByText(/pokémon/i);
    expect(paragraphsPokedex).toHaveLength(2);
  });

  test('2.3- Teste se a página contém a seguinte imagem de uma Pokédex', () => {
    renderWithRouter(<About />);

    const imgPokedex = screen.getByRole('img', { name: /pokédex/i });
    const srcImgPokedex = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    expect(imgPokedex).toBeInTheDocument();
    expect(imgPokedex).toHaveProperty('src', srcImgPokedex);
  });
});
