
import React, { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  async function handleRegister(e) {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    const formData = new FormData(e.target);
    const userName = formData.get("userName");
    const email = formData.get("email");
    const password = formData.get("password");

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { username: userName },
      },
    });

    if (error) {
      setLoading(false);
      setErrorMsg(error.message);
      return;
    }

    const user = data.user;

    if (user) {
      const { error: profileError } = await supabase.from("profiles").insert([
        {
          id: user.id,
          username: userName,
          email,
        },
      ]);

      if (profileError) {
        toast.error(profileError.message);
      } else {
        navigate("/");
      }
    }

    setLoading(false);
  }

  return (
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold text-white">
            Sign up to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleRegister} className="space-y-6">
            <div>
              <label
                htmlFor="userName"
                className="block text-sm font-medium text-gray-100 mb-2"
              >
                User Name
              </label>
              <input
                id="userName"
                name="userName"
                type="text"
                required
                className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-white placeholder:text-gray-500"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-100 mb-2"
              >
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-white placeholder:text-gray-500"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-100 mb-2"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-white placeholder:text-gray-500"
              />
            </div>

            {errorMsg && <p className="text-red-400 text-sm">{errorMsg}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-md bg-indigo-500 px-3 py-1.5 text-white hover:bg-indigo-400"
            >
              {loading ? "Signing up..." : "Sign up"}
            </button>
          </form>
        </div>
      
    </div>
  );
}
