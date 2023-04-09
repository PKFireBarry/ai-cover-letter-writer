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
import { toast } from "react-toastify";

function AllLetters() {
  const [letters, setLetters] = useState<
    {
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
    }[]
  >([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(
        collection(db, "coverletter"),
        where("email", "==", auth.currentUser?.email),
        orderBy("createdAt", "desc")
      ),
      (snapshot) => {
        const lettersData:
          | ((prevState: never[]) => never[])
          | { id: string }[] = [];
        snapshot.forEach((doc) => {
          lettersData.push({ id: doc.id, ...doc.data() });
        });
        setLetters(lettersData);
      }
    );
    return unsubscribe;
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, "coverletter", id));
    } catch (error) {
      console.error("Error deleting document: ", error);
      toast.error("Error deleting document");
    }
  };

  return (
    <div className=" overflow-y-scroll h-screen">
      <h1 className="flex justify-center text-2xl font-bold">Letter History</h1>
      <div className="bg-slate-300">
        {letters.map((letter) => (
          <div
            className="flex justify-center flex-col border-4"
            key={letter.id}
          >
            <div className="flex flex-row items-center justify-between border-b-2 border-black p-2">
              <div className="flex items-center">
                <img
                  src={letter.userImage}
                  className="w-10 h-10 mr-2"
                  alt={letter.user}
                />
                <p>{letter.user}</p>
              </div>

              <div>
                <p className=" font-bold ">
                  Created At:{" "}
                  {new Date(letter.createdAt?.toDate()).toLocaleString()}
                </p>
              </div>
            </div>

            <details className="bg-slate-100 text-black font-bold py-1 px-2 transition-transform duration-1000 ease-in-out shadow-md mb-2">
              <summary className="hover:underline">Document Information</summary>
              <div>
              <details className="bg-slate-200 hover:bg-sky-300 text-black font-bold py-1 px-2 transition-transform duration-1000 ease-in-out shadow-md  mb-2">
                <summary className="hover:underline">Company</summary>
                <p className="pt-4">{letter.company}</p>
              </details>
              <details className="bg-slate-200 hover:bg-sky-300 text-black font-bold py-1 px-2 transition-transform duration-1000 ease-in-out shadow-md mb-2">
                <summary className="hover:underline">Location</summary>
                <p className="pt-4">{letter.location}</p>
              </details>                              
            <details className="bg-slate-200 hover:bg-sky-300 text-black font-bold py-1 px-2 transition-transform duration-1000 ease-in-out shadow-md mb-2">
              <summary >Job Tiltle</summary>
              <p className="pt-4">{letter.job_title}</p>
            </details>              
              <details className="bg-slate-200 hover:bg-sky-300 text-black font-bold py-1 px-2 transition-transform duration-1000 ease-in-out shadow-md mb-2">
                <summary className="hover:underline">Job Description</summary>
                <p className="pt-4">{letter.Job_description}</p>
              </details>                
              </div>
            </details>


            <div>


              <div>
                <div className="bg-slate-200">
                  <textarea
                    className="w-full text-lg bg-slate-200"
                    rows="25"
                    value={letter.coverLetter}
                  />
                </div>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-md shadow-sm"
                  onClick={() => handleDelete(letter.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllLetters;
