import { supabase } from "./supabaseClient";

export async function salvarFavorito(userId, favorito) {
  await supabase.from("favoritos").insert({ user_id: userId, dado: favorito });
}

export async function buscarFavoritos(userId) {
  const { data } = await supabase.from("favoritos").select("dado").eq("user_id", userId);
  return data?.map((f) => f.dado) || [];
}

export async function salvarConfiguracoes(userId, config) {
  await supabase.from("configuracoes").upsert({ user_id: userId, ...config });
}

export async function buscarConfiguracoes(userId) {
  const { data } = await supabase.from("configuracoes").select("*").eq("user_id", userId).single();
  return data || {};
}
