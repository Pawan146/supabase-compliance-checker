// pages/api/updateUserMetadata.js
import { supabase } from '../../supabaseClient';

export default async function handler(req, res) {
  const { userId, userMetadata } = req.body;

  try {
    const { data, error } = await supabase.auth.admin.updateUserById(userId, {
      user_metadata: userMetadata,
    });

    if (error) {
      console.error('Error updating user metadata:', error);
      return res.status(500).json({ error: error.message });
    }

    res.status(200).json(data);
  } catch (error) {
    console.error('Error updating user metadata:', error);
    res.status(500).json({ error: error.message });
  }
}