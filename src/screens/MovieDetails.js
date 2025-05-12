import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieDetails } from '../api/tmdb';

function MovieDetails(){
    const {id} = useParams();
    const[movie,setMovie]=useState(null);

    useEffect(()=>{
        const fetchDetails = async () => {
            const res = await getMovieDetails(id);
            setMovie(res.data);
            console.log(res.data)
        };
        fetchDetails();
    },[id]);

    if (!movie) return <p>Loading...</p>;

    return(
        <div style={{ padding: 20 }}>
            <h2>{movie.title} ({movie.release_date?.split('-')[0]})</h2>
            <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                style={{ maxWidth: 300 }}
            />
            <p><strong>Rating:</strong> ⭐ {movie.vote_average}</p>
            <p><strong>Overview:</strong> {movie.overview}</p>
            <p><strong>Genres:</strong> {movie.genres.map(g => g.name).join(', ')}</p>
        </div>
    )
}

export default MovieDetails;