import { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { RadioGroup } from '../ui/radio-group';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setUser } from '@/redux/authSlice';
import { Loader2 } from 'lucide-react';

const Login = () => {
    const [input, setInput] = useState({
        email: "",
        password: "",
        role: "",
    });

    const { loading, user } = useSelector(store => store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            dispatch(setLoading(true));

            const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            });

            if (res.data.success) {
                dispatch(setUser(res.data.user));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Something went wrong.");
        } finally {
            dispatch(setLoading(false));
        }
    };

    useEffect(() => {
        if (user) navigate("/");
    }, [user, navigate]);

    return (
        <div>
            <Navbar />
            <div className="flex items-center justify-center max-w-7xl mx-auto">
                <form onSubmit={submitHandler} className="w-1/2 border border-gray-200 rounded-md p-6 my-10 shadow-md">
                    <h1 className="font-bold text-2xl mb-5 text-center">Login</h1>

                    {/* Email Field */}
                    <div className="my-2">
                        <Label>Email</Label>
                        <Input
                            type="email"
                            value={input.email}
                            name="email"
                            onChange={changeEventHandler}
                            placeholder="Enter Your Email"
                            required
                        />
                    </div>

                    {/* Password Field */}
                    <div className="my-2">
                        <Label>Password</Label>
                        <Input
                            type="password"
                            value={input.password}
                            name="password"
                            onChange={changeEventHandler}
                            placeholder="Enter Your Password"
                            required
                        />
                    </div>

                    {/* Forgot Password Link */}
                    <div className="flex justify-end">
                        <Link to="/forgot-password" className="text-blue-600 text-sm font-medium hover:underline">
                            Forgot Password?
                        </Link>
                    </div>

                    {/* Role Selection */}
                    <div className="my-5">
                        <Label className="font-semibold">Select Role:</Label>
                        <RadioGroup className="flex items-center gap-4 mt-2">
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="student"
                                    checked={input.role === 'student'}
                                    onChange={changeEventHandler}
                                    className="cursor-pointer"
                                    required
                                />
                                <Label>Student</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="recruiter"
                                    checked={input.role === 'recruiter'}
                                    onChange={changeEventHandler}
                                    className="cursor-pointer"
                                    required
                                />
                                <Label>Recruiter</Label>
                            </div>
                        </RadioGroup>
                    </div>

                    {/* Login Button */}
                    <Button
                        type="submit"
                        className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition"
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait...
                            </>
                        ) : (
                            "Login"
                        )}
                    </Button>

                    {/* Signup Link */}
                    <div className="text-center mt-4">
                        <span className="text-sm">
                            Don't have an account?{" "}
                            <Link to="/signup" className="text-blue-600 font-medium hover:underline">
                                Signup
                            </Link>
                        </span>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;

