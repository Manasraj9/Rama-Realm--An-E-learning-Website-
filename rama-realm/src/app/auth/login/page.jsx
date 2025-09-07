"use client";
import React, { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import Link from "next/link";
import Navbar from "../../../components/Bars/Navbar";
import Footer from "../../../components/HomePage_components/Footer";
import { toast } from "react-toastify";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, db, googleProvider } from "../../../firebase/config";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const redirectByRole = async (uid) => {
    try {
      const userRef = doc(db, "users", uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const role = userSnap.data().role || "learner"; // fallback
        if (role === "admin") {
          router.push("/admin/admin-homepage");
        } else {
          router.push("/learner/homepage-learner");
        }
      } else {
        toast.error("No user record found in database!");
      }
    } catch (error) {
      console.error("Error fetching role:", error.message);
      toast.error("Could not fetch user role.");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      toast.success("Login successful!");
      await redirectByRole(user.uid);
    } catch (error) {
      console.error("Login error:", error.message);
      toast.error(`Login failed: ${error.message}`);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      toast.success("Google login successful!");
      await redirectByRole(user.uid);
    } catch (error) {
      console.error("Google login error:", error.message);
      toast.error(`Google login failed: ${error.message}`);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="bg-white flex justify-center z-0">
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
        <h1 className="text-8xl text-white text-center mt-[100px]">Login</h1>
        <div className="flex justify-center pt-2">
          <div className="w-[550px] text-white justify-center">
            <form onSubmit={handleLogin}>
              <p className="mb-1">Enter Email Address</p>
              <input
                type="email"
                placeholder="Email Address"
                className="w-full p-3 bg-transparent border-2 border-white text-white placeholder-[#B0BEC5] focus:outline-none rounded-lg"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <p className="mb-1">Enter Password</p>
              <div className="relative w-full mb-5">
                <input
                  type={showPassword ? "text" : "password"}
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
              <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
                Login
              </button>
            </form>

            <button
              onClick={handleGoogleLogin}
              className="w-full mt-4 bg-red-500 text-white p-2 rounded"
            >
              Login with Google
            </button>

            <div className="mt-2 flex">
              <p className="text-base">Don't have an Account?</p>
              <Link href="/Register">
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
