
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPost, editPost } from "../lib/services/posts";
import { toast } from "react-toastify";

export default function CreatePostForm({ user, post }) {
  const [title, setTitle] = useState(post?.title || "");
  const [description, setDescription] = useState(post?.description || "");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!title.trim()) {
        toast.error("Title is required");
        return;
      }

      if (!description.trim()) {
        toast.error("Description is required");
        return;
      }

      if (!post && !image) {
        toast.error("Image is required for new posts");
        return;
      }
      setLoading(true);
      if (post) {
        await editPost(post.id, {
          title,
          description,
          image_url: image ? image : post.image_url,
        });
        toast.success("Post updated!");
      } else {
        await createPost({
          title,
          description,
          imageFile: image,
          author_id: user?.id,
        });
        toast.success("Post created!");
      }

      navigate("/");
    } catch (err) {
      console.error("Error saving post:", err.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full">
      <h2 className="text-2xl font-bold mb-4 ">
        {post ? "Edit Post" : "Create Post"}
      </h2>
      <div className="fieldset bg-base-200 border-base-300 rounded-box w-full max-w-2xl border p-6">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4  ">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input input-bordered w-full"
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="textarea textarea-bordered w-full "
          />

          {post?.image_url && !image && (
            <img
              src={post.image_url}
              alt="Current"
              className="w-32 h-32 object-cover rounded"
            />
          )}

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="file-input w-full"
          />

          <button type="submit" className="btn btn-primary w-full">
            {post ? "Update Post" : "Create Post"}
            {loading && <span className="loading loading-spinner"></span>}
          </button>
        </form>
      </div>
    </div>
  );
}
