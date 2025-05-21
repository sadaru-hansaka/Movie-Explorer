import React, { act, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieDetails, getMovieVideos,getMovieCredits } from '../api/tmdb';
import { Box,Typography} from "@mui/material";
import ActorCard from '../components/ActorCard';

function MovieDetails(){
    const {id} = useParams();
    const[movie,setMovie]=useState(null);
    const [trailerKey, setTrailerKey] = useState(null);
    const[cast,setCast]=useState([]);

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
        const fetchCredits = async () => {
            const credit = await getMovieCredits(id);
            setCast(credit.data.cast);
            console.log(credit.data);
        }
        fetchDetails();
        fetTrailers();
        fetchCredits();
    },[id]);

    if (!movie) return <p>Loading...</p>;

    return(
        <Box sx={{ padding:"10px", paddingTop:"100px" }}>
            <Box sx={{display:'flex', flexDirection:{xs:'column', md:'row'}, padding:4,backgroundColor:'#1e1e1e'}}>
                <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    style={{ maxWidth: 300 }}
                />
                {/* <h2>{movie.title} ({movie.release_date?.split('-')[0]})</h2> */}
                <Typography variant='h2'>{movie.title} ({movie.release_date?.split('-')[0]})</Typography>
                <p><strong>Rating:</strong> ⭐ {movie.vote_average}</p>
                <p><strong>Overview:</strong> {movie.overview}</p>
                <p><strong>Genres:</strong> {movie.genres.map(g => g.name).join(', ')}</p>
            </Box>

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
        
            <Box sx={{ display: "flex", overflowX: "auto", gap: 2}}>
                {cast.map((actor) => (
                    <ActorCard key={actor.cast_id} actor={actor}/>
                ))}
            </Box>
        </Box>
    )
}

export default MovieDetails;