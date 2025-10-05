import { supabase } from "../lib/supabaseClient";


export async function signUp({ email, password, username }) {
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) throw error;

  
  if (data.user) {
    await supabase.from("profiles").insert([{ id: data.user.id, username }]);
  }
  return data.user;
}


export async function signIn({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw error;
  return data.user;
}


export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}


export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session?.user) return null;
  const { data, error } = await supabase
    .from("profiles")
    .select("username")
    .eq("id", session.user.id)
    .single();
  if (error) throw error;
  return { ...session.user, username: data?.username };
}