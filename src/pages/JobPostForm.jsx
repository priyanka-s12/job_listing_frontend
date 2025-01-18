import Header from '../components/Header';
import { useState } from 'react';
const JobPostForm = () => {
  const [formData, setFormData] = useState({
    jobTitle: '',
    companyName: '',
    location: '',
    salary: '',
    jobType: '',
    jobDescription: '',
    qualification: [],
  });
  const [message, setMessage] = useState(false);

  const typeOfJobs = [
    'Full-time(On-site)',
    'Part-time(On-site)',
    'Full-time(Remote)',
    'Part-time(Remote)',
  ];

  const handleInput = (e) => {
    const { name, value } = e.target;
    // console.log(name, value);
    setFormData((formData) => ({
      ...formData,
      [name]: name === 'salary' ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(formData);
    const formatQualification = formData.qualification.split('\n');
    // console.log({ ...formData, qualification: formatQualification });
    const newData = { ...formData, qualification: formatQualification };

    try {
      const response = await fetch(
        'https://job-posting-app-backend.vercel.app/jobs',
        {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify(newData),
        }
      );

      if (!response.ok) {
        throw 'Failed to add a job post';
      }

      const data = await response.json();
      console.log('Added job post', data);

      setMessage(true);
      setFormData({
        jobTitle: '',
        companyName: '',
        location: '',
        salary: '',
        jobType: '',
        jobDescription: '',
        qualification: [],
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Header />
      <main className="container py-3">
        <section>
          <h2 className="mb-3">Post a Job</h2>
          {message && (
            <p className="alert alert-success">Job post added successfully</p>
          )}
          <form className="pb-3" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label" htmlFor="jobTitle">
                Job Title:{' '}
              </label>
              <input
                type="text"
                className="form-control"
                id="jobTitle"
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleInput}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="companyName">
                Company Name:{' '}
              </label>
              <input
                type="text"
                id="companyName"
                className="form-control"
                name="companyName"
                value={formData.companyName}
                onChange={handleInput}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="location">
                Location:{' '}
              </label>
              <input
                type="text"
                id="location"
                className="form-control"
                name="location"
                value={formData.location}
                onChange={handleInput}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="salary">
                Salary:{' '}
              </label>
              <input
                type="number"
                id="salary"
                className="form-control"
                name="salary"
                value={formData.salary}
                onChange={handleInput}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="jobType">
                Job Type:{' '}
              </label>
              <select
                id="jobType"
                className="form-select"
                name="jobType"
                value={formData.jobType}
                onChange={handleInput}
                required
              >
                <option value="">Select Job Type</option>
                {typeOfJobs.map((type, index) => (
                  <option value={type} key={index}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="jobDescription">
                Job Description:{' '}
              </label>
              <textarea
                className="form-control"
                id="jobDescription"
                name="jobDescription"
                value={formData.jobDescription}
                onChange={handleInput}
                required
              ></textarea>
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="qualification">
                Job Qualifications:{' '}
              </label>
              <textarea
                className="form-control"
                id="qualification"
                name="qualification"
                value={formData.qualification}
                onChange={handleInput}
                required
              ></textarea>
              <div className="form-text">
                Please write a point in each line and separate it with a full
                stop (.) and enter.
              </div>
            </div>

            <div className="mb-3">
              <button type="submit" id="postBtn" className="btn btn-primary">
                Post a Job
              </button>
            </div>
          </form>
        </section>
      </main>
    </>
  );
};

export default JobPostForm;
