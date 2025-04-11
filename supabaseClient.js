import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://SEU-PROJETO.supabase.co";
const supabaseKey = "SUA-CHAVE-API";

export const supabase = createClient(supabaseUrl, supabaseKey);