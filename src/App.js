import React,{useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import HomeScreen from './screens/HomeScreen';
import MovieDetails from './screens/MovieDetails';
import FavouriteMovies from './screens/FavouriteMovies';
import NavBar from './components/NavBar';
import { searchMovies } from './api/tmdb';
import { FavoritesProvider } from './contexts/FavouriteContexts';


function App() {
  // search movies
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
      const res = await searchMovies(query);
      setResults(res.data.results);
  };

  return(
    <FavoritesProvider>
      <Router>
        <NavBar query={query} setQuery={setQuery} handleSearch={handleSearch}/>
        <Routes>
          <Route path="/" element={<HomeScreen results={results}/>} />
          <Route path="/movie/:id" element={<MovieDetails/>} />
          <Route path="/movie/fav" element={<FavouriteMovies/>}/>
        </Routes>
      </Router>
    </FavoritesProvider>
  );
}

export default App;
