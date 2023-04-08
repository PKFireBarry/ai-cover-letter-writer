'use client'

import Head from 'next/head'
import Cookies from "universal-cookie";
import React, { useState, useRef, useEffect } from "react";
import GenerateLetter from "./components/GenerateLetter";
import Login from "./components/Login";

const cookies = new Cookies();

export default function Home() {
  const [isAuth, setIsAuth] = useState(cookies.get("auth_user") || false);

    useEffect(() => {
    cookies.set("auth_user", isAuth);
  }, [isAuth]);

  //function to remove auth cookie and redirect to login page
  const logout = () =>{
    cookies.remove("auth_user");
    // reload the page
    window.location.reload();
  };



if (!isAuth) {
    return <div><Login setIsAuth={setIsAuth} /></div>;
  } else {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
      <div>
      <div className="w-screen h-screen">
      <div className="flex h-12 justify-between items-center p-8">
      <h1>Ai Coverletter Writer</h1>
      <button onClick={logout}>Logout</button>        
      </div>
      {/* the generate letters component */}
      <GenerateLetter/>
      </div>
      </div>
      </div>
    </>
  )
}
}
