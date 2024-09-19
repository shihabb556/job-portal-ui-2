import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { lazy, Suspense, useEffect, useMemo } from 'react';
import ProtectedRoute from './components/recruiter/ProtectedRoute';
import { ErrorBoundary } from 'react-error-boundary';
import { useDispatch } from 'react-redux';
import {setUser } from './redux/authSlice';
import NotFound from './components/NotFound';
import JobsPage from './components/JobsPage';
import SignUp from './components/auth/test/SignUp';
import SignIn from './components/auth/test/SignIn';
import TermsAndConditions from './components/TermsAndConditions';
import ContactUs from './components/ContactUs';
import AboutUs from './components/AboutUs';



// Lazy load components for route-based splitting
const LandingPage = lazy(()=> import('./components/LandingPage'));
const Home = lazy(() => import('./components/Home'));
const Login = lazy(() => import('./components/auth/Login'));
const Signup = lazy(() => import('./components/auth/Signup'));
const Profile = lazy(() => import('./components/Profile'));
const Jobs = lazy(() => import('./components/Jobs'));
const Browse = lazy(() => import('./components/Browse'));
const JobDetails = lazy(() => import('./components/JobDetails'));
const InterviewQna = lazy(() => import('./components/InterviewQna'));

// Lazy load recruiter components
const Companies = lazy(() => import('./components/recruiter/Companies'));
const CompanyCreate = lazy(() => import('./components/recruiter/CompanyCreate'));
const CompanySetup = lazy(() => import('./components/recruiter/CompanySetup'));
const RecruiterJobs = lazy(() => import('./components/recruiter/RecruiterJobs'));
const PostJob = lazy(() => import('./components/recruiter/PostJob'));
const Applicants = lazy(() => import('./components/recruiter/Applicants'));
const EditJob = lazy(() => import('./components/recruiter/EditJob'));


const MyFallbackComponent = () => <div>Something went wrong.</div>;

// Define the routes using lazy-loaded components
const appRouter = createBrowserRouter([
  { path: '/', element: <LandingPage /> },
  { path: '/home', element: <Home /> },

  { path: '/login/test', element: <SignIn /> },
  { path: '/signup/test', element: <SignUp /> },

  { path: '/login', element: <Login /> },
  { path: '/signup', element: <Signup /> },

  { path: '/about', element: <AboutUs /> },
  { path: '/contact', element: <ContactUs /> },
  { path: '/terms', element: <TermsAndConditions /> },


  { path: '/profile', element: <Profile /> },
  { path: '/jobs', element: <JobsPage /> },
  { path: '/jobs/s', element: <Jobs /> },
  { path: '/browse', element: <Browse /> },
  { path: '/job/:id', element: <JobDetails /> },
  { path: '/interview-prep/qna', element: <InterviewQna /> },
  {path:'*', element: <NotFound/>},

  // recruiter routes with ProtectedRoute
  {
    path: '/recruiter/companies',
    element: <ProtectedRoute><Companies /></ProtectedRoute>,
  },
  {
    path: '/recruiter/company/create',
    element: <ProtectedRoute><CompanyCreate /></ProtectedRoute>,
  },
  {
    path: '/recruiter/company/:id',
    element: <ProtectedRoute><CompanySetup /></ProtectedRoute>,
  },
  {
    path: '/recruiter/jobs',
    element: <ProtectedRoute><RecruiterJobs /></ProtectedRoute>,
  },
  {
    path: '/recruiter/job/create',
    element: <ProtectedRoute><PostJob /></ProtectedRoute>,
  },
  {
    path: '/recruiter/job/edit/:jobId',
    element: <ProtectedRoute><EditJob /></ProtectedRoute>,
  },
  {
    path: '/recruiter/job/:id/applicants',
    element: <ProtectedRoute><Applicants /></ProtectedRoute>,
  },
]);

function App() {
  const dispatch = useDispatch();
 

  useEffect(() => {
    // Rehydrate user data
    const user = JSON.parse(localStorage.getItem('job-portal_user'));
    const token = JSON.parse(localStorage.getItem('job-portal_token'));
    if (user && token) {
      dispatch(setUser({ user, token }));
    }

  }, [dispatch]);

  return (
    <ErrorBoundary FallbackComponent={MyFallbackComponent}>
      <Suspense fallback={
         <div className="flex justify-center mt-5">
           <div className="loader border-t-4 border-blue-500 rounded-full w-8 h-8 animate-spin m-10"></div>
        </div>
      }>
        <RouterProvider router={appRouter} />
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
