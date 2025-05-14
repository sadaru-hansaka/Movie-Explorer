import React,{useState,useEffect} from 'react';
import { getTrending , getPopular} from '../api/tmdb';

import MovieCard from "../components/MovieCard";
import { Box } from "@mui/material";


function HomeScreen({results}){

    // save trending movies
    const [trending, setTrending]=useState([]);

    // display movies
    const [movie,setMovies]=useState([]);
    const [page,setPages]=useState(1);

    // fetch trending movies
    useEffect(()=>{
      const fetchTrending = async () => {
          const res = await getTrending();
          setTrending(res.data.results)
      }
      fetchTrending();
    },[]);

    // displat set of movies
    const fetchMovies = async (pageNumber) => {
      try{
          const res = await getPopular(pageNumber);
          const newMovies = res.data.results;

          setMovies((prev) => {
            const existingIDS = new Set(prev.map((m)=>m.id));
            const filtered = newMovies.filter((m) => !existingIDS.has(m.id));
            return[...prev, ...filtered];
          });
      
      }catch(err){
          console.error("Error fetching movies")
      }
    };
    
    useEffect(()=>{
        fetchMovies(1);
    },[]);

// when button click it loads more movies
    const loadMore = () => {
        const nextPage = page + 1;
        fetchMovies(nextPage);
        setPages(nextPage);
    };
    

    

    return (
      <div>
        <div>
          <Box sx={{ display: "flex", overflowX: "auto", gap: 2, padding: 2 }}>
            {results.map((movie) => (
                <MovieCard
                    key={movie.id}
                    id={movie.id}
                    title={movie.title}
                    year={movie.release_date?.split('-')[0]}
                    rating={movie.vote_average}
                    posterPath={movie.poster_path}
                />
            ))}
          </Box>
        </div>
        <h1>Trending Movies</h1>
        <Box sx={{ display: "flex", overflowX: "auto", gap: 2, padding: 2 }}>
          {trending.map((movie) => (
              <MovieCard
              key={movie.id}
              id={movie.id}
              title={movie.title}
              year={movie.release_date?.split('-')[0]}
              rating={movie.vote_average}
              posterPath={movie.poster_path}
              />
          ))}
        </Box>
        <h1>Movies</h1>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
          {movie.map((movie) => (
            <MovieCard
              key={movie.id}
              id={movie.id}
              title={movie.title}
              year={movie.release_date?.split("-")[0]}
              rating={movie.vote_average}
              posterPath={movie.poster_path}
            />
          ))}
          <div style={{ width: "100%", textAlign: "center", marginTop: "20px" }}>
            <button onClick={loadMore}>Load More</button>
          </div>
        </div>
      </div>
    
  );
}

export default HomeScreen;