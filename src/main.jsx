import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import App from './App.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import JobDetails from './pages/JobDetails';
import JobPostForm from './pages/JobPostForm';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/jobs/:id',
    element: <JobDetails />,
  },
  {
    path: '/jobs/add',
    element: <JobPostForm />,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>
);
