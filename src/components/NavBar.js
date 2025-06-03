import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box ,Drawer,List,ListItem,ListItemText,IconButton,FormControlLabel,Switch,useTheme, useMediaQuery} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';
import { styled ,alpha} from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';

// ui theme
const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(22px)',
      '& .MuiSwitch-thumb:before': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          '#fff',
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: '#aab4be',
        ...theme.applyStyles('dark', {
          backgroundColor: '#8796A5',
        }),
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: '#001e3c',
    width: 32,
    height: 32,
    '&::before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        '#fff',
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
    ...theme.applyStyles('dark', {
      backgroundColor: '#003892',
    }),
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: '#aab4be',
    borderRadius: 20 / 2,
    ...theme.applyStyles('dark', {
      backgroundColor: '#8796A5',
    }),
  },
}));

// search bar
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: '30%',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  top: 0,
  left: 0,
  zIndex: 2,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor:'pointer'
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    // transition: theme.transitions.create('width'),
    // [theme.breakpoints.up('sm')]: {
    //   width: '18ch',
    //   '&:focus': {
    //     width: '20ch',
    //   },
    // },
  },
}));


function NavBar({query,setQuery,handleSearch,mode,handleToggle}){

  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // search process workks when entry key clicked
  const handleKeyPress = (e) => {
      if (e.key === 'Enter') handleSearch();
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const drawer = (
    <Box sx={{ width: 250 }} onClick={toggleDrawer}>
      <List>
        <ListItem button component={Link} to="/">
          <ListItemText 
            primary="Home" 
            primaryTypographyProps={{ sx: { color: theme.palette.mode === 'dark' ? '#fff' : '#000' } }}
          />
        </ListItem>
        <ListItem button component={Link} to="/movie/fav">
          <ListItemText 
            primary="Favorites" 
            primaryTypographyProps={{ sx: { color: theme.palette.mode === 'dark' ? '#fff' : '#000' } }}
          />
        </ListItem>
        <ListItem>
          <FormControlLabel control={<MaterialUISwitch sx={{ m: 1 }} checked={mode==='dark'} onChange={handleToggle} color='default'/>}/>
        </ListItem>
      </List>
    </Box>
  );

  return(
    <>
      <AppBar position='fixed'>
        <Toolbar sx={{display:"flex", justifyContent:"center"}}>
          <Typography variant='h6' component="div" sx={{flexGrow:1}}>Movie Explorer</Typography>

          <Search sx={{marginRight:"10px"}}>
            <SearchIconWrapper  onClick={handleSearch}>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Search for a movie"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>

          {isMobile ? (
            <>
              <IconButton color="inherit" onClick={toggleDrawer}>
                <MenuIcon />
              </IconButton>
            </>
          ):(
            <Box>
              <Button component={Link} to="/" color="inherit">Home</Button>
              <Button component={Link} to="/movie/fav" color="inherit">Favorites</Button>
              <FormControlLabel control={<MaterialUISwitch sx={{ m: 1 }} checked={mode==='dark'} onChange={handleToggle} color='default'/>}/>
            </Box>
          )}

          {/* <FormControlLabel control={<MaterialUISwitch sx={{ m: 1 }} checked={mode==='dark'} onChange={handleToggle} color='default'/>}/> */}
        </Toolbar>
      </AppBar>

      {/* Drawer for mobile */}
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer}>
        {drawer}
      </Drawer>
    </>
  )
}

export default NavBar;