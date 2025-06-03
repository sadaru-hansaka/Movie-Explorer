import { Button, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { auth } from '../Firebase/firebase';

const Profile = ({ user }) => {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await auth.signOut();
    navigate('/');
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5">Welcome, {user?.email}</Typography>
      <Button variant="outlined" onClick={handleSignOut} sx={{ mt: 2 }}>
        Sign Out
      </Button>
      {/* Display favorites here if stored */}
    </Box>
  );
};

export default Profile;