
import React from 'react';
import { Card, CardMedia, CardContent, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function MovieCard({id,title, year, rating, posterPath }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/movie/${id}`);
  };

  const posterUrl = posterPath
    ? `https://image.tmdb.org/t/p/w500${posterPath}`
    : 'https://via.placeholder.com/300x450?text=No+Image';

  return (
    <Card onClick={handleClick} sx={{ width: 250,display: 'flex',flexDirection: 'column', backgroundColor: '#1e1e1e', color: 'white',flexShrink: 0 }}>
      <CardMedia
        component="img"
        height="300"
        image={posterUrl}
        alt={title}
      />
      <CardContent>
        <Typography variant="h6" noWrap>{title} ({year})</Typography>
        <Typography variant="body2">⭐ {rating}</Typography>
      </CardContent>
    </Card>
  );
}

export default MovieCard;
