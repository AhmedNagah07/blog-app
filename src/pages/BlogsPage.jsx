
import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import BlogCard from "../components/BlogCard";
import { useAuth } from "../hooks/useAuth";
import { deletePost } from "../lib/services/posts";
import Spinner from "../components/Spinner";


export default function BlogsPage() {
  const [posts, setPosts] = useState([]);
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const handleDelete = async (id) => {
    await deletePost(id); 
    setPosts(posts.filter((p) => p.id !== id)); 
  };
  useEffect(() => {
    const fetchPosts = async () => {
      
      let query = supabase
        .from("posts")
        .select(
          `
          id,
          title,
          description,
          image_url,
          created_at,
          author_id,
          profiles (
            username
          )
        `
        )
        .order("created_at", { ascending: false });

      
      if (user) {
        query = query.eq("author_id", user.id);
      }

      const { data, error } = await query;

      if (error) {
        console.error("Error fetching posts:", error.message);
      } else {

        setPosts(data || []);
        setLoading(false);
      }
    };

    fetchPosts();
  }, [user]);
  if (loading)
    return (
      <Spinner/>
    );
  return (
    <>
      
      <div className=" min-h-screen">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold  mb-8">Recent Posts</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.length === 0 ? (
              <p className="text-gray-400 m-">No posts yet.</p>
            ) : (
              posts.map((post) => (
                <BlogCard
                  key={post.id}
                  post={post}
                  showActions={user && post.author_id === user.id}
                  onDelete={handleDelete}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}
