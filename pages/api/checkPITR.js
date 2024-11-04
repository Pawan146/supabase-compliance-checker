// pages/api/checkPITR.js (point in time recovery)
import { supabase } from '../../supabaseClient';
import moment from 'moment';

export default async function handler(req, res) {
  const { data: projects, error } = await supabase.from('projects').select('*');
  if (error) {
    console.error(`[${moment().format()}] Error checking PITR: ${error.message}`);
    return res.status(500).json({ error: error.message });
  }

  const projectsWithPITR = projects.map(project => ({
    project_name: project.name,
    pitr_enabled: project.pitr_enabled,
  }));

  console.log(`[${moment().format()}] PITR check completed. Projects: ${JSON.stringify(projectsWithPITR)}`);
  res.status(200).json(projectsWithPITR);
}