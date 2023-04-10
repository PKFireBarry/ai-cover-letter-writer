import React, { useState } from 'react';

function Faq() {
  const [isHidden, setIsHidden] = useState(false);

  const handleHideClick = () => {
    setIsHidden(true);
  };

  return (
    <div className={`bg-gray-100 py-8 ${isHidden ? 'hidden' : ''}`}>
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
        <ul className="list-disc list-inside">
          <li>
            <details>
              <summary className="text-2xl font-bold mb-2">What is the job description?</summary>
              <p className="mb-4">The job description is a brief summary of the job, including its responsibilities and requirements.</p>
            </details>
          </li>
          <li>
            <details>
              <summary className="text-2xl font-bold mb-2">What is the job title and location?</summary>
              <p className="mb-4">The job title and location refer to the position you're applying for and where it's located.</p>
            </details>
          </li>
          <li>
            <details>
              <summary className="text-2xl font-bold mb-2">What is the company?</summary>
              <p className="mb-4">The company is the organization that is hiring for the position.</p>
            </details>
          </li>
          <li>
            <details>
              <summary className="text-2xl font-bold mb-2">How does the temperature slider function?</summary>
              <p className="mb-4">The temperature slider allows you to select how formal or informal you want the generated cover letter to be.</p>
            </details>
          </li>
          <li>
            <details>
              <summary className="text-2xl font-bold mb-2">What is the optional resume information used for?</summary>
              <p className="mb-4">The optional resume information is used to provide key information to the AI for generating the cover letter.</p>
            </details>
          </li>
        </ul>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4" onClick={handleHideClick}>
          Hide FAQ
        </button>
      </div>
    </div>
  )
}

export default Faq;
