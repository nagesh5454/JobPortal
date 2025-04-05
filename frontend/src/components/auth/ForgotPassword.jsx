import { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await axios.post(`${USER_API_END_POINT}/forgot-password`, { email });
            toast.success(res.data.message);
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong");
        }
        setLoading(false);
    };

    return (
        <div>
            <Navbar />
            <div className="flex items-center justify-center max-w-7xl mx-auto">
                <form onSubmit={submitHandler} className="w-1/2 border border-gray-200 rounded-md p-4 my-10">
                    <h1 className="font-bold text-xl mb-5">Forgot Password</h1>
                    <div className="my-2">
                        <Label>Email</Label>
                        <Input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                        />
                    </div>
                    <Button type="submit" className="w-full my-4" disabled={loading}>
                        {loading ? "Sending..." : "Send Reset Link"}
                    </Button>
                    <span className="text-sm">
                        Remember your password? <Link to="/login" className="text-blue-600">Login</Link>
                    </span>
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;
