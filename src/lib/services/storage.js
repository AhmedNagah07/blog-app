import { supabase } from "../supabaseClient";

export async function uploadImage(file) {
  if (!file) {
    console.warn("No file provided for upload");
    return null;
  }

  const filePath = `public/${Date.now()}_${file.name}`;
  console.log("Uploading file to path:", filePath);

  const { data, error } = await supabase.storage
    .from("post-images") 
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    console.error("Upload error:", error);
    throw error;
  }

  console.log(" Upload success:", data);

  const { data: publicData } = supabase.storage
    .from("post-images")
    .getPublicUrl(filePath);

  console.log("Public URL:", publicData.publicUrl);

  return publicData.publicUrl;
}