"use client";

import Head from "next/head";
import Cookies from "universal-cookie";
import React, { useState, useRef, useEffect } from "react";
import GenerateLetter from "./components/GenerateLetter";
import Login from "./components/Login";
import { auth } from "@/firebase";
import { Toaster } from "react-hot-toast";
import Faq from "./components/Faq";

const cookies = new Cookies();

export default function Home() {
  const [isAuth, setIsAuth] = useState(cookies.get("auth_user") || null);

  useEffect(() => {
    cookies.set("auth_user", isAuth);
  }, [isAuth]);
  //function to remove auth cookie and redirect to login page
  const logout = () => {
    cookies.remove("auth_user");
    // reload the page
    window.location.reload();
  };

  if (!auth.currentUser) {
    return (
      <div>
        <Login setIsAuth={setIsAuth} />
      </div>
    );
  } else {
    return (
      <>
        <Head>
          <title>Create Next App</title>
          <meta name="description" content="Generated by create next app" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="h-screen w-screen font-serif">
          <Toaster
            position="top-center"
            reverseOrder={false}
            gutter={8}
            containerClassName=""
            containerStyle={{}}
            toastOptions={{
              // Define default options
              className: "",
              duration: 5000,
              style: {
                background: "#363636",
                color: "#fff",
              },
              // Default options for specific types
              success: {
                duration: 5000,
              },
            }}
          />
          <div>
            <div className="w-screen h-screen bg-slate-500">
              <div className="flex h-16 justify-between items-center p-8 ">
                <h1 className="text-xl font-bold text-white">Ai Coverletter Writer</h1>
                <div className="flex items-center space-x-4">
                  <img
                    src={auth.currentUser?.photoURL ?? undefined}
                    alt="logo"
                    className="w-8 h-8 rounded-full hidden sm:inline-block"
                  />

                  <h1 className="text-sm  font-bold hidden sm:inline-block">
                    User: {auth.currentUser?.displayName}
                  </h1>

                  <a
                    href="https://github.com/PKFireBarry/ai-cover-letter-writer"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-gray-900"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M12 0a12 12 0 0 0-3.819 23.393c.6.11.819-.258.819-.577 0-.285-.01-1.04-.015-2.042-3.338.726-4.042-1.609-4.042-1.609-.546-1.392-1.335-1.763-1.335-1.763-1.088-.745.083-.729.083-.729 1.204.084 1.838 1.236 1.838 1.236 1.07 1.838 2.807 1.305 3.494.999.109-.776.417-1.305.759-1.604-2.653-.301-5.446-1.324-5.446-5.89 0-1.304.465-2.372 1.235-3.204-.135-.302-.54-1.523.105-3.171 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.648.24 2.869.12 3.171.765.832 1.23 1.899 1.23 3.204 0 4.578-2.794 5.586-5.456 5.882.42.369.81 1.096.81 2.212 0 1.6-.015 2.887-.015 3.277 0 .315.21.69.825.575A12.001 12.001 0 0 0 12 0z"
                      />
                    </svg>
                  </a>
                  <button
                    onClick={logout}
                    className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Logout
                  </button>
                </div>
              </div>
              <GenerateLetter />
            </div>
          </div>
        </div>
      </>
    );
  }
}
