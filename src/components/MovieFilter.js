import React,{useEffect, useState} from 'react';
import { Box,Button,OutlinedInput, FormControl, InputLabel, Select, MenuItem, Checkbox, ListItemText} from "@mui/material";
import { getGenres,getFilteredData } from '../api/tmdb';
import MovieCard from "../components/MovieCard";

function MovieFilter(){
    // list og genres
    const [genres, setGenres]=useState([]);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [selectedYear, setSelectedYear] = useState('');
    const [filtered,setFiltered] = useState([]);

    // get list of genres
    useEffect(()=> {
        
        const fetchGenres = async () => {
            const res = await getGenres();
            setGenres(res.data.genres)
        }
        fetchGenres();
    },[]);

    // fetch filter movies
    useEffect(()=>{
        if (selectedGenres.length > 0 || selectedYear){
            const fetchFiltered = async () => {
                
                const res = await getFilteredData(selectedGenres,selectedYear);
                setFiltered(res.data.results);
                console.log(res.data.results);
            }
            fetchFiltered();
        }
    },[selectedGenres,selectedYear])

    // get years
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 50 }, (_, i) => currentYear - i); 

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
            },
        },
    };

    const handleChange = (event) => {
        const {
        target: { value },
        } = event;
        setSelectedGenres(
        // On autofill we get a stringified value.
        typeof value === 'string' ? value.split(',') : value,
        );
    };

    // clear filters
    const clearFilter = () => {
        setSelectedGenres([]);
        setSelectedYear('');
        setFiltered([]);
    }

    return(
        <Box>
            <Box sx={{display: "Flex",overflowX: "auto", gap:{xs:1,sm:2},p:1,alignItems:"center",mt:{xs:6,sm:5}}}>
                {/* Select genres */}
                <FormControl sx={{ m: 1, width: 300 }}>
                    <InputLabel id="demo-multiple-checkbox-label">Genres</InputLabel>
                    <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    value={selectedGenres}
                    onChange={handleChange}
                    input={<OutlinedInput label="Genres" />}
                    renderValue={(selected) =>
                        selected
                        .map((id) => genres.find((genre) => genre.id === id)?.name)
                        .join(', ')
                    }
                    MenuProps={MenuProps}
                    >
                    {genres.map((genre) => (
                        <MenuItem key={genre.id} value={genre.id}>
                            <Checkbox checked={selectedGenres.includes(genre.id)} />
                            <ListItemText primary={genre.name} />
                        </MenuItem>
                    ))}
                    </Select>
                </FormControl>

                    {/* Select year */}
                <FormControl sx={{ m: 1, width: 300 }}>
                    <InputLabel id="years-label">Release Year</InputLabel>
                    <Select
                        labelId="years-label"
                        id="years-select"
                        value={selectedYear}
                        // onChange={handleYearChange}
                        onChange={(e) => setSelectedYear(e.target.value)}
                        input={<OutlinedInput label="Release Year" />}
                        MenuProps={MenuProps}
                    >
                        
                        {years.map((year) => (
                        <MenuItem key={year} value={year}>
                            {year}
                        </MenuItem>
                        ))}
                        
                    </Select>
                </FormControl>
                <Button variant='outlined' sx={{height:"50px", p:2, m:1}} onClick={clearFilter}>Clear Filters</Button>
            </Box>

            <Box sx={{ display: "flex", overflowX: "auto", gap: 2,pb:1,
                "&::-webkit-scrollbar": {
                    height: "6px",
                },
                "&::-webkit-scrollbar-thumb": {
                    backgroundColor: "#888",
                    borderRadius: "4px",
                },
                }}>
                {filtered.map((movie) => (
                    <MovieCard key={movie.id} movie={movie}/>
                ))}
            </Box>
                        
        </Box>
    )
}

export default MovieFilter;