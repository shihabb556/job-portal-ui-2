import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import {  useSelector } from 'react-redux'



import { toast } from 'sonner';



const Navbar = () => {
    const { user } = useSelector(store => store.auth);
  


    return (
        <div className='w-full bg-indigo-500 sticky top-0 z-50 shadow-md text-gray-700'>
            <div className='flex items-center px-3 justify-between mx-auto max-w-8xl h-16'>
                <div>
                    <Link to={'/'}>
                       <h1 className='md:text-2xl text-xl text-md  font-bold pb-1 md:pb-0 text-gray-200'>Job<span className='text-red-300'>Portal</span></h1>
                    </Link>
                </div>
                <div className='flex items-center gap-3 md:gap-8 '>
                    <ul className='flex font-medium items-center text-sm sm:text-md gap-5 '>
                        {
                            user && user.role === 'recruiter' ? (
                                <>
                                    <li className='text-gray-300 hover:text-gray-200'><Link to="/recruiter/companies">Companies</Link></li>
                                    <li className='text-gray-300 hover:text-gray-200'><Link to="/recruiter/jobs">Jobs</Link></li>
                                </>
                            ) : (
                                <>
                                    <li className='text-gray-200 hover:text-gray-300'><Link to="/">Home</Link></li>
                                    <li className='text-gray-200 hover:text-gray-300'><Link to="/jobs">Jobs</Link></li>
                                 
                                </>
                            )
                        }


                    </ul>
                    {
                        !user ? (
                            <div className='flex items-center gap-2'>
                                <Link to="/login"><Button sixe='sm' >Login</Button></Link>
                                <Link to="/signup" className='hidden md:block'><Button size='sm' className="bg-[#6A38C2] hover:bg-[#5b30a6]">Signup</Button></Link>
                            </div>
                        ) : (
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Avatar className="cursor-pointer">
                                        <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                                    </Avatar>
                                </PopoverTrigger>
                                <PopoverContent className="w-80">
                                    <div className=''>
                                        <Link to={"/profile"} className='flex gap-2 space-y-2 border-b-2 border-b- p-2'>
                                            <Avatar className="cursor-pointer">
                                                <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                                            </Avatar>
                                                <div>
                                                <h4 className='font-medium'>{user?.fullname}</h4>
                                            </div>
                                        </Link>
                                        
                                        <div className='flex flex-col my-2 text-gray-600'>
                                            {
                                                user && user?.role === 'student' && (
                                                    <div className='flex w-fit items-center gap-2 p-2 cursor-pointer'>
                                                      <ul className='flex gap-2 flex-col'>
                                                        <li className='hover:text-indigo-600'>  
                                                            <Link to="/">Home</Link>
                                                        </li>
                                                        <li className='hover:text-indigo-600'>  
                                                            <Link to="/jobs">Jobs</Link>
                                                        </li>
                                                        <li className='hover:text-indigo-600'>  
                                                            <Link to="/profile">Profile</Link>
                                                        </li>
                                                        <li className='hover:text-indigo-600'>  
                                                            <Link to="/interview-prep/qna">  Interview Preparation</Link>
                                                        </li>
                                                      </ul>
                                                    </div>
                                                )
                                            }
                                              {  user && user?.role === 'recruiter' && (
                                                    <div className='flex w-fit items-center gap-2 p-2 cursor-pointer'>
                                                      <ul className='flex gap-2 flex-col'>
                                                        <li className='hover:text-indigo-600'>  
                                                            <Link to="/recruiter/companies">Companies</Link>
                                                        </li>
                                                        <li className='hover:text-indigo-600'>  
                                                            <Link to="/recruiter/jobs">Jobs</Link>
                                                        </li>
                                                        <li className='hover:text-indigo-600'>  
                                                            <Link to="/profile">Profile</Link>
                                                        </li>
                                                      
                                                      </ul>
                                                    </div>
                                                )
                                            
                                            }

                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        )
                    }

                </div>
            </div>

        </div>
    )
}

export default Navbar