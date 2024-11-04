// pages/api/updateMFA.js
import { supabase } from '../../supabaseClient';

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

if (!supabaseUrl) {
  throw new Error('supabaseUrl is required.');
}

export const supabase1 = createClient(supabaseUrl, process.env.SUPABASE_SERVICE_ROLE_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { userId, mfaEnabled } = req.body;

  if (!userId || typeof mfaEnabled !== 'boolean') {
    return res.status(400).json({ error: 'User ID and MFA status are required' });
  }

  try {
    const { data, error } = await supabase1.auth.admin.updateUserById(userId, {
      user_metadata: { mfa_enabled: mfaEnabled },
    });

    if (error) {
      console.error('Error updating MFA:', error);
      return res.status(500).json({ error: error.message });
    }

    res.status(200).json(data);
  } catch (error) {
    console.error('Error updating MFA:', error);
    res.status(500).json({ error: error.message });
  }
}