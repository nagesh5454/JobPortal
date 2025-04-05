import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";

const ResetPassword = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const { token } = useParams(); // Get token from URL
    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            return toast.error("Passwords do not match!");
        }
        setLoading(true);
        try {
            const res = await axios.post(`${USER_API_END_POINT}/reset-password`, { token, password });
            toast.success(res.data.message);
            navigate("/login");
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
                    <h1 className="font-bold text-xl mb-5">Reset Password</h1>
                    <div className="my-2">
                        <Label>New Password</Label>
                        <Input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter new password"
                        />
                    </div>
                    <div className="my-2">
                        <Label>Confirm Password</Label>
                        <Input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm new password"
                        />
                    </div>
                    <Button type="submit" className="w-full my-4" disabled={loading}>
                        {loading ? "Resetting..." : "Reset Password"}
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;
