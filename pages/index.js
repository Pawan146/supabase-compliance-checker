// pages/index.js
import { Container, Typography, Button, Box } from '@mui/material';
import Link from 'next/link';

export default function Home() {
  return (
    <Container>
      <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" height="100vh">
        <Typography variant="h4" gutterBottom>Welcome to Supabase Compliance Checker</Typography>
        <Box display="flex" justifyContent="center" mt={2}>
          <Link href="/signin" passHref>
            <Button variant="contained" color="primary" style={{ marginRight: '10px' }}>Sign In</Button>
          </Link>
          <Link href="/signup" passHref>
            <Button variant="contained" color="secondary">Sign Up</Button>
          </Link>
        </Box>
      </Box>
    </Container>
  );
}