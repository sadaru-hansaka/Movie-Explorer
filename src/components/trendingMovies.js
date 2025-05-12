import React, {useEffect, useState} from "react";
import { getTrending } from "../api/tmdb";
import MovieCard from "../components/MovieCard";
import { Box } from "@mui/material";

function TrendingMovies() {
    const [result, setResult] = useState([]);
    useEffect(()=>{
        const fetchTrending = async () => {
            const res = await getTrending();
            setResult(res.data.results)
        }
        fetchTrending();

    },[]);

    return (
        <div>
            <h1>Trending Movies</h1>
            <Box sx={{ display: "flex", overflowX: "auto", gap: 2, padding: 2 }}>
            {result.map((movie) => (
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
    );
}

export default TrendingMovies;