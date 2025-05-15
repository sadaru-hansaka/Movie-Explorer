import React from "react";
import {useFavorites} from '../contexts/FavouriteContexts';
import MovieCard from "../components/MovieCard";
import { Typography,Box } from "@mui/material";

function FavouriteMovies(){
    const {favorites} = useFavorites();
    return(
        <Box sx={{display:"flex",flexDirection:"column",alignItems:"center", padding:2,paddingTop:"70px"}}>
            <Typography variant="h4" gutterBottom>
                Favorite Movies
            </Typography>
            <Box sx={{ display: "flex",alignItems:"center",justifyContent:"center", flexWrap: "wrap", gap: "16px" }}>
                {favorites.length === 0? (
                    <Typography>No Favorite Movies Yet!</Typography>
                ):(
                    favorites.map((movie)=>(
                        <MovieCard key={movie.id} movie={movie}/>
                    ))
                )}
            </Box>
        </Box>
    );
}

export default FavouriteMovies