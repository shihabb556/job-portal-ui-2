import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import ProtectedRoute from './components/admin/ProtectedRoute';
import Navbar from './components/shared/Navbar';
import { ErrorBoundary } from 'react-error-boundary';

// Lazy load components for route-based splitting
const Home = lazy(() => import('./components/Home'));
const Login = lazy(() => import('./components/auth/Login'));
const Signup = lazy(() => import('./components/auth/Signup'));
const Profile = lazy(() => import('./components/Profile'));
const Jobs = lazy(() => import('./components/Jobs'));
const Browse = lazy(() => import('./components/Browse'));
const JobDetails = lazy(() => import('./components/JobDetails'));
const InterviewQna = lazy(() => import('./components/InterviewQna'));

// Lazy load admin components
const Companies = lazy(() => import('./components/admin/Companies'));
const CompanyCreate = lazy(() => import('./components/admin/CompanyCreate'));
const CompanySetup = lazy(() => import('./components/admin/CompanySetup'));
const AdminJobs = lazy(() => import('./components/admin/AdminJobs'));
const PostJob = lazy(() => import('./components/admin/PostJob'));
const Applicants = lazy(() => import('./components/admin/Applicants'));

const MyFallbackComponent = () => <div>Something went wrong.</div>;

// Define the routes using lazy-loaded components
const appRouter = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <Signup /> },
  { path: '/profile', element: <Profile /> },
  { path: '/jobs', element: <Jobs /> },
  { path: '/browse', element: <Browse /> },
  { path: '/job/:id', element: <JobDetails /> },
  { path: '/interview-prep/qna', element: <InterviewQna /> },

  // Admin routes with ProtectedRoute
  {
    path: '/admin/companies',
    element: <ProtectedRoute><Companies /></ProtectedRoute>,
  },
  {
    path: '/admin/companies/create',
    element: <ProtectedRoute><CompanyCreate /></ProtectedRoute>,
  },
  {
    path: '/admin/companies/:id',
    element: <ProtectedRoute><CompanySetup /></ProtectedRoute>,
  },
  {
    path: '/admin/jobs',
    element: <ProtectedRoute><AdminJobs /></ProtectedRoute>,
  },
  {
    path: '/admin/jobs/create',
    element: <ProtectedRoute><PostJob /></ProtectedRoute>,
  },
  {
    path: '/admin/jobs/:id/applicants',
    element: <ProtectedRoute><Applicants /></ProtectedRoute>,
  },
]);

function App() {
  return (
    <ErrorBoundary FallbackComponent={MyFallbackComponent}>
      <Suspense fallback={<div>Loading...</div>}>
        <RouterProvider router={appRouter} />
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
