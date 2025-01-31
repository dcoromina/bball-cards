// supabaseClient.js
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://mwgewgnnhrgxerikraqh.supabase.co"; // Replace with your Supabase project URL
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im13Z2V3Z25uaHJneGVyaWtyYXFoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgyNDk5NzksImV4cCI6MjA1MzgyNTk3OX0.rLEkIEy9G5_dOZtKqzYr9Xw-obS_Q5rViX6riBHoXhg"; // Replace with your Supabase anon/public API key

export const supabase = createClient(supabaseUrl, supabaseKey);
