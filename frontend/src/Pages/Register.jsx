import React, { useState } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { Link , useNavigate } from 'react-router-dom';
import Navbar from '../Components/Bars/Navbar';
import Footer from '../Components/HomePage_components/Footer';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import image1 from '../images/Register_Learners.svg';

const Register = () => {
    const [selectedOption, setSelectedOption] = useState('Learner');
    const [userType, setUserType] = useState('Learner');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
    const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Separate state for confirm password visibility
    const navigate = useNavigate();
    // Validation Functions
    const validateEmail = (email) => /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
    const validatePassword = (password) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
    const validateName = (username) => username.trim().length >= 3; // Minimum 3 characters for name


    // Update userType when selecting Job Seeker or Company
    const handleOptionChange = (option) => {
        setSelectedOption(option);
        setUserType(option);
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        // Client-side validation
        if (!validateName(username)) {
            toast.error('Name must be at least 3 characters long.');
            return;
        }

        if (!validateEmail(email)) {
            toast.error('Please enter a valid email address.');
            return;
        }

        if (!validatePassword(password)) {
            toast.error('Password must contain at least 8 characters, including uppercase, lowercase, number, and a special character.');
            return;
        }

        if (password !== confirmPass) {
            toast.error('Passwords do not match.');
            return;
        }

        // Prepare the data to be sent
        const userData = {
            username,
            email,
            password,
            userType: selectedOption // Make sure selectedOption is either 'Learner' or 'Admin'
        };

        console.log("Sending data to the backend:", userData);  // Log the data being sent

        // Proceed with API call if all validations pass
        try {
            const response = await fetch('http://localhost:1337/api/auth/local/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData),
            });

            const data = await response.json();

            if (!response.ok) {
                console.log("Error response:", data); // Log the error response from the backend
                throw new Error(data.message || 'Signup failed');
            }
            toast.success('Registered successfully!');
            navigate('/login'); // Redirect to login page
        } catch (error) {
            console.error('Signup error:', error.message);  // Log the error to the console
            toast.error(`Signup failed: ${error.message}`);
        }
    };

    return (
        <div>
            <Navbar />
            <div className='flex'>
                <div className='bg-white flex justify-center'>
                    <img src={selectedOption === 'Learner' ? image1 : image1}
                        alt="Register Page Visual"
                        className="w-[780px] h-[700px]" />
                </div>
                <div className='w-[750px] bg-[#dbe2ef] text-[#112d4e]'>
                    <div className='flex justify-center pt-8'>
                        <div
                            onClick={() => handleOptionChange('Learner')}
                            className={`h-10 px-3 py-[7px] ${selectedOption === 'Learner' ? 'bg-white' : 'bg-[#dbe2ef]'} cursor-pointer justify-center items-center gap-2.5 inline-flex`}
                        >
                            <div className={`text-base font-semibold font-['Epilogue'] leading-relaxed ${selectedOption === 'Learner' ? 'text-[#3f72af]' : 'text-gray-500'}`}>Learner</div>
                        </div>
                        <div
                            onClick={() => handleOptionChange('Admin')}
                            className={`h-10 px-3 py-[7px] ${selectedOption === 'Admin' ? 'bg-white' : 'bg-[#dbe2ef]'} cursor-pointer justify-center items-center gap-2.5 inline-flex`}
                        >
                            <div className={`text-base font-semibold font-['Epilogue'] leading-relaxed ${selectedOption === 'Admin' ? 'text-[#3f72af]' : 'text-gray-500'}`}>Admin</div>
                        </div>
                    </div>

                    <div className='flex justify-center pt-8'>
                        {selectedOption === 'Learner' ? (
                            <LearnerForm
                                username={username}
                                email={email}
                                password={password}
                                setUsername={setUsername}
                                setEmail={setEmail}
                                setPassword={setPassword}
                                confirmPass={confirmPass}
                                setConfirmPass={setConfirmPass}
                                handleRegister={handleRegister}
                                showPassword={showPassword}
                                setShowPassword={setShowPassword}
                                showConfirmPassword={showConfirmPassword}
                                setShowConfirmPassword={setShowConfirmPassword}
                            />
                        ) : (
                            <AdminForm
                                username={username}
                                email={email}
                                password={password}
                                setUsername={setUsername}
                                setEmail={setEmail}
                                setPassword={setPassword}
                                confirmPass={confirmPass}
                                setConfirmPass={setConfirmPass}
                                handleRegister={handleRegister}
                                showPassword={showPassword}
                                setShowPassword={setShowPassword}
                                showConfirmPassword={showConfirmPassword}
                                setShowConfirmPassword={setShowConfirmPassword}
                            />
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};


// Job Seeker Form Component
const LearnerForm = ({ username, email, password, confirmPass, setUsername, setEmail, setPassword, setConfirmPass, handleRegister, error, success, showPassword, setShowPassword, showConfirmPassword, setShowConfirmPassword }) => {
    return (
        <div className='w-[550px] text-[#112d4e]'>
            <h2 className="text-center text-5xl font-semibold mb-6">Register as Learner</h2>
            <form onSubmit={handleRegister}>
                <p className='pb-1'>Full Name</p>
                <input
                    type="text"
                    placeholder="Full Name"
                    className="w-full mb-6 p-2 border rounded"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <p className='pb-1'>Enter Email Address</p>
                <input
                    type="email"
                    placeholder="Email Address"
                    className="w-full mb-6 p-2 border rounded"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <p className='pb-1'>Enter password</p>
                <div className="relative w-full mb-5">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Password"
                        className="w-full p-2 border rounded"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <span
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                    >
                        {showPassword ? <AiFillEyeInvisible size={24} /> : <AiFillEye size={24} />}
                    </span>
                </div>
                <p className='pb-1'>Confirm Password</p>
                <div className="relative w-full mb-5">
                    <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder="Enter Password Again"
                        className="w-full p-2 border rounded"
                        value={confirmPass}
                        onChange={(e) => setConfirmPass(e.target.value)}
                    />
                    <span
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                    >
                        {showConfirmPassword ? <AiFillEyeInvisible size={24} /> : <AiFillEye size={24} />}
                    </span>
                </div>
                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
                    Register
                </button>
                {error && <p className="text-red-500">{error}</p>}
                {success && <p className="text-green-500">{success}</p>}
            </form>
            <div className="mt-2 flex">
                <p className="text-base text-[#112d4e]">Already Have an Account?</p>
                <Link to="/Login">
                    <p className="text-blue-400 hover:underline pl-[4px]">Login</p>
                </Link>
            </div>
        </div>
    );
};
// Company Form Component
const AdminForm = ({ username, email, password, confirmPass, setUsername, setEmail, setPassword, setConfirmPass, handleRegister, error, success, showPassword, setShowPassword, showConfirmPassword, setShowConfirmPassword }) => {
    return (
        <div className='w-[550px] text-[#112d4e]'>
            <h2 className="text-center text-5xl font-semibold mb-6">Register as Admin</h2>
            <form onSubmit={handleRegister}>
                <p className='pb-1'>Full Name</p>
                <input
                    type="text"
                    placeholder="Full Name"
                    className="w-full mb-6 p-2 border rounded"
                    value={username}
                    onChange={(e) => setName(e.target.value)}
                />
                <p className='pb-1'>Enter Email Address</p>
                <input
                    type="email"
                    placeholder="Email Address"
                    className="w-full mb-6 p-2 border rounded"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <p className='pb-1'>Enter UID No..</p>
                <input
                    type="email"
                    placeholder="Email Address"
                    className="w-full mb-6 p-2 border rounded"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <p className='pb-1'>Enter password</p>
                <div className="relative w-full mb-5">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Password"
                        className="w-full p-2 border rounded"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <span
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                    >
                        {showPassword ? <AiFillEyeInvisible size={24} /> : <AiFillEye size={24} />}
                    </span>
                </div>
                <p className='pb-1'>Confirm Password</p>
                <div className="relative w-full mb-5">
                    <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder="Enter Password Again"
                        className="w-full p-2 border rounded"
                        value={confirmPass}
                        onChange={(e) => setConfirmPass(e.target.value)}
                    />
                    <span
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                    >
                        {showConfirmPassword ? <AiFillEyeInvisible size={24} /> : <AiFillEye size={24} />}
                    </span>
                </div>
                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
                    Register
                </button>
                {error && <p className="text-red-500">{error}</p>}
                {success && <p className="text-green-500">{success}</p>}
            </form>
            <div className="mt-2 flex mb-10">
                <p className="text-base text-[#112d4e]">Already Have an Account?</p>
                <Link to="/Login">
                    <p className="text-blue-400 hover:underline pl-[4px]">Login</p>
                </Link>
            </div>
        </div>
    );
};

export default Register;
