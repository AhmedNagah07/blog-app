
import React from "react";
import { useLocation } from "react-router-dom";
import CreatePostForm from "../components/PostForm";
import { useAuth } from "../hooks/useAuth";

export default function AddEditPostPage() {
  const { state } = useLocation();
  const { user } = useAuth();

  return (
    <div>
      <CreatePostForm user={user} post={state?.post} />
    </div>
  );
}
