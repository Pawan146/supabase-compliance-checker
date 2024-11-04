// pages/PITRStatus.js
import { useEffect, useState } from 'react';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Button } from '@mui/material';
import Link from 'next/link';

export default function PITRStatus() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const projectsRes = await fetch('/api/checkPITR');
        const projectsData = await projectsRes.json();
        const timestamp = new Date().toISOString();
        console.log(`[${timestamp}] Projects Data:`, projectsData);

        if (Array.isArray(projectsData)) {
          setProjects(projectsData);
          logEvidence(projectsData);
        } else {
          console.error(`[${timestamp}] Expected projectsData to be an array`);
        }
      } catch (error) {
        const timestamp = new Date().toISOString();
        console.error(`[${timestamp}] Error fetching data:`, error);
      }
    }

    fetchData();
  }, []);

  const logEvidence = (projectsData) => {
    const timestamp = new Date().toISOString();
    projectsData.forEach(project => {
      const status = project.pitr_enabled ? 'passing' : 'failing';
      console.log(`[${timestamp}] Project: ${project.project_name}, PITR Enabled: ${project.pitr_enabled}, Status: ${status}`);
    });
  };

  return (
    <Container>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h4" gutterBottom>Point in Time Recovery (PITR) Status</Typography>
        <Link href="/supabase-compliance-checker" passHref>
          <Button variant="contained" color="primary">Home</Button>
        </Link>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><Typography fontWeight="bold">Project Name</Typography></TableCell>
              <TableCell><Typography fontWeight="bold">PITR Enabled</Typography></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {projects.map(project => (
              <TableRow key={project.project_name}>
                <TableCell>{project.project_name}</TableCell>
                <TableCell>{project.pitr_enabled ? 'Yes' : 'No'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}