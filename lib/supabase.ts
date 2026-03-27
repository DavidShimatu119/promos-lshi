import { createClient } from '@supabase/supabase-js';

// Ici, on n'utilise aucun @/ ou chemin relatif car on importe une dépendance NPM
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(
  supabaseUrl || '',
  supabaseAnonKey || ''
);