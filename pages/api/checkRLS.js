// pages/api/checkRLS.js
import { supabase } from '../../supabaseClient';
import moment from 'moment';

export default async function handler(req, res) {
  try {
    const { data: tables, error } = await supabase
      .from('rls_status')
      .select('table_name, rls_enabled');

    if (error) {
      console.error(`[${moment().format()}] Error checking RLS: ${error.message}`);
      return res.status(500).json({ error: error.message });
    }

    const tablesWithRLS = tables.map(table => ({
      table_name: table.table_name,
      rls_enabled: table.rls_enabled,
    }));

    console.log(`[${moment().format()}] RLS check completed. Tables: ${JSON.stringify(tablesWithRLS)}`);
    res.status(200).json(tablesWithRLS);
  } catch (error) {
    console.error(`[${moment().format()}] Error checking RLS: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
}