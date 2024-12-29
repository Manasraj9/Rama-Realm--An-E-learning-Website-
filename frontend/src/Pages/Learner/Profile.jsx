import React, { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "react-toastify";

const Profile = () => {
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

  useEffect(() => {
    // Fetch user data from the API
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:1337/api/users', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const userData = await response.json();
        
        // Assuming the current user is the first user in the array
        // You might want to add proper user identification logic here
        if (userData && userData.length > 0) {
          const currentUser = userData[0];
          setUser({
            username: currentUser.username || "",
            email: currentUser.email || "",
            bio: currentUser.bio || "",
            photoUrl: currentUser.photoUrl || null,
          });
          setProfileExists(true);
        } else {
          setProfileExists(false);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        toast.error('Failed to load user profile');
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    const { username, email, bio } = user;

    if (!email) {
      toast.error("Email is required!");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("data", JSON.stringify({
        username,
        email,
        bio,
      }));

      if (profileImage) {
        formData.append("files.photo", profileImage);
      }

      const response = await fetch(`http://localhost:1337/api/users/${profileExists ? user.id : ''}`, {
        method: profileExists ? 'PUT' : 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to save profile");
      }

      toast.success("Profile saved successfully!");
      setIsEditing(false);
      setProfileExists(true);
    } catch (error) {
      console.error("Error saving profile:", error);
      toast.error("Failed to save profile");
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setProfileImage(null);
    setPreviewImage(null);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg translate-y-[20%] rounded-lg">
      <h1 className="text-2xl font-bold mb-4">
        {user.email ? `Welcome, ${user.username || "User"}` : "Create Your Profile"}
      </h1>

      <div className="flex items-center gap-6">
        <Avatar className="w-24 h-24">
          {previewImage ? (
            <AvatarImage src={previewImage} alt={user.username} />
          ) : user.photoUrl ? (
            <AvatarImage src={user.photoUrl} alt={user.username} />
          ) : (
            <AvatarFallback>{user.username?.[0]?.toUpperCase() || "U"}</AvatarFallback>
          )}
        </Avatar>

        {isEditing && (
          <Input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-60"
          />
        )}
      </div>

      <div className="mt-6">
        <label className="block text-sm font-medium">Username</label>
        <Input
          type="text"
          name="username"
          value={user.username || ""}
          onChange={handleInputChange}
          className="w-full"
          disabled={!isEditing}
        />
      </div>

      <div className="mt-4">
        <label className="block text-sm font-medium">Email</label>
        <Input
          type="email"
          name="email"
          value={user.email || ""}
          onChange={handleInputChange}
          className="w-full"
          disabled={!isEditing}
        />
      </div>

      <div className="mt-4">
        <label className="block text-sm font-medium">Bio</label>
        <Textarea
          name="bio"
          value={user.bio || ""}
          onChange={handleInputChange}
          className="w-full"
          disabled={!isEditing}
        />
      </div>

      <div className="flex items-center gap-4 mt-6">
        {isEditing ? (
          <>
            <Button onClick={handleSave} className="bg-green-600 text-white">
              Save
            </Button>
            <Button onClick={handleCancel} className="bg-gray-300 text-black">
              Cancel
            </Button>
          </>
        ) : (
          <Button onClick={() => setIsEditing(true)} className="bg-blue-600 text-white">
            Edit Profile
          </Button>
        )}
      </div>
    </div>
  );
};

export default Profile;
