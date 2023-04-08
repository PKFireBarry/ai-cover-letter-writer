'use client'

import { db } from '@/firebase';
import { collection, onSnapshot, deleteDoc, doc, orderBy, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';

function AllLetters() {


  const [letters, setLetters] = useState<
  {
    createdAt?: any;
    coverLetter?: string; 
    id?: string; 
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
      query(collection(db, "coverletter"), orderBy("createdAt", "desc")),
      (snapshot) => {
        const lettersData: ((prevState: never[]) => never[]) | { id: string }[] = [];
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
    }
  }



  return (
    <div className="">
      <h1>Your Letter History</h1>
      <div>
        {letters.map((letter) => (
          <div className="flex justify-center flex-col" key={letter.id}>
            <div>
              <p>User: {letter.user}</p>
              <img src={letter.userImage} className="w-24 h-24" alt={letter.user} />
              <p>Email: {letter.email}</p>
              <p>Job Title: {letter.job_title}</p>
            </div>
            <div>
              <p>Created At: {new Date(letter.createdAt?.toDate()).toLocaleString()}</p>
            </div>
            <div>
              <p>Company: {letter.company}</p>
              <p>Location: {letter.location}</p>
              <p>Job Description: {letter.Job_description}</p>
              <div className="flex justify-center">
                <p>CoverLetter</p>
              </div>
              <div>
                <div>
                <p>{letter.coverLetter}</p>
                </div>
                <button onClick={() => handleDelete(letter.id)}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
  
}

export default AllLetters;
