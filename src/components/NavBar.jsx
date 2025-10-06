import React, { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

export default function NavBar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };
    getUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user || null);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
    setUser(null);
  };

  return (
    <div className="navbar bg-base-100 shadow-sm sticky top-0">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
        </div>
        <Link to="/" className="btn btn-ghost text-xl flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m16.862 4.487 1.687-1.688a1.875 1.875
                 0 1 1 2.652 2.652L10.582 16.07a4.5
                 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5
                 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0
                 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0
                 1 15.75 21H5.25A2.25 2.25 0 0
                 1 3 18.75V8.25A2.25 2.25 0 0
                 1 5.25 6H10"
            />
          </svg>
          Blog App
        </Link>
      </div>

      <div className="navbar-end flex items-center gap-3">
        {user ? (
          <>
            <span className="text-xl text-gray-200 font-bold  rounded-3xl py-2 px-3 mx-3">
              Hi, {user.user_metadata?.username || user.email}
            </span>

            <button
              onClick={handleLogout}
              className="btn btn-outline btn-primary"
            >
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" >
            <button className="btn btn-primary ">
              <svg
                aria-label="Email icon"
                width="16"
                height="16"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2"
                  fill="none"
                  stroke="white"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                </g>
              </svg>
              Login with Email
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}
