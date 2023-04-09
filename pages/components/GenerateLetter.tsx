import { auth, db } from "@/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import React, { useRef, useState } from "react";
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
      let cleanstring = resume;
      cleanstring.replace(/[^a-zA-Z0-9 ]/g, "");
      cleanstring.trim();
      const cleanedResume = cleanstring;

      const tempeture = 1;
      const prompt = `Write me a cover letter for ${jobTitle} at ${company} in ${location}. ${job}. use my resume here to use for my skills and expereince ${cleanedResume}.`;

      // Send input data to OpenAI API and wait for response
      const response = await fetch("/api/hello", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: prompt, tempeture: tempeture }),
      });

      const data = await response.json();
      console.log(data);
      setAnswer(data.text);

      // Save the generated cover letter to Firebase
      addDoc(collection(db, "coverletter"), {
        Job_description: job,
        company: company,
        location: location,
        job_title: jobTitle,
        resume: resume,
        coverLetter: data.text,
        createdAt: serverTimestamp(),
        user: auth.currentUser.displayName,
        userImage: auth.currentUser.photoURL,
        email: auth.currentUser.email,
      }).then(() => {
        setJob("");
        setCompany("");
        setLocation("");
        setJobTitle("");
        setResume("");
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
    <div className="flex flex-col md:flex-row items-center md:items-start h-screen bg-slate-200">
      <div className=" md:w-1/3 m-4 ">
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <div className="flex items-center space-x-4">
            <label className="flex-1">
              <span className="text-gray-800 font-semibold">Company</span>
              <input
                type="text"
                className="form-input block w-full mt-1 rounded-md shadow-sm"
                placeholder=" Meta "
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
            <span className="text-gray-800 font-semibold">Job Title: </span>
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
          <label className="mb-4">
            <span className="text-gray-800 font-semibold">Resume</span>
            <textarea
              className="form-textarea block w-full mt-1 rounded-md shadow-sm"
              rows={15}
              placeholder="Copy and Paste Your Resume Information Here"
              value={resume}
              onChange={(e) => setResume(e.target.value)}
            ></textarea>
          </label>
          {/* list of radio button for hocreative you want the cover letter to be */}
          <button
            className="bg-blue-500 pt-4 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md shadow-sm"
            type="submit"
          >
            Generate Cover letter!
          </button>
        </form>
      </div>
      <div className=" md:w-2/3">
        <AllLetters />
      </div>
    </div>
  );
};

export default GenerateLetter;
