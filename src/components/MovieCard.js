
import React from 'react';
import { Card, CardMedia, CardContent, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import HeartIcon from '@mui/icons-material/FavoriteBorder';

function MovieCard({id,title, year, rating, posterPath }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/movie/${id}`);
  };

  const posterUrl = posterPath
    ? `https://image.tmdb.org/t/p/w500${posterPath}`
    : 'https://via.placeholder.com/300x450?text=No+Image';

  return (
    <Card  sx={{ width: 250,display: 'flex',flexDirection: 'column', backgroundColor: '#1e1e1e', color: 'white',flexShrink: 0 }}>
      <CardMedia
        component="img"
        height="300"
        image={posterUrl}
        alt={title}
        onClick={handleClick}
      />
      <CardContent>
        <Typography variant="h6" noWrap>{title} ({year})</Typography>
        <Typography variant="body2">⭐ {rating}</Typography>
        <HeartIcon/>
      </CardContent>
    </Card>
  );
}

export default MovieCard;
