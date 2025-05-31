import React from 'react';
import { Card,CardMedia,CardContent,Typography} from '@mui/material';
import fallBackImage from '../images/no-photo.jpg'

function ActorCard({actor}){
    const imageUrl = actor.profile_path
        ? `https://image.tmdb.org/t/p/original${actor.profile_path}`
        : fallBackImage;

    return (
        <Card sx={{ width: 150,display: 'flex',flexDirection: 'column', backgroundColor: '#1e1e1e', color: 'white',flexShrink: 0,borderRadius:"10px" }}>
            <CardMedia
                component="img"
                height="200"
                image={imageUrl}
                alt={actor.name}
                sx={{
                    objectFit:'fill',
                    // height:'auto'
                }}
            />
            <CardContent sx={{ padding: 1, margin: 0, '&:last-child': { paddingBottom: 1 } }}>
                <Typography variant='body2' sx={{padding:0 ,margin:0}}>{actor.name}</Typography>
            </CardContent>
        </Card>
    )
}

export default ActorCard;