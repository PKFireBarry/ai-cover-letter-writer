"use client";

import { db, auth } from "@/firebase";
import {
  collection,
  onSnapshot,
  deleteDoc,
  doc,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/router";

function AllLetters() {
  const [letters, setLetters] = useState<
    {
      resume?: any;
      createdAt?: any;
      coverLetter?: string;
      id?: any;
      Job_description?: string;
      company?: string;
      location?: string;
      job_title?: string;
      user?: string;
      userImage?: string;
      email?: string;
      link1?: string;
      link2?: string;
    }[]
  >([]);

  const router = useRouter();

  useEffect(() => {
    if (!auth.currentUser) {
      toast.error("You must be logged in to view this page");
      return;
    }

    const unsubscribe = onSnapshot(
      query(
        collection(db, "coverletter"),
        where("email", "==", auth.currentUser?.email),
        orderBy("createdAt", "desc")
      ),
      (snapshot) => {
        const lettersData = snapshot.docs.map((doc) => {
          return { id: doc.id, ...doc.data() };
        });
        setLetters(lettersData);
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  if (!auth.currentUser) {
    return <p>You must be logged in to view this page</p>;
  }
  


  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, "coverletter", id));
    } catch (error) {
      console.error("Error deleting document: ", error);
      toast.error("Error deleting document");
    }
  };

  return (
<div className="h-screen overflow-y-scroll">
  <h1 className="text-3xl font-bold text-center mb-8 mt-4 py-4 px-8 bg-white text-gray-800 transition-transform duration-500 ease-in-out shadow-md rounded-md">
    Letter History
  </h1>
  <div className="bg-gray-100  scroll-smooth rounded-lg shadow-lg p-6">
    {letters.map((letter) => (
      <div className="border-b-2 border-gray-300 py-4" key={letter.id}>
        <div className="flex items-center justify-between mb-4 sm:block">
          <div className="flex items-center">
            <img
              src={letter.userImage}
              className="w-10 h-10 rounded-full mr-4"
              alt={letter.user}
            />
            <p className="font-bold text-lg">{letter.user}</p>
          </div>
          <div className="text-gray-500 text-sm">
            <p>Created At:</p>
            <p>{new Date(letter.createdAt?.toDate()).toLocaleString()}</p>
          </div>
        </div>

        <details className="bg-white text-black font-bold py-2 px-4 transition-transform duration-500 ease-in-out shadow-md mb-4 rounded-md">
  <summary className="hover:underline">
    Document Information
  </summary>
  <div className="mt-2">
    <details className="bg-gray-200 hover:bg-blue-200 text-gray-800 font-bold py-2 px-4 transition-transform duration-500 ease-in-out shadow-md mb-2 rounded-md">
      <summary className="hover:underline">Company</summary>
      <p className="pt-2">{letter.company}</p>
    </details>
    <details className="bg-gray-200 hover:bg-blue-200 text-gray-800 font-bold py-2 px-4 transition-transform duration-500 ease-in-out shadow-md mb-2 rounded-md">
      <summary className="hover:underline">Location</summary>
      <p className="pt-2">{letter.location}</p>
    </details>
    <details className="bg-gray-200 hover:bg-blue-200 text-gray-800 font-bold py-2 px-4 transition-transform duration-500 ease-in-out shadow-md mb-2 rounded-md">
      <summary className="hover:underline">Job Title</summary>
      <p className="pt-2">{letter.job_title}</p>
    </details>
    <details className="bg-gray-200 hover:bg-blue-200 text-gray-800 font-bold py-2 px-4 transition-transform duration-500 ease-in-out shadow-md mb-2 rounded-md">
      <summary className="hover:underline">Job Description</summary>
      <p className="pt-2">{letter.Job_description}</p>
    </details>
    <details className="bg-gray-200 hover:bg-blue-200 text-gray-800 font-bold py-2 px-4 transition-transform duration-500 ease-in-out shadow-md mb-2 rounded-md">
      <summary className="hover:underline">Resume Information</summary>
      <p className="pt-2">{letter.resume}</p>
    </details>
    <details className="bg-gray-200 hover:bg-blue-200 text-gray-800 font-bold py-2 px-4 transition-transform duration-500 ease-in-out shadow-md mb-2 rounded-md">
      <summary className="hover:underline">Links</summary>
      <p className="pt-2">{letter.link1}</p>
      <p className="pt-2">{letter.link2}</p>
    </details>                 
  </div>
</details>

        <div className="bg-white rounded-lg shadow-md p-4">
          <textarea
            className="w-full text-lg bg-transparent outline-none resize-none"
            rows={25}
            value={letter.coverLetter}
            readOnly
          />
          <button
            className="bg-red-500 hover:bg-red-700 text-white mt-4 font-semibold py-2 px-4 rounded-md shadow-sm"
            onClick={() => handleDelete(letter.id)}
          >
            Delete
          </button>
        </div>
      </div>
    ))}
  </div>
</div>
  )}

export default AllLetters;
