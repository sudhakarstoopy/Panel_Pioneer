import React, { useState, useEffect } from 'react';

function JobList() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    // Simulating API call to fetch job matches
    setTimeout(() => {
      setJobs([
        { id: 1, title: 'Senior Data Scientist', company: 'AI Innovations Inc.', matchScore: 0.92 },
        { id: 2, title: 'Machine Learning Engineer', company: 'DataTech Solutions', matchScore: 0.87 },
      ]);
    }, 1000);
  }, []);

  return (
    <div className="JobList">
      <h2>Job Matches</h2>
      {jobs.map(job => (
        <div key={job.id}>
          <h3>{job.title}</h3>
          <p>Company: {job.company}</p>
          <p>Match Score: {job.matchScore.toFixed(2)}</p>
        </div>
      ))}
    </div>
  );
}

export default JobList;
