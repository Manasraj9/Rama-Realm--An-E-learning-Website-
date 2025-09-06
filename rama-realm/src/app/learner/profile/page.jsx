import React, { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { FiUser, FiMail, FiEdit3, FiSave, FiX } from "react-icons/fi";
import Learnernavbar from "@/Components/LearnerComponents/Learnernavbar";
import Footer from "@/Components/LearnerComponents/Footer_learner";

const Profile = () => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [user, setUser] = useState({
    username: "",
    email: "",
    bio: "",
    photoUrl: null,
  });
  const [profileExists, setProfileExists] = useState(false);

  // Animation variants
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3 }
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/api/users`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) throw new Error('Failed to fetch user data');

        const userData = await response.json();
        if (userData && userData.length > 0) {
          const currentUser = userData[0];
          setUser({
            username: currentUser.username || "",
            email: currentUser.email || "",
            bio: currentUser.bio || "",
            photoUrl: currentUser.photoUrl || null,
          });
          setProfileExists(true);
        }
      } catch (error) {
        console.error('Error:', error);
        toast.error('Failed to load profile');
      }
    };

    fetchUserData();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    if (!user.email) {
      toast.error("Email is required!");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("data", JSON.stringify({
        username: user.username,
        email: user.email,
        bio: user.bio,
      }));

      if (profileImage) {
        formData.append("files.photo", profileImage);
      }

      const response = await fetch(
        `${BACKEND_URL}/api/users/${profileExists ? user.id : ''}`,
        {
          method: profileExists ? 'PUT' : 'POST',
          body: formData,
        }
      );

      if (!response.ok) throw new Error("Failed to save profile");

      toast.success("Profile updated successfully!");
      setIsEditing(false);
      setProfileExists(true);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to update profile");
    }
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100"
    >
      <Learnernavbar />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto px-4 py-16"
      >
        <div className="max-w-4xl mx-auto my-8 bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 px-8 py-12">
            <div className="flex flex-col items-center">
              <div className="relative group">
                <Avatar className="w-32 h-32 border-4 border-white shadow-lg">
                  {previewImage ? (
                    <AvatarImage src={previewImage} alt={user.username} />
                  ) : user.photoUrl ? (
                    <AvatarImage src={user.photoUrl} alt={user.username} />
                  ) : (
                    <AvatarFallback className="text-2xl bg-blue-200">
                      {user.username?.[0]?.toUpperCase() || "U"}
                    </AvatarFallback>
                  )}
                </Avatar>
                {isEditing && (
                  <label className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-lg cursor-pointer hover:bg-gray-100 transition-colors">
                    <FiEdit3 className="w-5 h-5 text-blue-600" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
              <h1 className="mt-4 text-3xl font-bold text-white">
                {user.username || "Welcome!"}
              </h1>
              <p className="text-blue-100">{user.email}</p>
            </div>
          </div>

          {/* Profile Content */}
          <div className="px-8 py-6">
            <div className="space-y-6">
              {/* Username Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Username
                </label>
                <div className="relative">
                  <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    type="text"
                    name="username"
                    value={user.username || ""}
                    onChange={(e) => setUser({ ...user, username: e.target.value })}
                    className="pl-10 bg-gray-50 border-gray-200"
                    disabled={!isEditing}
                  />
                </div>
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <div className="relative">
                  <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    type="email"
                    name="email"
                    value={user.email || ""}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                    className="pl-10 bg-gray-50 border-gray-200"
                    disabled={!isEditing}
                  />
                </div>
              </div>

              {/* Bio
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bio
                </label>
                <Textarea
                  name="bio"
                  value={user.bio || ""}
                  onChange={(e) => setUser({ ...user, bio: e.target.value })}
                  className="bg-gray-50 border-gray-200 min-h-[120px]"
                  disabled={!isEditing}
                  placeholder="Tell us about yourself..."
                />
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-4 pt-4">
                {isEditing ? (
                  <>
                    <Button
                      onClick={() => setIsEditing(false)}
                      variant="outline"
                      className="flex items-center gap-2"
                    >
                      <FiX /> Cancel
                    </Button>
                    <Button
                      onClick={handleSave}
                      className="bg-blue-600 text-white hover:bg-blue-700 flex items-center gap-2"
                    >
                      <FiSave /> Save Changes
                    </Button>
                  </>
                ) : (
                  <Button
                    onClick={() => setIsEditing(true)}
                    className="bg-blue-600 text-white hover:bg-blue-700 flex items-center gap-2"
                  >
                    <FiEdit3 /> Edit Profile
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
      <Footer />
    </motion.div>
  );
};

export default Profile;
