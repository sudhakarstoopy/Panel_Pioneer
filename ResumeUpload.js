import React, { useState } from 'react';

function ResumeUpload({ setResumeUploaded }) {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (file) {
      // Simulating API call to upload resume
      setTimeout(() => {
        console.log('Resume uploaded:', file.name);
        setResumeUploaded(true);
      }, 1000);
    }
  };

  return (
    <div className="ResumeUpload">
      <h2>Upload Your Resume</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} accept=".pdf,.doc,.docx" />
        <button type="submit" disabled={!file}>Upload</button>
      </form>
    </div>
  );
}

export default ResumeUpload;
