import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box , TextField,IconButton} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';


function NavBar({query,setQuery,handleSearch}){

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') handleSearch();
    };

    return(
        <AppBar position='fixed'>
            <Toolbar sx={{display:"flex", justifyContent:"center"}}>
                <Typography variant='h6' component="div" sx={{flexGrow:1}}>
                    Movie Explorer
                </Typography>
                <Box sx={{display:"flex", justifyContent:"center",alignItems:"center"}}>
                    <TextField
                        label="Search for Movies..."
                        // variant='outlined'
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyPress={handleKeyPress}
                        size="small"
                        sx={{ backgroundColor: "white", borderRadius: 3 }}
                    />
                    <IconButton onClick={handleSearch} color="inherit">
                        <SearchIcon />
                    </IconButton>
                </Box>
                

                <Box>
                    <Button component={Link} to="/" color="inherit">Home</Button>
                    <Button component={Link} to="/movie/fav" color="inherit">Favorites</Button>
                </Box>
                
            </Toolbar>
        </AppBar>
    )
}

export default NavBar;