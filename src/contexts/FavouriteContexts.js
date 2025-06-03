import React, { createContext, useState, useContext ,useEffect} from 'react';
import { db } from '../Firebase/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../Firebase/firebase';
import { useNavigate } from 'react-router-dom';

const FavoritesContext = createContext();

// custom hook
export const useFavorites = () => useContext(FavoritesContext);

export const FavoritesProvider = ({ children }) => {
    // stores favourite movies
  const [favorites, setFavorites] = useState([]);
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFavorites = async () => {
      if (user) {
        try {
          const favSnapshot = await db
            .collection('users')
            .doc(user.uid)
            .collection('favorites')
            .get();

          const favs = favSnapshot.docs.map(doc => doc.data());
          setFavorites(favs);
        } catch (error) {
          console.error("Error fetching favorites:", error);
        }
      } else {
        setFavorites([]);
      }
    };

    fetchFavorites();
  }, [user]);


//   add movies if there are no same details
  const addFavorite = async (movie) => {

    if (!user) {
      navigate('/movie/sign');
      return;
    }

    if (!favorites.some((fav) => fav.id === movie.id)) {
      try {
      await db
        .collection('users')
        .doc(user.uid)
        .collection('favorites')
        .doc(String(movie.id))
        .set(movie);
        setFavorites([...favorites, movie]);
      } catch (error) {
        console.error("Error adding favorite:", error);
      }
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
    <FavoritesContext.Provider value={{ favorites,setFavorites ,addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};
