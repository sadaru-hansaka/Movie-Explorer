import React from "react";
import { Box } from "@mui/material";
import MovieCard from "../components/MovieCard";

function SearchedMovies({results}){
    return(
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
    );
}

export default SearchedMovies;