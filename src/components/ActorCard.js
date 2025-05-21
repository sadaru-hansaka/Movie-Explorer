import React from 'react';
import { Card,CardMedia,CardContent,Typography} from '@mui/material';
import fallBackImage from '../images/no-photo.jpg'

function ActorCard({actor}){
    const imageUrl = actor.profile_path
        ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
        : fallBackImage;

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