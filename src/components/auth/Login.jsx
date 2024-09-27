import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '@/utils/constant';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setUser } from '@/redux/authSlice';
import { Loader2 } from 'lucide-react';

const Login = () => {
    const [input, setInput] = useState({
        email: "",
        password: "",
    });
    const { loading, user } = useSelector(store => store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        if (!input.email || !input.password) {
            toast.error("Required fields should not be empty!");
            return;
        }

        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${BASE_URL}/user/login`, input, {
                headers: {
                    "Content-Type": "application/json"
                },
            });
            if (res?.data?.success) {
                dispatch(setUser({ user: res?.data?.user, token: res?.data?.token }));
                navigate("/profile");
                toast.success(res?.data?.message);
            }
        } catch (error) {
            toast.error(error?.response?.data?.message);
        } finally {
            dispatch(setLoading(false));
        }
    };

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user, navigate]);

    return (
        <div className=" min-h-screen">
            <Navbar />
            <div className='flex items-center justify-center max-w-7xl mx-auto'>
                <form onSubmit={submitHandler} className='w-[88vw] sm:w-[70vw] md:w-1/2 bg-gray-800 border border-gray-600 rounded-md p-4 my-10 '>
                    <h1 className='font-bold text-xl mb-5 text-white'>Login</h1>
                    <div className='my-2'>
                        <Label className="text-white">Email</Label>
                        <Input
                            type="email"
                            value={input.email}
                            name="email"
                            onChange={changeEventHandler}
                            placeholder="example@gmail.com"
                            className="bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div className='my-2'>
                        <Label className="text-white">Password</Label>
                        <Input
                            type="password"
                            value={input.password}
                            name="password"
                            onChange={changeEventHandler}
                            placeholder="example-123"
                            className="bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    {
                        loading ? (
                            <Button className="w-[9em] my-4 bg-gray-400">
                                <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait
                            </Button>
                        ) : (
                            <Button type="submit" className="w-[6em] my-4 bg-blue-500 hover:bg-blue-600 transition">Login</Button>
                        )
                    }
                    <div className='text-sm text-white'>Don't have an account? <Link to="/signup" className='text-blue-400'>Signup</Link></div>
                </form>
            </div>
        </div>
    );
}

export default Login;
