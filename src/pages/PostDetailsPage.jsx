import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPostById } from "../lib/services/posts";
import Spinner from "../components/Spinner";

export default function PostDetailsPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPost() {
      try {
        const data = await getPostById(id);
          setPost(data);
          setLoading(false);
      } catch (err) {
        console.error("Error loading post:", err.message);
      }
    }
    fetchPost();
  }, []);

    if (loading) return <Spinner />;
    
  

  return (
    <div className="max-w-2xl mx-auto p-6">
      {post.image_url && (
        <img
          src={post.image_url}
          alt={post.title}
          className="w-full h-64 object-cover rounded mb-4"
        />
      )}
      <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
      <p className="text-gray-600 mb-4">{post.description}</p>
      <p className="text-sm text-gray-400">
        Created at: {new Date(post.created_at).toLocaleString()}
      </p>
    </div>
    
  );
}
