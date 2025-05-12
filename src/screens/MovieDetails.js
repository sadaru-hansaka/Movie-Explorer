import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieDetails, getMovieVideos } from '../api/tmdb';

function MovieDetails(){
    const {id} = useParams();
    const[movie,setMovie]=useState(null);
    const [trailerKey, setTrailerKey] = useState(null);

    useEffect(()=>{
        const fetchDetails = async () => {
            const res = await getMovieDetails(id);
            setMovie(res.data);
            console.log(res.data)
        };
        const fetTrailers = async () => {
            const res = await getMovieVideos(id);
            const trailer = res.data.results.find(
                (video) => video.type === 'Trailer' && video.site === "YouTube"
            );
            if (trailer) setTrailerKey(trailer.key);
        };
        fetchDetails();
        fetTrailers();
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

            {trailerKey && (
                <div style={{ marginTop: 20 }}>
                    <h3>Trailer</h3>
                    <iframe
                        width="560"
                        height="315"
                        src={`https://www.youtube.com/embed/${trailerKey}`}
                        title="YouTube trailer"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                </div>
            )}
        </div>
    )
}

export default MovieDetails;