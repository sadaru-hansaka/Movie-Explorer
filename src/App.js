import React,{useState,useMemo,useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import HomeScreen from './screens/HomeScreen';
import MovieDetails from './screens/MovieDetails';
import FavouriteMovies from './screens/FavouriteMovies';
import NavBar from './components/NavBar';
import { searchMovies } from './api/tmdb';
import { FavoritesProvider } from './contexts/FavouriteContexts';
import { ThemeProvider, CssBaseline, Switch, FormControlLabel, Box } from '@mui/material';
import {lightTheme,darkTheme} from './theme/Theme';

function App() {
  const [mode, setMode] = useState('light');
  // search movies
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    const savedMode = localStorage.getItem('themeMode') || 'light';
    setMode(savedMode);
  }, []);

  const theme = useMemo(() => (mode === 'light' ? lightTheme : darkTheme), [mode]);

  const handleToggle = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
    localStorage.setItem('themeMode', newMode);
  };


  const handleSearch = async () => {
      const res = await searchMovies(query);
      setResults(res.data.results);
  };

  return(
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <FavoritesProvider>
        <Router>
          <NavBar query={query} setQuery={setQuery} handleSearch={handleSearch} mode={mode} handleToggle={handleToggle}/>
        
          <Routes>
            <Route path="/" element={<HomeScreen results={results}/>} />
            <Route path="/movie/:id" element={<MovieDetails/>} />
            <Route path="/movie/fav" element={<FavouriteMovies/>}/>
          </Routes>
        </Router>
      </FavoritesProvider>
    </ThemeProvider>
  );
}

export default App;
