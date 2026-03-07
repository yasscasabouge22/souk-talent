import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://qbhrgrfwrgnqnspxcxvp.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFiaHJncmZ3cmducW5zcHhjeHZwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI4NDIyODIsImV4cCI6MjA4ODQxODI4Mn0.sd3dCLfTsMO05EFwVhKt1nDKgIG159zBZjYOl5g_e2s';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});

export const projectId = 'qbhrgrfwrgnqnspxcxvp';
export const publicAnonKey = SUPABASE_ANON_KEY;
