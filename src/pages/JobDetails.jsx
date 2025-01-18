import Header from '../components/Header';
import { useParams } from 'react-router';
import useFetch from '../useFetch';

const JobDetails = () => {
  const { id } = useParams();
  console.log(id);
  const apiUrl = `https://job-posting-app-backend.vercel.app/jobs/${id}`;
  const { data, loading, error } = useFetch(apiUrl);
  //   console.log(data);
  return (
    <>
      <Header />
      <main className="container py-3">
        {error && <p className="alert alert-danger">No job post found.</p>}
        {data ? (
          <div>
            <h3 className="mb-3">{data.jobTitle}</h3>
            <div className="card">
              <div className="card-body">
                <p>
                  <strong>Company Name: </strong>
                  {data.companyName}
                </p>
                <p>
                  <strong>Location: </strong>
                  {data.location}
                </p>
                <p>
                  <strong>Salary: </strong>₹ {data.salary}
                </p>
                <p>
                  <strong>Job Type: </strong>
                  {data.jobType}
                </p>
                <p>
                  <strong>Description: </strong>
                  {data.jobDescription}
                </p>

                <strong>Qualifications: </strong>

                <ol>
                  {data.qualification.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        ) : (
          loading && <p className="alert alert-primary">Loading...</p>
        )}
      </main>
    </>
  );
};

export default JobDetails;
