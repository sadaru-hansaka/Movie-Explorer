import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import HomeScreen from './screens/HomeScreen';
import MovieDetails from './screens/MovieDetails';
import FavouriteMovies from './screens/FavouriteMovies';


function App() {
  return(
    <Router>
      <Routes>
        <Route path="/" element={<HomeScreen/>} />
        <Route path="/movie/:id" element={<MovieDetails/>} />
        <Route path="/movie/fav" element={<FavouriteMovies/>}/>
      </Routes>
    </Router>
  );
}

export default App;
