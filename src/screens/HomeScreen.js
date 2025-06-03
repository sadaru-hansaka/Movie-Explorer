import React,{useState,useEffect} from 'react';
import { getTrending , getPopular} from '../api/tmdb';

import MovieCard from "../components/MovieCard";
import { Box ,Button, Typography} from "@mui/material";
import { useTheme } from '@mui/material/styles';
import MovieFilter from '../components/MovieFilter';


function HomeScreen({results,text}){

    // save trending movies
    const [trending, setTrending]=useState([]);

    // display movies
    const [movie,setMovies]=useState([]);
    const [page,setPages]=useState(1);

    // fetch trending movies
    useEffect(()=>{
      const fetchTrending = async () => {
          const res = await getTrending();
          setTrending(res.data.results)
      }
      fetchTrending();
    },[]);

    // displat set of movies
    const fetchMovies = async (pageNumber) => {
      try{
          const res = await getPopular(pageNumber);
          const newMovies = res.data.results;

          setMovies((prev) => {
            const existingIDS = new Set(prev.map((m)=>m.id));
            const filtered = newMovies.filter((m) => !existingIDS.has(m.id));
            return[...prev, ...filtered];
          });
      
      }catch(err){
          console.error("Error fetching movies")
      }
    };
    
    useEffect(()=>{
        fetchMovies(1);
    },[]);

// when button click it loads more movies
    const loadMore = () => {
        const nextPage = page + 1;
        fetchMovies(nextPage);
        setPages(nextPage);
    };
    
    const theme = useTheme();

    return (
      <Box sx={{display:"block", padding:"10px",flexDirection:"column",alignItems:"center",paddingTop:"80px",p:{xs:2, sm:3},
        bgcolor: theme.palette.background.default,
        color: theme.palette.text.primary,
        }}>
        <MovieFilter />
        <Typography variant='h4'>{text}</Typography>
        <Box sx={{ display: "flex", overflowX: "auto", gap: 2,pb:1,mt:2,
          "&::-webkit-scrollbar": {
              height: "6px",
          },
          "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#888",
              borderRadius: "4px",
          },
        }}>
          {results.map((movie) => (
              <MovieCard key={movie.id} movie={movie}/>
          ))}
        </Box>
        <Typography variant='h4' sx={{mt:2}}>This Week Trendings</Typography>
        <Box sx={{ display: "flex", overflowX: "auto", gap: 2,pb:1,mt:2,
          "&::-webkit-scrollbar": {
              height: "6px",
          },
          "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#888",
              borderRadius: "4px",
          },
        }}>
          {trending.map((movie) => (
              <MovieCard key={movie.id} movie={movie}/>
          ))}
        </Box>
        <Typography variant='h4' sx={{mt:2}}>Movies</Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap:{xs:1,sm:2}, justifyContent:"space-evenly",alignItems:"center",mt:2}}>
          {movie.map((movie) => (
            <MovieCard key={movie.id} movie={movie}/>
          ))}
          <div style={{ width: "100%", textAlign: "center", marginTop: "20px" }}>
            <Button variant="outlined" onClick={loadMore}>Load More</Button>
          </div>
        </Box>
      </Box>
    
  );
}

export default HomeScreen;