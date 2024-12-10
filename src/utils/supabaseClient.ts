import { createClient } from "@supabase/supabase-js";
import { constants } from "./constants";

// const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
// const supabaseKey = process.env.REACT_APP_SUPABASE_ANON;

// if (!supabaseUrl || !supabaseKey) {
//     throw new Error('Missing Supabase URL or Anon Key');
//   }

const supabase = createClient(
  "https://vbxevcqixrhawulohcve.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZieGV2Y3FpeHJoYXd1bG9oY3ZlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM2MzYzMzMsImV4cCI6MjA0OTIxMjMzM30.mvMAPaq_nzyGSE0rcLD0OU0FJ548Bn_vTZGcp_lTUQ4"
);

export default supabase;
