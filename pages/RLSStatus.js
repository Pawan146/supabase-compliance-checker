// pages/RLSStatus.js
import { useEffect, useState } from 'react';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Button } from '@mui/material';
import Link from 'next/link';

export default function RLSStatus() {
  const [tables, setTables] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const tablesRes = await fetch('/api/checkRLS');
        const tablesData = await tablesRes.json();
        const timestamp = new Date().toISOString();
        console.log(`[${timestamp}] Tables Data:`, tablesData);

        if (Array.isArray(tablesData)) {
          setTables(tablesData);
          logEvidence(tablesData);
        } else {
          console.error(`[${timestamp}] Expected tablesData to be an array`);
        }
      } catch (error) {
        const timestamp = new Date().toISOString();
        console.error(`[${timestamp}] Error fetching data:`, error);
      }
    }

    fetchData();
  }, []);

  const logEvidence = (tablesData) => {
    const timestamp = new Date().toISOString();
    tablesData.forEach(table => {
      const status = table.rls_enabled ? 'passing' : 'failing';
      console.log(`[${timestamp}] Table: ${table.table_name}, RLS Enabled: ${table.rls_enabled}, Status: ${status}`);
    });
  };

  return (
    <Container>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h4" gutterBottom>Row Level Security (RLS) Status</Typography>
        <Link href="/supabase-compliance-checker" passHref>
          <Button variant="contained" color="primary">Home</Button>
        </Link>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><Typography fontWeight="bold">Table Name</Typography></TableCell>
              <TableCell><Typography fontWeight="bold">RLS Enabled</Typography></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tables.map(table => (
              <TableRow key={table.table_name}>
                <TableCell>{table.table_name}</TableCell>
                <TableCell>{table.rls_enabled ? 'Yes' : 'No'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}