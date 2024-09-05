import { useState } from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Navbar from './components/shared/Navbar'
import Home from './components/Home'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Profile from './components/Profile'
import Jobs from './components/Jobs'
import Browse from './components/Browse'
import ProtectedRoute from './components/admin/ProtectedRoute'
import Companies from './components/admin/Companies'
import CompanyCreate from './components/admin/CompanyCreate'
import CompanySetup from './components/admin/CompanySetup'
import AdminJobs from './components/admin/AdminJobs'
import PostJob from './components/admin/PostJob'
import Applicants from './components/admin/Applicannts'
import JobDescription from './components/JobDescription'
import InterviewQna from './components/InterviewQna'

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <Signup />
  },
  {
    path:"/profile",
    element: <Profile />
  },
  {
    path:"/jobs",
    element: <Jobs />
  },
  {
    path:"/browse",
    element: <Browse />
  },

  {
    path:"/job/:id",
    element: <JobDescription />
  },

  {
    path:"/interview-prep/qna",
    element:<InterviewQna/>
  },

  // Recruiter protected route start
  {
    path:"/admin/companies",
    element: <ProtectedRoute><Companies /></ProtectedRoute>
  },
  {
    path:"/admin/companies/create",
    element: <ProtectedRoute><CompanyCreate/></ProtectedRoute> 
  },
  {
    path:"/admin/companies/:id",
    element:<ProtectedRoute><CompanySetup/></ProtectedRoute> 
  },
  {
    path:"/admin/jobs",
    element:<ProtectedRoute><AdminJobs/></ProtectedRoute> 
  },
  {
    path:"/admin/jobs/create",
    element:<ProtectedRoute><PostJob/></ProtectedRoute> 
  },
  {
    path:"/admin/jobs/:id/applicants",
    element:<ProtectedRoute><Applicants/></ProtectedRoute> 
  },


])

function App() {


  return (
    <div>
      <RouterProvider router={appRouter} />
  </div>
  )
}

export default App
