// pages/api/checkMFA.js
import { createClient } from '@supabase/supabase-js';
import moment from 'moment';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

if (!supabaseUrl) {
  throw new Error('supabaseUrl is required.');
}

export const supabase1 = createClient(supabaseUrl, process.env.SUPABASE_SERVICE_ROLE_KEY);
export default async function handler(req, res) {
  // const { data2, error2 } = await supabase.auth.admin.createUser({
  //   email: "pawan18bmsce146@gmail.com",
  //   password: "12345678",
  //   email_confirm: true,
  //   user_metadata: {
  //     mfa_enabled: false,
  //   },
  // });
  const { data, error } = await supabase1.auth.admin.listUsers()

  if (error) {
    console.error(`[${moment().format()}] Error checking MFA: ${error.message}`);
    return res.status(500).json({ error: error.message });
  }

  console.log('Data:', data);

  const users = data.users; // Adjust this line based on the actual structure
  if (!Array.isArray(users)) {
    console.error('Expected users to be an array');
    return res.status(500).json({ error: 'Unexpected data format' });
  }

  const usersWithMFA = users.map(user => ({
    id: user?.id,
    email: user?.email,
    mfa_enabled: user?.user_metadata?.mfa_enabled || false,
  }));

  console.log(`[${moment().format()}] MFA check completed. Users: ${JSON.stringify(usersWithMFA)}`);
  res.status(200).json(usersWithMFA);
}