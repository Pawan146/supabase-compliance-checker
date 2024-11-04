// pages/signup.js
import { useState } from 'react';
import { useRouter } from 'next/router';
import { Container, Typography, TextField, Button, Box } from '@mui/material';
import { supabase } from '../supabaseClient';
import Link from 'next/link'; // Import Link from next/link

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSignUp = async (e) => {
    e.preventDefault();
      const { error } = await supabase.auth.signUp({
          email, password,  options: {
            data: {
              mfa_enabled: false, // Set mfa_enabled to false by default
            },
          }
      });
    if (error) {
      setError(error.message);
    } else {
        const redirectTo = router.query.redirectTo || '/supabase-compliance-checker';
        router.push(redirectTo);
    }
  };

  return (
    <Container>
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh">
        <Typography variant="h4" gutterBottom>Sign Up</Typography>
        <form onSubmit={handleSignUp} style={{ width: '100%', maxWidth: '400px' }}>
          <Box mb={2}>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Box>
          <Box mb={2}>
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Box>
          {error && (
            <Typography color="error" gutterBottom>{error}</Typography>
          )}
          <Button type="submit" variant="contained" color="primary" fullWidth>Sign Up</Button>
        </form>
        <Box mt={2} textAlign="center">
          <Typography variant="body1" gutterBottom>Already have an account? Please sign in</Typography>
          <Link href="/signin" passHref>
            <Button variant="outlined" color="secondary" fullWidth>Sign In</Button>
          </Link>
        </Box>
      </Box>
    </Container>
  );
}