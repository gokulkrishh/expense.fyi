import { supabase } from 'lib/supabase';

export default function handler(req, res) {
  supabase.auth.api.setAuthCookie(req, res);
}
