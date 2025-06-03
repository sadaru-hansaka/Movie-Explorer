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
import SignIn from './screens/SignIn';
import {auth} from './Firebase/firebase';
import { AuthProvider } from './contexts/AuthContext';
import Profile from './screens/Profile';

function App() {
  const [mode, setMode] = useState('light');
  // search movies
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [text,setText] = useState('');

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
      setText(`Search results for "${query}"`);
  };

  // Sign in part
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => setUser(u));
    return () => unsubscribe();
  }, []);

  return(
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <Router>
        <AuthProvider>
        <FavoritesProvider>
          
            <NavBar query={query} setQuery={setQuery} handleSearch={handleSearch} mode={mode} handleToggle={handleToggle} user={user}/>
          
            <Routes>
              <Route path="/" element={<HomeScreen results={results} text={text}/>} />
              <Route path="/movie/:id" element={<MovieDetails/>} />
              <Route path="/movie/fav" element={<FavouriteMovies/>}/>
              <Route path="/movie/sign" element={<SignIn/>}/>
              <Route path='/profile' element={<Profile/>}/>
            </Routes>
          
        </FavoritesProvider>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
