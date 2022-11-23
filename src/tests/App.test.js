import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste o componente <App.js />', () => {
  test(
    'Teste se o topo da aplicação contém um conjunto fixo de links de navegação',
    () => {
      renderWithRouter(<App />);

      const linkHome = screen.getByRole('link', {
        name: /Home/i,
      });
      expect(linkHome).toBeInTheDocument();

      const linkAbout = screen.getByRole('link', {
        name: /About/i,
      });
      expect(linkAbout).toBeInTheDocument();

      const linkFavoritePokemon = screen.getByRole('link', {
        name: /Favorite Pokémon/i,
      });
      expect(linkFavoritePokemon).toBeInTheDocument();
    },
  );

  test(
    'Teste se a aplicação é redirecionada para a página inicial Home',
    () => {
      const { history } = renderWithRouter(<App />);

      const linkHome = screen.getByRole('link', {
        name: /Home/i,
      });

      const { pathname } = history.location;
      expect(pathname).toBe('/');

      expect(linkHome).toBeInTheDocument();
      userEvent.click(linkHome);
    },
  );

  test(
    'Teste se a aplicação é redirecionada para a página de About',
    () => {
      const { history } = renderWithRouter(<App />);
      const linkAbout = screen.getByRole('link', {
        name: /About/i,
      });

      const { pathname } = history.location;
      expect(pathname).toBe('/');

      expect(linkAbout).toBeInTheDocument();
      userEvent.click(linkAbout);
    },
  );

  test(
    'Teste se a aplicação é redirecionada para a página de Pokémons Favoritados',
    () => {
      const { history } = renderWithRouter(<App />);
      const linkFavoritePokemon = screen.getByRole('link', {
        name: /Favorite Pokémon/i,
      });

      const { pathname } = history.location;
      expect(pathname).toBe('/');

      expect(linkFavoritePokemon).toBeInTheDocument();
      userEvent.click(linkFavoritePokemon);
    },
  );
});
