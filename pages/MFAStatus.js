// pages/MFAStatus.js
import { useEffect, useState } from 'react';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Button } from '@mui/material';
import Link from 'next/link';

export default function MFAStatus() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const usersRes = await fetch('/api/checkMFA');
        const usersData = await usersRes.json();
        const timestamp = new Date().toISOString();
        console.log(`[${timestamp}] Users Data:`, usersData);

        if (Array.isArray(usersData)) {
          setUsers(usersData);
          logEvidence(usersData);
        } else {
          console.error(`[${timestamp}] Expected usersData to be an array`);
        }
      } catch (error) {
        const timestamp = new Date().toISOString();
        console.error(`[${timestamp}] Error fetching data:`, error);
      }
    }

    fetchData();
  }, []);

  const logEvidence = (usersData) => {
    const timestamp = new Date().toISOString();
    usersData.forEach(user => {
      const status = user.mfa_enabled ? 'passing' : 'failing';
      console.log(`[${timestamp}] User: ${user.email}, MFA Enabled: ${user.mfa_enabled}, Status: ${status}`);
    });
  };

  const updateMFAForUser = async (userId, mfaEnabled) => {
    try {
      const response = await fetch('/api/updateMFA', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, mfaEnabled }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log(`MFA ${mfaEnabled ? 'enabled' : 'disabled'} for user:`, data);
        setUsers(users.map(user => user.id === userId ? { ...user, mfa_enabled: mfaEnabled } : user));
      } else {
        console.error('Error updating MFA:', data.error);
      }
    } catch (error) {
      console.error('Error updating MFA:', error);
    }
  };

  return (
    <Container>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h4" gutterBottom>MFA Status</Typography>
        <Link href="/supabase-compliance-checker" passHref>
          <Button variant="contained" color="primary">Home</Button>
        </Link>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><Typography fontWeight="bold">Email</Typography></TableCell>
              <TableCell><Typography fontWeight="bold">MFA Enabled</Typography></TableCell>
              <TableCell><Typography fontWeight="bold">Actions</Typography></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map(user => (
              <TableRow key={user.id}>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.mfa_enabled ? 'Yes' : 'No'}</TableCell>
                <TableCell>
                  {user.mfa_enabled ? (
                    <Button variant="contained" color="secondary" onClick={() => updateMFAForUser(user.id, false)}>Disable MFA</Button>
                  ) : (
                    <Button variant="contained" color="primary" onClick={() => updateMFAForUser(user.id, true)}>Enable MFA</Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}