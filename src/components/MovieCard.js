import React from 'react';
import { Card,CardMedia,CardContent,Typography,IconButton,Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useFavorites } from '../contexts/FavouriteContexts';

function MovieCard({movie}) {
  const {addFavorite,removeFavorite,isFavorite} = useFavorites();
  const fav = isFavorite(movie.id);

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/movie/${movie.id}`);
  };

  const clickFavourite = () => {
    fav ? removeFavorite(movie.id) : addFavorite(movie);
  }

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://via.placeholder.com/300x450?text=No+Image';

  return (
    <Card  sx={{ width: 280,display: 'flex',flexDirection: 'column', backgroundColor: '#1e1e1e', color: 'white',flexShrink: 0 }}>
      <CardMedia
        component="img"
        height="300"
        image={posterUrl}
        alt={movie.title}
        onClick={handleClick}
      />
      <CardContent>
        <Typography onClick={handleClick} variant="h6" noWrap>{movie.title} ({movie.release_date?.split('-')[0]})</Typography>
        
        <Box sx={{display:"flex", alignItems:"center",justifyContent:"space-between"}}>
          <Typography variant="body2">⭐ {movie.vote_average}</Typography>
          <IconButton onClick={clickFavourite}>
            {fav ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon sx={{color:"white"}} />}
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
}

export default MovieCard;
