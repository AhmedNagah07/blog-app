
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import { toast } from "react-toastify";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setErrorMsg(error.message);
    } else {
      navigate("/");
      toast.success("Login successful! welcome back");
    }
  }

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-60 justify-center mx-auto"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z"
          />
        </svg>

        <h2 className="mt-10 text-center text-2xl font-bold text-white">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-100"
            >
              Email address
            </label>
            
            <input
              
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              className="mt-2 block w-full rounded-md bg-white/5 px-3 py-1.5 text-white placeholder:text-gray-500"
              
            />
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-100"
              >
                Password
              </label>
            </div>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="mt-2 block w-full rounded-md bg-white/5 px-3 py-1.5 text-white placeholder:text-gray-500"
            />
          </div>

          {errorMsg && <p className="text-red-400 text-sm ">{errorMsg}</p>}

          <button
            type="submit"
            disabled={loading}
            className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold text-white hover:bg-indigo-400"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <p className="mt-10 text-center text-sm text-gray-400">
          Not a member?{" "}
          <Link
            to="/register"
            className="font-semibold text-indigo-400 hover:text-indigo-300"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
