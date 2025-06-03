import React, { useState } from 'react';
import { auth } from '../Firebase/firebase';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Typography } from '@mui/material';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';

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

  const handleSignUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth,email, password);
      navigate('/');
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 10 }}>
      <Typography variant="h5" mb={2}>Sign In or Register</Typography>
      <TextField fullWidth label="Email" margin="normal" value={email} onChange={(e) => setEmail(e.target.value)} />
      <TextField fullWidth label="Password" type="password" margin="normal" value={password} onChange={(e) => setPassword(e.target.value)} />
      <Button fullWidth variant="contained" onClick={handleSignIn} sx={{ mt: 2 }}>Sign In</Button>
      <Button fullWidth variant="outlined" onClick={handleSignUp} sx={{ mt: 1 }}>Register</Button>
    </Box>
  );
};

export default SignIn;