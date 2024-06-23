import React, { useState } from 'react';
import Dashboard from './components/Dashboard';
import JobList from './components/JobList';
import ResumeUpload from './components/ResumeUpload';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [resumeUploaded, setResumeUploaded] = useState(false);

  const renderPage = () => {
    switch(currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'jobs':
        return <JobList />;
      case 'upload':
        return <ResumeUpload setResumeUploaded={setResumeUploaded} />;
      default:
        return <Dashboard />;
    }
  }

  return (
    <div className="App">
      <nav>
        <button onClick={() => setCurrentPage('dashboard')}>Dashboard</button>
        <button onClick={() => setCurrentPage('jobs')}>Job Matches</button>
        <button onClick={() => setCurrentPage('upload')}>Upload Resume</button>
      </nav>
      {renderPage()}
      {resumeUploaded && <p>Resume uploaded successfully!</p>}
    </div>
  );
}

export default App;
