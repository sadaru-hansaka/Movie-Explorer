import React,{useState} from 'react';
import SearchBar from  '../components/SearchBar';
import { searchMovies } from '../api/tmdb';
import TrendingMovies from '../components/trendingMovies';
import SearchedMovies from '../components/searchedMovies';
import Movies from '../components/Movies';


function HomeScreen(){
    // search movies
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);

    const handleSearch = async () => {
        const res = await searchMovies(query);
        setResults(res.data.results);
    };

    return (
    <div>
      <h1>Movie Explorer App</h1>
      <SearchBar query={query} setQuery={setQuery}/>
      <button onClick={handleSearch}>Search</button>
      <SearchedMovies results={results}/>
      <TrendingMovies/>
      <Movies/>
    </div>
  );
}

export default HomeScreen;