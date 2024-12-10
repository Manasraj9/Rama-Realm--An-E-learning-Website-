import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../Components/Bars/Navbar';
import Footer from '../Components/LandingPage_components/Footer';
import { Oval } from 'react-loader-spinner'; // Import loader
import { toast } from 'react-toastify'; // Import Toastify
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS

const Resetpassword = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false); // State for loader
    const navigate = useNavigate(); // Use useNavigate to programmatically navigate

    const handleSendOTP = async (e) => {
        e.preventDefault();
        setLoading(true); // Show loader when starting request
        try {
            const response = await fetch('http://localhost:1000/send-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }), // Use the email from state
            });

            // Check if the response was successful
            if (!response.ok) {
                const errorData = await response.json(); // Fetch error details if available
                throw new Error(errorData.message || 'Failed to send OTP.');
            }

            // Handle successful response
            toast.success('OTP sent successfully! Check your email.');
            navigate('/Otpverification', { state: { email } }); // Pass email in state
        } catch (error) {
            console.error('Error:', error);
            toast.error(`An error occurred: ${error.message}`);
        } finally {
            setLoading(false); // Hide loader after request is complete
        }
    };

    return (
        <div>
            <Navbar />
            <div className='flex justify-center'>
                <div>
                    <img src="/images/Login.svg" alt="page for Login" className="w-[780px] h-[650px] bg-white" />
                </div>
                {/* Reset Password Box */}
                <div className="w-[750px] bg-[#dbe2ef]">
                    <h1 className='text-6xl text-[#112d4e] text-center mt-[100px]'>Reset Password</h1>
                    <div className='ml-[100px] mt-[40px] w-[550px] text-[#112d4e] justify-center'>
                        <form onSubmit={handleSendOTP}>
                            <p className=''>Enter Email Address</p>
                            <input
                                type="email"
                                placeholder="Email Address"
                                className="w-full mb-6 p-2 border rounded"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)} // Update state on input change
                                required
                            />
                            <button
                                type="submit"
                                className="w-full bg-blue-500 text-white p-2 rounded flex justify-center items-center"
                                disabled={loading}
                            >
                                {loading ? (
                                    <div>
                                        <Oval
                                            height={20}
                                            width={20}
                                            color="#ffffff"
                                            visible={true}
                                            ariaLabel="oval-loading"
                                            secondaryColor="#4fa94d"
                                            strokeWidth={2}
                                            strokeWidthSecondary={2}
                                        />
                                    </div>
                                ) : (
                                    'Reset'
                                )}
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
            <Footer />
        </div>
    );
};

export default Resetpassword;