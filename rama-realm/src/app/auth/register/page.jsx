"use client"
import React, { useState } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import Link from "next/link";
import Navbar from '../../../components/Bars/Navbar';
import Footer from '../../../components/HomePage_components/Footer';
import { toast } from 'react-toastify';
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, db, googleProvider } from '../../../firebase/config';
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const validateEmail = (email) => /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
    const validatePassword = (password) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
    const validateName = (username) => username.trim().length >= 3;

   const handleRegister = async (e) => {
    e.preventDefault();

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

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Save user data in Firestore
        await setDoc(doc(db, "users", user.uid), {
            uid: user.uid,
            username: username,
            email: user.email,
            role: "learner", // default role
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
        });

        toast.success("Registered successfully!");
    } catch (error) {
        toast.error(`Signup failed: ${error.message}`);
    }
};

    const handleGoogleRegister = async () => {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        const user = result.user;

        // Save user data in Firestore
        await setDoc(doc(db, "users", user.uid), {
            uid: user.uid,
            username: user.displayName,
            email: user.email,
            role: "learner",
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
        }, { merge: true }); // merge ensures we don’t overwrite

        toast.success("Registered with Google successfully!");
    } catch (error) {
        toast.error(`Google Signup failed: ${error.message}`);
    }
};


    return (
        <div>
            <Navbar />
            <div className='bg-white flex justify-center z-0'>
                <video
                    src="/videos/Register.mp4"
                    type="video/mp4"
                    autoPlay
                    loop
                    muted
                    className="w-full max-h-[650px] bg-white object-cover"
                />
            </div>
            <div className="absolute inset-0 mt-28">
                <div className='flex justify-center pt-8'>
                    <div className='w-[550px] text-white bg-transparent'>
                        <h2 className="text-center text-5xl font-semibold mb-6">Register</h2>
                        <form onSubmit={handleRegister}>
                            <p className='pb-1'>Username</p>
                            <input
                                type="text"
                                placeholder="Full Name"
                                className="w-full p-3 bg-transparent border-2 border-white text-white placeholder-[#B0BEC5] focus:outline-none rounded-lg"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <p className='pb-1'>Enter Email Address</p>
                            <input
                                type="email"
                                placeholder="Email Address"
                                className="w-full p-3 bg-transparent border-2 border-white text-white placeholder-[#B0BEC5] focus:outline-none rounded-lg"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <p className='pb-1'>Enter password</p>
                            <div className="relative w-full mb-5">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Password"
                                    className="w-full p-3 bg-transparent border-2 border-white text-white placeholder-[#B0BEC5] focus:outline-none rounded-lg"
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
                                    className="w-full p-3 bg-transparent border-2 border-white text-white placeholder-[#B0BEC5] focus:outline-none rounded-lg"
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
                        </form>

                        <button
                            onClick={handleGoogleRegister}
                            className="w-full mt-4 bg-red-500 text-white p-2 rounded"
                        >
                            Register with Google
                        </button>

                        <div className="mt-2 flex">
                            <p className="text-base text-white">Already Have an Account?</p>
                            <Link href="/Login">
                                <p className="text-blue-400 hover:underline pl-[4px]">Login</p>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Register;
