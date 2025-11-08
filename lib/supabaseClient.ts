import { createClient } from '@supabase/supabase-js'

// Ganti ini dengan data dari dashboard Supabase
const supabaseUrl = 'https://YOUR_PROJECT.supabase.co'
const supabaseAnonKey = 'YOUR_PUBLIC_ANON_KEY'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
