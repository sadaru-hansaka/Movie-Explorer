import React,{useState} from 'react';
import { Button, Typography, Box,Avatar,Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { auth } from '../Firebase/firebase';

const Profile = ({ user }) => {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await auth.signOut();
    navigate('/');
  };

  return (
    <Box sx={{ display:'flex',justifyContent:'center',alignItems:'center',minHeight:'90vh',mt:8 }}>
      <Paper elevation={3} sx={{
        p: 4,
        borderRadius: 3,
        maxWidth: 400,
        width: '100%',
        textAlign: 'center',
        // backgroundColor: 'white'
      }}>
        <Avatar
          src={user?.photoURL}
          alt={user?.displayName}
          sx={{ width: 80, height: 80, mx: 'auto', mb: 2 }}
        />
        <Typography variant="h6" gutterBottom>
          {user?.displayName || 'User Name'}
        </Typography>
        <Typography variant="body2"  gutterBottom>
          {user?.email || 'user@example.com'}
        </Typography>
        <Button variant="outlined" onClick={handleSignOut} sx={{ mt: 2 }}>Sign Out</Button>
      </Paper>
      
    </Box>
  );
};

export default Profile;