import { auth, db } from "@/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import React, { useRef, useState, useEffect } from "react";
import Cookies from "universal-cookie";
import toast from "react-hot-toast";
import AllLetters from "./AllLetters";

const GenerateLetter = () => {
  const cookies = new Cookies();
  const [isAuth, setIsAuth] = useState(cookies.get("auth_user") || null);
  const [newJob, setNewJob] = useState("");
  const [job, setJob] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [resume, setResume] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [answer, setAnswer] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [temperature, setTemperature] = useState(0);
  const [link1, setLink1] = useState("");
  const [link2, setLink2] = useState("");

  //track the amount of characters and show the number of characters on the screen
  let words = job + company + location + resume + link1 + link2;
  const count = words.length/4;

  //the max number of characters is 4*3750
  const token_limit = 3750;

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (job === "") return;
    try {
      if (!auth.currentUser) {
        console.error("User not authenticated");
        return;
      }
      setIsLoading(true);
      const notification = toast.loading("ChatGPT is thinking...");

      // Combine all the data into a single object so that it can be sent to the API to create a new cover letter
      const prompt = `Write me a cover letter for the position of ${jobTitle} at ${company} located in ${location}. The job requirements are ${job}. My skills and experience are ${resume}, use them to show why im a great candidate for this role. My name is ${auth.currentUser.displayName}. include these links right below my gretting before the start of the letter ${link1} , ${link2}.`;

      // Send input data to OpenAI API and wait for response
      const response = await fetch("/api/hello", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: prompt, temperature: temperature }),
      });

      const data = await response.json();
      console.log(data.data);
      setAnswer(data.text);

      // Save the generated cover letter to Firebase
      addDoc(collection(db, "coverletter"), {
        Job_description: job,
        company: company,
        location: location,
        job_title: jobTitle,
        //resume: resume,
        coverLetter: data.text,
        createdAt: serverTimestamp(),
        user: auth.currentUser.displayName,
        userImage: auth.currentUser.photoURL,
        email: auth.currentUser.email,
        //link1: link1,
        //link2: link2,
      }).then(() => {
        setJob("");
        setCompany("");
        setLocation("");
        setJobTitle("");
        setResume("");
        setTemperature(0.1);
        setIsLoading(false);
        toast.success("ChatGPT has responded!");
      });
    } catch (error) {
      console.error("Error generating or saving cover letter: ", error);
      toast.error(
        "Error generating or saving cover letter. Please try again later."
      );
      setIsLoading(false);
    }
  };

  const toggleForm = () => {
    setIsVisible(!isVisible);
  };

  return (
<div className="flex flex-col md:flex-row items-center md:items-start h-screen bg-gray-100">
  <div className="md:w-1/3 m-4 bg-white rounded-lg shadow-lg p-6">
    <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
      <div className="flex justify-between items-center">
        <span className="text-gray-800 font-semibold">Word Count</span>
        <span className="text-gray-600 text-sm"> {count} / {token_limit} </span>
      </div>
      <div className="flex items-center space-x-4">
        <label className="flex-1">
          <span className="text-gray-800 font-semibold">Company</span>
          <input
            name="company"
            type="text"
            className="form-input block w-full mt-1 rounded-md shadow-sm"
            placeholder="Meta"
            required
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
        </label>
        <label className="flex-1">
          <span className="text-gray-800 font-semibold">Location</span>
          <input
            type="text"
            className="form-input block w-full mt-1 rounded-md shadow-sm"
            placeholder="San Francisco, CA"
            required
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </label>
      </div>
      <label className="flex-1">
        <span className="text-gray-800 font-semibold">Job Title </span>
        <input
          type="text"
          className="form-input block w-full mt-1 rounded-md shadow-sm"
          placeholder="Full Stack Developer"
          required
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
        />
      </label>
      <label>
        <span className="text-gray-800 font-semibold">Job Description</span>
        <textarea
          className="form-textarea block w-full mt-1 rounded-md shadow-sm"
          rows={15}
          placeholder="Provide a brief description of the job"
          required
          value={job}
          onChange={(e) => setJob(e.target.value)}
        ></textarea>
      </label>
      <details className="mb-4 text-gray-800 font-semibold">
        <summary>Resume Information</summary>
        <div>
          <label className="mb-4">
            <textarea
              className="form-textarea block w-full mt-1 rounded-md shadow-sm"
              rows={15}
              placeholder="Copy and Paste Your Resume Information Here"
              value={resume}
              onChange={(e) => setResume(e.target.value)}
            ></textarea>
          </label>
        </div>
      </details>
      <details className="mb-4 text-gray-800 font-semibold">
        <summary>Links</summary>
        <div>
          <label>
            <input
              name="link1"
              type="text"
              className="form-input block w-full mt-1 rounded-md shadow-sm mb-4"
              placeholder="Github"
              value={link1}
              onChange={(e) => setLink1(e.target.value)}
            />
            <input
              name="link2"
              type="text"
              className="form-input block w-full mt-1 rounded-md shadow-sm"
              placeholder="Portfolio"
              value={link2}
              onChange={(e) => setLink2(e.target.value)}
            />
          </label>
        </div>
      </details>
      <div className="flex items-center space-x-4">
        <label>
          <span className="text-gray-800 font-semibold">Temperature</span>
          <span className="text-gray-600 text-sm block">
            ({temperature})
          </span>
        </label>
        <div className="flex-1">
          <input
            type="range"
            min="0"
            max="0.50"
            step="0.01"
            value={temperature}
            onChange={(e) => setTemperature(parseFloat(e.target.value))}
            className="w-full h-5 bg-gray-300 rounded-full appearance-none outline-none focus:outline-none active:outline-none"
          />
        </div>
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md shadow-sm"
        type="submit"
      >
        Generate Cover Letter!
      </button>
    </form>
  </div>
  <div className="md:w-2/3 h-auto">
    <AllLetters />
  </div>
</div>
  );
};

export default GenerateLetter;
