import React, { createContext, useState, useContext } from 'react';

const FavoritesContext = createContext();

// custom hook
export const useFavorites = () => useContext(FavoritesContext);

export const FavoritesProvider = ({ children }) => {
    // stores favourite movies
  const [favorites, setFavorites] = useState([]);

//   add movies if there are no same details
  const addFavorite = (movie) => {
    if (!favorites.some((fav) => fav.id === movie.id)) {
      setFavorites([...favorites, movie]);
    }
  };

//   remove movies
  const removeFavorite = (id) => {
    setFavorites(favorites.filter((movie) => movie.id !== id));
  };

//   checks the movie is already in favourite
  const isFavorite = (id) => {
    return favorites.some((movie) => movie.id === id);
  };

//   share context
  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};
