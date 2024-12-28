import React, { useState, useEffect } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../Components/Bars/Navbar';
import Footer from '../Components/HomePage_components/Footer';
import { toast } from 'react-toastify';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:1337/api/auth/local', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ identifier: email, password }),
            });
            const data = await response.json();

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Login failed. Please check your credentials.');
            }

            if (data.jwt && data.user) {
                // Store token and user data in localStorage
                localStorage.setItem('token', data.jwt);
                localStorage.setItem('userType', data.user.userType || 'Guest'); // Default to 'Guest' if undefined
                localStorage.setItem('loginTime', new Date().getTime());

                toast.success('Login successful!');
                const token = localStorage.getItem('token');

// Print it to the console
console.log( token);
console.log(data.user.email)
                // Redirect based on userType
                if (data.user.userType === 'Admin') {
                    navigate('/Admin'); // Admin homepage
                } else if (data.user.userType === 'Learner') {
                    navigate('/Learner'); // Learner homepage
                } else {
                    console.warn('Unknown userType:', data.user.userType);
                    navigate('/'); // Default fallback homepage
                }
            } else {
                toast.error(data.message || 'Unexpected error. Please try again.');
            }
        } catch (error) {
            console.error('Error during login:', error.message);
            toast.error(`An error occurred: ${error.message}`);
        }
    };

    const handleCheckboxChange = () => {
        setRememberMe(!rememberMe);
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        setIsTyping(e.target.value.length > 0);
    };

    return (
        <div>
            <Navbar />
            <div className='bg-white flex justify-center z-0'>
                <video
                    src="/videos/Login.mp4"
                    type="video/mp4"
                    autoPlay
                    loop
                    muted
                    className="w-full max-h-[650px] bg-white object-cover"
                    onError={(e) => console.error("Video failed to load:", e)}
                />
            </div>
            <div className="absolute inset-0 mt-28">
                <h1 className='text-8xl text-white text-center mt-[100px]'>Login</h1>
                <div className='flex justify-center pt-2'>
                    <div className='w-[550px] text-white justify-center'>
                        <form onSubmit={handleLogin}>
                            <p className='mb-1'>Enter Email Address</p>
                            <input
                                type="email"
                                placeholder="Email Address"
                                className="w-full p-3 bg-transparent border-2 border-white text-white placeholder-[#B0BEC5] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white focus:text-gray-900 rounded-lg"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <p className='mb-1'>Enter password</p>
                            <div className="relative w-full mb-5">
                                <input
                                    type="text"
                                    placeholder="Password"
                                    className="w-full p-3 bg-transparent border-2 border-white text-white placeholder-[#B0BEC5] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white focus:text-gray-900 rounded-lg"
                                    value={password}
                                    onChange={handlePasswordChange}
                                />
                                <span
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-blue-800"
                                >
                                    {showPassword ? <AiFillEyeInvisible size={24} /> : <AiFillEye size={24} />}
                                </span>
                            </div>
                            <div className='flex'>
                                <div className="flex items-center mb-1">
                                    <input
                                        type="checkbox"
                                        id="rememberMe"
                                        checked={rememberMe}
                                        onChange={handleCheckboxChange}
                                        className="h-4 w-4 text-white focus:ring-blue-500 border-gray-300 rounded"
                                    />
                                    <label htmlFor="rememberMe" className="ml-2">
                                        Remember Me
                                    </label>
                                </div>
                                <div className="mt-0.5 flex ml-auto justify-center items-center mb-1">
                                    <p className="text-base ">Forgot Password?</p>
                                    <Link to="/Resetpassword">
                                        <p className="text-blue-400 hover:underline pl-[4px]">Reset it</p>
                                    </Link>
                                </div>
                            </div>
                            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
                                Login
                            </button>
                        </form>
                        <div className="mt-2 flex">
                            <p className="text-base">Don't have an Account?</p>
                            <Link to="/Register">
                                <p className="text-blue-400 hover:underline pl-[4px]">Register</p>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Login;
