import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Avatar, AvatarImage } from '../ui/avatar'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Navbar = () => {
    const { user } = useSelector(store => store.auth);

    return (
        <nav className="w-full bg-white sticky top-0 z-50 shadow-lg border-b border-gray-200">
            <div className="flex items-center justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16">
                
                {/* Logo */}
                <div>
                    <NavLink to={'/'} className="flex items-center pr-2">
                        <h1 className="text-2xl font-extrabold text-indigo-600">
                            Job<span className="text-red-500">Portal</span>
                        </h1>
                    </NavLink>
                </div>

                {/* Links */}
                <div className="flex items-center gap-8">
                    <ul className="flex items-center space-x-6 font-medium">
                        {
                            user && user.role === 'recruiter' ? (
                                <>
                                    <li>
                                        <NavLink to="/recruiter/companies" className="text-gray-600 hover:text-indigo-500">
                                            Companies
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/recruiter/jobs" className="text-gray-600 hover:text-indigo-500">
                                            Jobs
                                        </NavLink>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li>
                                        <NavLink to="/" className="text-gray-600 hover:text-indigo-500">
                                            Home
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/jobs" className="text-gray-600 hover:text-indigo-500">
                                            Jobs
                                        </NavLink>
                                    </li>
                                    <li className='hidden sm:block'>
                                        <NavLink to="/saved-jobs" className=" text-gray-600 hover:text-indigo-500">
                                            Saved Jobs
                                        </NavLink>
                                    </li>
                                    <li className='hidden sm:block'>
                                       <NavLink to="/interview-prep/qna" className=" text-gray-600 hover:text-indigo-600">Interview Preparation</NavLink>
                                    </li>
                                </>
                            )
                        }
                    </ul>

                    {/* User Profile / Login */}
                    {
                        !user ? (
                            <div>
                                <NavLink to="/login">
                                    <Button variant="primary" size="sm">Login</Button>
                                </NavLink>
                            </div>
                        ) : (
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Avatar className="cursor-pointer">
                                        <AvatarImage src={user?.profile?.profilePhoto} alt="User Avatar" />
                                    </Avatar>
                                </PopoverTrigger>
                                <PopoverContent className="w-64 p-4">
                                    <div className="flex items-center gap-3 mb-3 border-b pb-2">
                                        <Avatar className="cursor-pointer">
                                            <AvatarImage src={user?.profile?.profilePhoto} alt="User Avatar" />
                                        </Avatar>
                                        <div>
                                            <h4 className="font-medium">{user?.fullname}</h4>
                                            <p className="text-sm text-gray-500">{user?.role}</p>
                                        </div>
                                    </div>

                                    <div className="flex flex-col space-y-2">
                                        {
                                            user?.role === 'student' ? (
                                                <>
                                                    <NavLink  to="/" className="hover:text-indigo-600">Home</NavLink>
                                                    <NavLink to="/jobs" className="hover:text-indigo-600">Jobs</NavLink>
                                                    <NavLink to="/saved-jobs" className="hover:text-indigo-600">Saved Jobs</NavLink>
                                                    <NavLink to="/profile" className="hover:text-indigo-600">Profile</NavLink>
                                                    <NavLink to="/interview-prep/qna" className="hover:text-indigo-600">Interview Preparation</NavLink>
                                                </>
                                            ) : (
                                                <>
                                                    <NavLink to="/recruiter/companies" className="hover:text-indigo-600">Companies</NavLink>
                                                    <NavLink to="/recruiter/jobs" className="hover:text-indigo-600">Jobs</NavLink>
                                                    <NavLink to="/profile" className="hover:text-indigo-600">Profile</NavLink>
                                                </>
                                            )
                                        }
                                    </div>
                                </PopoverContent>
                            </Popover>
                        )
                    }
                </div>
            </div>
        </nav>
    )
}

export default Navbar;
