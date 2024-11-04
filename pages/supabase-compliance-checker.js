// pages/index.js
import { useRouter } from 'next/router';
import { Container, Typography, Link, Box, Button } from '@mui/material';
import { supabase } from '../supabaseClient';

export default function Dashboard() {
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  return (
    <Container>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4" gutterBottom>Supabase Compliance Checker</Typography>
        <Button variant="contained" color="secondary" onClick={handleLogout}>Logout</Button>
      </Box>
      <Box display="flex" flexDirection="column" alignItems="flex-start">
        <Link href="/MFAStatus" passHref>
          <Button variant="contained" color="primary" style={{ marginBottom: '10px' }}>MFA Status</Button>
        </Link>
        <Link href="/RLSStatus" passHref>
          <Button variant="contained" color="primary" style={{ marginBottom: '10px' }}>Row Level Security (RLS) Status</Button>
        </Link>
        <Link href="/PITRStatus" passHref>
          <Button variant="contained" color="primary" style={{ marginBottom: '10px' }}>Point in Time Recovery (PITR) Status</Button>
        </Link>
      </Box>
    </Container>
  );
}