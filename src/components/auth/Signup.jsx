import { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { RadioGroup } from '../ui/radio-group';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '@/utils/constant';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '@/redux/authSlice';
import { Loader2 } from 'lucide-react';

const Signup = () => {
    const [input, setInput] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "",
        file: ""
    });

    const { loading, user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] });
    };

    const { fullname, email, phoneNumber, password, role } = input;

    const submitHandler = async (e) => {
        e.preventDefault();

        if (!fullname || !email || !phoneNumber || !password || !role) {
            toast.error("Required field should not be empty!");
            return;
        }

        const formData = new FormData(); // formdata object
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("password", input.password);
        formData.append("role", input.role);
        if (input.file) {
            formData.append("file", input.file);
        }

        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${BASE_URL}/user/register`, formData, {
                headers: { 'Content-Type': "multipart/form-data" },
            });
            if (res?.data?.success) {
                console.log(res?.data.success);
                navigate("/login");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            dispatch(setLoading(false));
        }
    };

    useEffect(() => {
        // react-hooks/exhaustive-deps
        if (user) {
            navigate("/");
        }
    }, [user]);

    return (
        <div className="bg-gray-800 min-h-screen">
            <Navbar />
            <div className='flex items-center justify-center max-w-7xl mx-auto'>
                <form onSubmit={submitHandler} className='w-[88vw] sm:w-[70vw] md:w-1/2 border border-gray-700 rounded-md p-6 my-10 bg-gray-900'>
                    <h1 className='font-bold text-2xl text-white mb-5'>Create Your Account</h1>
                    <p className='text-gray-400 mb-4'>Join us to find the best job opportunities tailored for you.</p>
                    <div className='my-2'>
                        <Label className="text-white">Full Name</Label>
                        <Input
                            type="text"
                            value={input.fullname}
                            name="fullname"
                            onChange={changeEventHandler}
                            placeholder="What's your name?"
                            className="bg-gray-700 text-white"
                            required
                        />
                    </div>
                    <div className='my-2'>
                        <Label className="text-white">Email</Label>
                        <Input
                            type="email"
                            value={input.email}
                            name="email"
                            onChange={changeEventHandler}
                            placeholder="example@gmail.com"
                            className="bg-gray-700 text-white"
                            required
                        />
                    </div>
                    <div className='my-2'>
                        <Label className="text-white">Phone Number</Label>
                        <Input
                            type="text"
                            value={input.phoneNumber}
                            name="phoneNumber"
                            onChange={changeEventHandler}
                            placeholder="+880-1770419***"
                            className="bg-gray-700 text-white"
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
                            required
                            placeholder="example-123"
                            className="bg-gray-700 text-white"
                        />
                    </div>
                    <div className='my-2'>
                        <Label className="text-white">Profile Picture</Label>
                        <Input
                            accept="image/*"
                            type="file"
                            onChange={changeFileHandler}
                            className="cursor-pointer bg-gray-700 text-white"
                            required
                        />
                    </div>
                    <div className='flex items-center justify-between'>
                        <RadioGroup className="flex items-center gap-4 my-5">
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="student"
                                    checked={input.role === 'student'}
                                    onChange={changeEventHandler}
                                    className="cursor-pointer"
                                />
                                <Label htmlFor="r1" className='text-white'>Jobseeker</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="recruiter"
                                    checked={input.role === 'recruiter'}
                                    onChange={changeEventHandler}
                                    className="cursor-pointer"
                                />
                                <Label htmlFor="r2" className='text-white'>Recruiter</Label>
                            </div>
                        </RadioGroup>
                    </div>
                    {
                        loading ? 
                        <Button className="w-[9em] my-4 bg-gray-600" disabled>
                            <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait 
                        </Button> 
                        : 
                        <Button type="submit" className="w-[6em] my-4 bg-indigo-600 hover:bg-indigo-700">Signup</Button>
                    }
                    <div className='text-sm text-gray-300'>
                        Already have an account? 
                        <Link to="/login" className='text-blue-400 hover:text-blue-300'> Login</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signup;
