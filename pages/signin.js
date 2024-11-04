// pages/signin.js
import { useState } from 'react';
import { useRouter } from 'next/router';
import { Container, Typography, TextField, Button, Box } from '@mui/material';
import { supabase } from '../supabaseClient';
import Link from 'next/link'; // Import Link from next/link

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSignIn = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
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
        <Typography variant="h4" gutterBottom>Sign In</Typography>
        <form onSubmit={handleSignIn} style={{ width: '100%', maxWidth: '400px' }}>
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
          <Button type="submit" variant="contained" color="primary" fullWidth>Sign In</Button>
        </form>
        <Box mt={2} textAlign="center">
          <Typography variant="body1" gutterBottom>Don't have an account? Please sign up</Typography>
          <Link href="/signup" passHref>
            <Button variant="outlined" color="secondary" fullWidth>Sign Up</Button>
          </Link>
        </Box>
      </Box>
    </Container>
  );
}