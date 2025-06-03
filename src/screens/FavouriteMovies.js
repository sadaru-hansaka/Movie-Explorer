import React,{useEffect} from "react";
import {useFavorites} from '../contexts/FavouriteContexts';
import MovieCard from "../components/MovieCard";
import { Typography,Box } from "@mui/material";



function FavouriteMovies(){
    const {favorites,setFavorites} = useFavorites();

    return(
        <Box sx={{display:"flex",flexDirection:"column", padding:2,paddingTop:"80px"}}>
            <Typography variant="h4" gutterBottom>
                Favorite Movies
            </Typography>
            
            {favorites.length === 0? (
                <Box sx={{display:'flex',height:'100%',width:'100%',justifyContent:'center',alignItems:'center',textAlign:'center',justifyItems:'center', minHeight: '80vh',flexDirection:'column'}}>
                    <Typography variant="body1">No Favorite Movies Yet !</Typography>
                    <Typography variant="body2">Add favorites by cliking Favorite icon.</Typography>
                </Box>
            ):(
                <Box sx={{ display: "flex", flexWrap: "wrap", gap:{xs:1,sm:2}, justifyContent:"space-evenly",alignItems:"center",mt:2}}>
                    {favorites.map((movie) =>(
                        <MovieCard key={movie.id} movie={movie}/>
                    ))}
                </Box>
            )}
        </Box>
    );
}

export default FavouriteMovies