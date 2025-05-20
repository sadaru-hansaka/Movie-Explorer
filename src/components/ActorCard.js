import React from 'react';
import { Card,CardMedia,CardContent,Typography,Box } from '@mui/material';

function ActorCard({actor}){
    const imageUrl = actor.profile_path
        ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
        : 'https://via.placeholder.com/200x300?text=No+Image';

    return (
        <Card sx={{ width: 180,display: 'flex',flexDirection: 'column', backgroundColor: '#1e1e1e', color: 'white',flexShrink: 0 }}>
            <CardMedia
                component="img"
                height="200"
                image={imageUrl}
                alt={actor.name}
            />
            <CardContent>
                <Typography variant='h6'>{actor.name}</Typography>
                <Typography variant='h7'>{actor.character}</Typography>
            </CardContent>
        </Card>
    )
}

export default ActorCard;