
import { useState } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import FloatingButton from "./components/FloatingButton";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import BlogsPage from "./pages/BlogsPage";
import AddEditPostPage from "./pages/AddEditPostPage";
import { useAuth } from "./hooks/useAuth";
import { Routes, Route } from "react-router-dom";
import ToastProvider from "./components/ToastProvider";
import PostDetailsPage from "./pages/PostDetailsPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  const { user } = useAuth();

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<BlogsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/posts/:id" element={<PostDetailsPage />} />
        {user && (
          <>
            <Route path="/post" element={<AddEditPostPage />} />
          </>
        )}
      </Routes>
      {user && <FloatingButton />}
      <ToastProvider />
    </>
  );
}

export default App;
