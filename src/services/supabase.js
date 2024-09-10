import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://zqukizfivqvayfagazrv.supabase.co";
const supabaseKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpxdWtpemZpdnF2YXlmYWdhenJ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjU0ODcwMTYsImV4cCI6MjA0MTA2MzAxNn0.pEwttQLhLzgwn-tkOuxCRXOXvzHhxbVYyys0DeS8qys";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
