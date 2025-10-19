import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'https://coqnokagdkrnrcccllnz.supabase.co';
const supabaseKey =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNvcW5va2FnZGtybnJjY2NsbG56Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA4MTc1MDAsImV4cCI6MjA3NjM5MzUwMH0.6vEY_aDY2ThcJ_9EPX8rPVMmCPeViuNfmR2XIbdYqo0';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
