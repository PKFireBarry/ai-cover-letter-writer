'use client'

import React from 'react'
import { auth, provider } from "../../firebase";
import { signInWithPopup } from "firebase/auth";
import Cookies from "universal-cookie";

const cookies = new Cookies();

function Login(props: { setIsAuth: any; }) {
  const { setIsAuth } = props;

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      cookies.set("auth_user", result.user.refreshToken);
      setIsAuth(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-gray-600 flex justify-center items-center h-screen">
      <div className="w-full max-w-sm mx-auto p-6 bg-white rounded-md shadow-md">
        <h1 className="text-3xl text-center text-gray-700 p-2 mb-4 font-extrabold ">
          Ai Coverletter Writer
        </h1>
        <h1 className="text-2xl font-bold mb-4 item flex justify-center">Login Page</h1>
        <p className="text-gray-600 mb-6 flex justify-center">Sign in with your Google account</p>
        <button
          className="w-full flex items-center justify-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 transition duration-300 ease-in-out"
          onClick={signInWithGoogle}>
          <span>Sign in with Google</span>
        </button>
      </div>
    </div>
  );
}


export default Login