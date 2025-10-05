
import { supabase } from "../supabaseClient";
import { uploadImage } from "./storage";


export async function createPost({ title, description, imageFile }) {
  let imageUrl = null;

  try {
    if (imageFile) {
      imageUrl = await uploadImage(imageFile);
    }
  } catch (err) {
    console.error(" Skipping image upload:", err.message);
  }

 
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) {
    console.error(" Could not fetch user:", userError.message);
    throw userError;
  }
  if (!user) {
    throw new Error("User must be logged in to create a post.");
  }

  const { data, error } = await supabase.from("posts").insert([
    {
      title,
      description,
      image_url: imageUrl,
      author_id: user.id, 
    },
  ]);

  if (error) {
    console.error(" Insert error:", error);
    throw error;
  }

  console.log(" Post created:", data);
  return data;
}


export async function editPost(id, updates) {
  const { data, error } = await supabase
    .from("posts")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(" Edit error:", error);
    throw error;
  }

  return data;
}


export async function deletePost(id) {
  const { error } = await supabase.from("posts").delete().eq("id", id);

  if (error) {
    console.error(" Delete error:", error);
    throw error;
  }
}


export async function getPostById(id) {
  const { data, error } = await supabase
    .from("posts")
    .select("id, title, description, image_url, author_id, created_at")
    .eq("id", id)
    .single(); 

  if (error) {
    console.error("Error fetching post:", error.message);
    throw error;
  }

  return data;
}
