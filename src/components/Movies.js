import React, { useEffect, useState } from 'react';
import { getPopular } from '../api/tmdb';
import MovieCard from '../components/MovieCard';

function Movies() {
    const [movie,setMovies]=useState([]);
    const [page,setPages]=useState(1);

    const fetchMovies = async (pageNumber) => {
        try{
            const res = await getPopular(pageNumber);
            setMovies((prev)=>[...prev,...res.data.results]);
        
        }catch(err){
            console.error("Error fetching movies")
        }
    };

    useEffect(()=>{
        fetchMovies();
    },[]);


    const loadMore = () => {
        const nextPage = page + 1;
        fetchMovies(nextPage);
        setPages(nextPage);
    };

    return (
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
  );
}

export default Movies;