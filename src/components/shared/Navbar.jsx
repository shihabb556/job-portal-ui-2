import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Avatar, AvatarImage } from '../ui/avatar'
import { LogOut, User2 ,Link2} from 'lucide-react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../redux/authSlice';
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner';
// import { persistor } from '../../redux/store'; 


const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    let respUser;
    if (user) {
        respUser = user?.user || {};
    };


    return (
        <div className='w-full bg-white sticky top-0 z-50 bg-opacity-5 backdrop-blur-md shadow-md '>
            <div className='flex items-center px-3 justify-between mx-auto max-w-7xl h-16'>
                <div>
                    <Link to={'/'}>
                       <h1 className='md:text-2xl sm:text-xl text-sm  font-bold pb-1 md:pb-0 text-[#6A38C2]'>Job<span className='text-[#F83002]'>Portal</span></h1>
                    </Link>
                </div>
                <div className='flex items-center gap-3 md:gap-8 '>
                    <ul className='flex font-medium items-center text-sm sm:text-md gap-5'>
                        {
                            respUser && respUser.role === 'recruiter' ? (
                                <>
                                    <li><Link to="/admin/companies">Companies</Link></li>
                                    <li><Link to="/admin/jobs">Jobs</Link></li>
                                </>
                            ) : (
                                <>
                                    <li><Link to="/">Home</Link></li>
                                    <li><Link to="/jobs">Jobs</Link></li>
                                 
                                </>
                            )
                        }


                    </ul>
                    {
                        !respUser ? (
                            <div className='flex items-center gap-2'>
                                <Link to="/login"><Button sixe='sm' variant="outline">Login</Button></Link>
                                <Link to="/signup"><Button size='sm' className="bg-[#6A38C2] hover:bg-[#5b30a6]">Signup</Button></Link>
                            </div>
                        ) : (
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Avatar className="cursor-pointer">
                                        <AvatarImage src={respUser?.profile?.profilePhoto} alt="@shadcn" />
                                    </Avatar>
                                </PopoverTrigger>
                                <PopoverContent className="w-80">
                                    <div className=''>
                                        <Link to={"/profile"} className='flex gap-2 space-y-2 border-b-2 border-b- p-2'>
                                            <Avatar className="cursor-pointer">
                                                <AvatarImage src={respUser?.profile?.profilePhoto} alt="@shadcn" />
                                            </Avatar>
                                                <div>
                                                <h4 className='font-medium'>{respUser?.fullname}</h4>
                                            </div>
                                        </Link>
                                        
                                        <div className='flex flex-col my-2 text-gray-600'>
                                            {
                                                respUser && respUser.role === 'student' && (
                                                    <div className='flex w-fit items-center gap-2 p-2 cursor-pointer'>
                                                      <ul className='flex gap-2 flex-col'>
                                                        <li>  
                                                            <Link to="/">Home</Link>
                                                        </li>
                                                        <li>  
                                                            <Link to="/jobs">Jobs</Link>
                                                        </li>
                                                        <li>  
                                                            <Link to="/profile">Profile</Link>
                                                        </li>
                                                        <li>  
                                                            <Link to="/interview-prep/qna">  Interview Preparation</Link>
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