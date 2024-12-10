import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../Components/Bars/Navbar';
import Footer from '../Components/LandingPage_components/Footer';

const OtpVerification = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { email } = location.state || {};
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [passwordsMatch, setPasswordsMatch] = useState(true);

    const handleotpverify = async (e) => {
        e.preventDefault();
        setIsLoading(true); // Show loading state
        try {
            // Verify OTP
            const response = await axios.post('http://localhost:1000/verify-otp', { email, otp, newPassword });
    
            if (response.status === 200) {
                // If OTP is verified and password changed, show success message
                toast.success('Password changed successfully!');
                navigate('/Login'); // Redirect to login page after successful password change
            } else {
                toast.error('Failed to verify OTP.');
            }
        } catch (error) {
            console.error('Error verifying OTP:', error);
            const errorMessage = error.response?.data?.message || "Failed to verify OTP.";
            toast.error(errorMessage);
        } finally {
            setIsLoading(false); // Hide loading state
        }
    };
    
    const handleNewPasswordChange = (e) => {
        const newPass = e.target.value;
        setNewPassword(newPass);
        setPasswordsMatch(newPass === confirmPassword); // Check if passwords match
    };
    
    const handleConfirmPasswordChange = (e) => {
        const confirmPass = e.target.value;
        setConfirmPassword(confirmPass);
        setPasswordsMatch(newPassword === confirmPass); // Check if passwords match
    };
    

    return (
        <div>
            <Navbar />
            <div className='flex justify-center'>
                <div>
                    <img src="/images/Login.svg" alt="page for Login" className="w-[780px] h-[650px] bg-white" />
                </div>
                <div className='flex justify-center'>
                    <div className="w-[750px] bg-[#dbe2ef]">
                        <h1 className='text-6xl text-[#112d4e] text-center mt-[50px]'>Verify OTP</h1>
                        <div className='ml-[100px] mt-[40px] w-[550px] text-[#112d4e] justify-center'>
                            <form onSubmit={handleotpverify}>
                                <p className='mb-1'>Enter OTP</p>
                                <input
                                    type="text"
                                    placeholder="OTP"
                                    className="w-full mb-6 p-2 border rounded"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    required
                                />
                                <p className='mb-1'>Enter New Password</p>
                                <div className="relative w-full mb-6">
                                    <input
                                        type={showNewPassword ? "text" : "password"}
                                        placeholder="New Password"
                                        className="w-full p-2 border rounded"
                                        value={newPassword}
                                        onChange={handleNewPasswordChange}
                                        required
                                    />
                                    <span
                                        onClick={() => setShowNewPassword(!showNewPassword)}
                                        className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                                    >
                                        {showNewPassword ? <AiFillEyeInvisible size={24} /> : <AiFillEye size={24} />}
                                    </span>
                                </div>
                                <p className='mb-1'>Confirm Password</p>
                                <div className="relative w-full mb-6">
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        placeholder="Confirm Password"
                                        className={`w-full p-2 border rounded ${!passwordsMatch && 'border-red-500'}`}
                                        value={confirmPassword}
                                        onChange={handleConfirmPasswordChange}
                                        required
                                    />
                                    <span
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                                    >
                                        {showConfirmPassword ? <AiFillEyeInvisible size={24} /> : <AiFillEye size={24} />}
                                    </span>
                                    {!passwordsMatch && (
                                        <p className="text-red-500 text-sm mt-1">Passwords do not match.</p>
                                    )}
                                </div>
                                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded" disabled={isLoading}>
                                    {isLoading ? "Processing..." : "Reset Password"}
                                </button>
                            </form>
                            <div className="mt-2 text-center">
                                <Link to="/Login">
                                    <p className="text-[#112d4e] hover:underline">Back to Login</p>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default OtpVerification;