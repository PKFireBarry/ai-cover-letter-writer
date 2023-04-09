'use client'

import React from 'react';
import { auth, provider } from "../../firebase";
import { signInWithPopup } from "firebase/auth";
import Cookies from "universal-cookie";
import ParticleBackGround from './ParticleBackGround';
import { motion } from 'framer-motion';

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
    <div className="min-h-screen flex flex-col justify-center items-center relative shadow-2xl ">
      <ParticleBackGround/>
        <motion.div
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', duration: 2.75, stiffness: 125 }}
          className="w-full max-w-sm mx-auto p-6 bg-white rounded-lg shadow-md z-10"
        >

        <h1 className="text-3xl text-center underline text-gray-900 p-2 font-extrabold">
          Ai Coverletter Writer
        </h1>
        <p className="text-md font-bold mb-8 item flex justify-center">Created By: Darion George</p>
        <p className="text-gray-600 text-md mb-10 flex text-left justify-center">An AI Cover Letter Writer, the ultimate solution for job seekers looking to land their dream job. Uses cutting-edge AI and NLP technologies to generate personalized cover letters that match the job requirements, saving you time and increasing your chances of success. Say goodbye to the stress and frustration of writing cover letters and hello to a streamlined and professional approach. Invest in your future and try the AI Cover Letter Writer today!</p>
        <button
          className="w-full flex items-center justify-center px-4 py-2 bg-blue-500 hover:bg-blue-900 text-white font-bold rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 transition duration-300 ease-in-out"
          onClick={signInWithGoogle}
        >
          <span>Sign in with Google</span>
        </button>
      </motion.div>
    </div>
  );
}

export default Login;
