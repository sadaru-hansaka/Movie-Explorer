import React, { useState } from 'react';
import { auth,provider } from '../Firebase/firebase';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Typography,Divider } from '@mui/material';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup
} from 'firebase/auth';
import { FcGoogle } from 'react-icons/fc';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth,email, password);
      navigate('/');
    } catch (err) {
      alert(err.message);
    }
  };

  const handleSignInGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      navigate('/');
      console.log("User signed in:", result.user);
    } catch (error) {
      console.error("Sign-in error:", error);
    }
  };

  const handleSignUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth,email, password);
      navigate('/');
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <Box sx={{display:'flex',justifyContent:'center',alignItems:'center', minHeight: '90vh',flexDirection:'column'}}>
      <Box sx={{ maxWidth: 400, mx: 'auto', mt: 10,display:'flex', justifyContent:'center',flexDirection:'column',alignItems:'center', border:'2px solid white',p:3,boxShadow: 3,borderRadius: 2,backgroundColor: 'background.paper' }}>
        <Typography variant="h5" mb={2}>Sign In or Register</Typography>
        <Typography variant='subtitle1'>Welcome user, please sign in to continue</Typography>
        <Button fullWidth variant="outlined" color="primary" onClick={handleSignInGoogle} sx={{mt:1}} startIcon={<FcGoogle />}>Sign in with Google</Button>
        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', my: 2 }}>
          <Divider sx={{ flex: 1, borderColor: 'rgba(255, 255, 255, 0.3)' }} />
          <Typography sx={{ mx: 2, color: 'text.secondary' }}>or</Typography>
          <Divider sx={{ flex: 1, borderColor: 'rgba(255, 255, 255, 0.3)' }} />
        </Box>
        <TextField fullWidth label="Email" variant='outlined' margin="normal" autoComplete="email" size='small' value={email} onChange={(e) => setEmail(e.target.value)} />
        <TextField fullWidth label="Password" variant='outlined' type="password" margin="normal" size='small' value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button fullWidth variant="outlined" onClick={handleSignIn} sx={{ mt: 2 }}>Sign In</Button>
        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', my: 2 }}>
          <Divider sx={{ flex: 1, borderColor: 'rgba(255, 255, 255, 0.3)' }} />
          <Typography sx={{ mx: 2, color: 'text.secondary' }}>or</Typography>
          <Divider sx={{ flex: 1, borderColor: 'rgba(255, 255, 255, 0.3)' }} />
        </Box>
        <Button fullWidth variant="outlined" onClick={handleSignUp} sx={{ mt: 1 }}>Register</Button>
      </Box>
    </Box>
  );
};

export default SignIn;