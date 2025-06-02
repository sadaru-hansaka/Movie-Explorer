import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieDetails, getMovieVideos,getMovieCredits } from '../api/tmdb';
import { Box,Typography,IconButton,Button,Dialog,DialogContent} from "@mui/material";
import ActorCard from '../components/ActorCard';
import { useTheme } from '@mui/material/styles';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useFavorites } from '../contexts/FavouriteContexts';
import Tooltip from '@mui/material/Tooltip';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import CloseIcon from '@mui/icons-material/Close';

function MovieDetails(){
    const {addFavorite,removeFavorite,isFavorite} = useFavorites();

    const {id} = useParams();
    const[movie,setMovie]=useState(null);
    const [trailerKey, setTrailerKey] = useState(null);
    const[cast,setCast]=useState([]);

    // change background image opacity according to the theme
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';
    const backgroundOpacity = isDarkMode ? 0.6 : 1;

    // trailer video open/close
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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

    // background image for the movie details
    const backgroundImage = movie.backdrop_path
        ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
        : 'https://via.placeholder.com/300x450?text=No+Image';

    return(
        <Box sx={{ padding:"10px", paddingTop:"100px",paddingBottom:"50px" }}>
            <Box sx={{
                    position:'relative',
                    padding:4,
                    overflow: 'hidden',
                    '::before': {
                    content: '""',
                    position: 'absolute',
                    inset: 0,
                    zIndex: 0,
                    backgroundImage: `url(${backgroundImage})`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    opacity: backgroundOpacity, 
                    pointerEvents: 'none', 
                    },
                    
                }}>
                <Box sx={{position:'relative',display:'flex', flexDirection:{xs:'column', md:'row'} ,justifyContent:'left'}}>
                    <img
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                        style={{ maxWidth: 300 , borderRadius:"10px"}}
                    />
                    {/* <h2>{movie.title} ({movie.release_date?.split('-')[0]})</h2> */}
                    <Box sx={{padding:2, color: 'white', textShadow: '0px 0px 10px rgba(0,0,0,0.7)' }}>
                        <Typography variant='h3'>{movie.title} ({movie.release_date?.split('-')[0]})</Typography>
                        <Typography variant='h5' mb={2}>{movie.tagline}</Typography>
                        <Typography variant='body1'>Release Date : {movie.release_date}</Typography>
                        <Typography variant='body1'>Ratings :⭐ {movie.vote_average}</Typography>
                        <Typography variant='body1' mb={2}>Genres : {movie.genres.map(g => g.name).join(' | ')}</Typography>

                        <Tooltip title={isFavorite(movie.id) ? "Remove from favorites" : "Mark as favorite"}>
                            <IconButton sx={{border:'1px solid white'}} onClick={()=>{
                                isFavorite(movie.id) ? removeFavorite(movie.id) : addFavorite(movie);
                            }}>
                                {isFavorite(movie.id) ? <FavoriteIcon color="error"/> : <FavoriteBorderIcon sx={{color:"white"}} />}
                            </IconButton>
                        </Tooltip>

                        {/* watch trailer button */}
                        {/* when user clicked this button the movies trailer will display on a pop up screen */}
                        <Button variant='outlined' startIcon={<PlayArrowIcon />} onClick={handleOpen} sx={{
                            color: 'white',
                            borderColor: 'white',
                            '&:hover': {
                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                            borderColor: 'white',
                            },
                            borderRadius: '20px',
                            paddingX: 2,
                            margin:2
                        }}>Play Trailer</Button>
                        {/* display trailer video */}
                        <Dialog
                            open={open}
                            onClose={handleClose}
                            maxWidth="md"
                            fullWidth
                            PaperProps={{
                            sx: { backgroundColor: 'black' },
                            }}
                        >
                            <DialogContent sx={{ position: 'relative', padding: 0 }}>
                            <IconButton
                                onClick={handleClose}
                                sx={{ position: 'absolute', top: 8, right: 8, color: 'white', zIndex: 2 }}
                            >
                                <CloseIcon />
                            </IconButton>
                            <iframe
                                width="100%"
                                height="500"
                                src={`https://www.youtube.com/embed/${trailerKey}`}
                                title="YouTube Trailer"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                            </DialogContent>
                        </Dialog>

                        <Typography variant='h6' mt={2}>Overview</Typography>
                        <Typography variant='body1'>{movie.overview}</Typography>
                    </Box>
                </Box>
            </Box>

            <Box sx={{backgroundColor: (theme) => theme.palette.primary.main + '20',p:2,mt:2,borderRadius:2}}>

                <Box sx={{display:'flex',justifyContent:'space-around',p:2, border:"2px solid white", borderRadius:2}}>
                    <Typography variant='body1'>Spoken Languages : {movie.spoken_languages.map(lang => lang.english_name).join(" | ")}</Typography>
                    <Typography variant='body1'>Origin Country : {movie.origin_country.join(" | ")}</Typography>
                    <Typography variant='body1'>Budget : $ {movie.budget.toLocaleString()}</Typography>
                    <Typography variant='body1'>Visit :  
                        <a href={movie.homepage} target="_blank" rel="noopener noreferrer" style={{ color: 'blue' }}>
                            Official Movie Site
                        </a>
                    </Typography>
                </Box>

                <Typography variant='h5' sx={{p:2}}>Cast & crew</Typography>
                <Box sx={{ display: "flex", overflowX: "auto", gap: 2 ,pb:1,
                    "&::-webkit-scrollbar": {
                        height: "6px",
                    },
                    "&::-webkit-scrollbar-thumb": {
                        backgroundColor: "black",
                        borderRadius: "4px",
                    },
                }}>
                    {cast.map((actor) => (
                        <ActorCard key={actor.cast_id} actor={actor}/>
                    ))}
                </Box>
            </Box>

            
        </Box>
    )
}

export default MovieDetails;