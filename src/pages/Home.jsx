import useFetch from '../useFetch';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Home = () => {
  const [jobTitle, setJobTitle] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const apiUrl = 'https://job-posting-app-backend.vercel.app/jobs';

  const { data, loading, error } = useFetch(apiUrl);
  //   console.log(data);
  //   console.log(jobTitle);

  const filteredJobs = jobTitle
    ? data?.filter((job) =>
        job.jobTitle.toLowerCase().includes(jobTitle.toLowerCase())
      )
    : data;
  //   console.log(filteredJobs);

  const handleDelete = async (jobId) => {
    try {
      const response = await fetch(`${apiUrl}/${jobId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw 'Failed to delete job post';
      }

      const data = await response.json();
      if (data) {
        setSuccessMessage('Job post deleted successfully');
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="container py-3">
      <section className="mb-3 col-md-6">
        <input
          type="text"
          placeholder="Search by job title..."
          className="form-control"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
        />
      </section>

      <section className="mt-3">
        <h2 className="mb-3">All Jobs</h2>
        {loading && <p className="alert alert-primary">Loading...</p>}
        {error && (
          <p className="alert alert-danger">
            An error occured while geting job posts
          </p>
        )}
        {successMessage && (
          <p className="alert alert-success">Job post deleted successfully</p>
        )}

        {data && data.length > 0 && (
          <>
            <div className="row">
              {filteredJobs?.map((job) => (
                <div className="col-md-4" key={job._id}>
                  <div className="card mb-3">
                    <div className="card-body">
                      <h4>{job.jobTitle}</h4>
                      <p>
                        <strong>Company Name: </strong>
                        {job.companyName}
                      </p>
                      <p>
                        <strong>Location: </strong>
                        {job.location}
                      </p>
                      <p>
                        <strong>Job Type: </strong>
                        {job.jobType}
                      </p>
                      <div className="d-grid gap-2 d-md-flex">
                        <Link
                          className="btn btn-primary"
                          to={`/jobs/${job._id}`}
                        >
                          See Details
                        </Link>
                        <Link
                          className="btn btn-danger"
                          onClick={() => handleDelete(job._id)}
                        >
                          Delete
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </section>
    </main>
  );
};

export default Home;
