import React from 'react';
import { Card,CardMedia,CardContent,Typography,IconButton,Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useFavorites } from '../contexts/FavouriteContexts';
import Tooltip from '@mui/material/Tooltip';
import { BrokenImage } from '@mui/icons-material';

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

  return (
    // movie card
    <Card  sx={{ width: 250,height:400,display: 'flex',flexDirection: 'column', backgroundColor: '#1e1e1e', color: 'white',flexShrink: 0 }}>
      {/* movie card image area */}
      {movie.poster_path ? (
      <CardMedia
        component="img"
        image={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
        alt={movie.title}
        onClick={handleClick}

        sx={{
          width: '100%',
          height: '300px',
          objectFit: 'fill', // makes the image cover the entire area while preserving aspect ratio
          cursor: 'pointer',
        }}
      />
      ) : (
        // if there's no poster the broken image icon will display
        <Box
          onClick={handleClick}
          sx={{
            width: '100%',
            height: '300px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#333',
            cursor: 'pointer',
          }}
        >
          <BrokenImage sx={{ fontSize: 60, color: '#aaa' }} />
        </Box>
      )}

      {/* Title , Ratings and favourite icon */}
      <CardContent>
        <Typography onClick={handleClick} variant="h6" noWrap>{movie.title} ({movie.release_date?.split('-')[0]})</Typography>
        <Box sx={{display:"flex", alignItems:"center",justifyContent:"space-between"}}>
          <Typography variant="body2">⭐ {movie.vote_average}</Typography>
          {/* favoutite icon */}
          <Tooltip title={fav ? "Remove from favorites" : "Mark as favorite"}>
            <IconButton onClick={clickFavourite}>
              {fav ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon sx={{color:"white"}} />}
            </IconButton>
          </Tooltip>
        </Box>
      </CardContent>
    </Card>
  );
}

export default MovieCard;
