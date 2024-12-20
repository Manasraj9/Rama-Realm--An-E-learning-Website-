import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const CreateCourse = () => {
    const token = localStorage.getItem('');
    const difficulties = ["Beginner", "Intermediate", "Advanced"];
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        Course_Title: "",
        Course_Description: "",
        Course_Subject: "",
        Course_VR_link: "",
        Course_Duration: "",
        Course_Activity: false,
        Course_Difficulty: "Beginner",
    });

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: type === "checkbox" ? checked : value,
        }));
    };
    
    const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB limit

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const formData = new FormData(e.target);
        const files = [];
        const fileTrailer = formData.get("Course_trailer");
        const fileNotes = formData.get("Course_Notes");
    
        // Check file size
        if (fileTrailer && fileTrailer.size > MAX_FILE_SIZE) {
            return toast.error("Course trailer file is too large.");
        }
        if (fileNotes && fileNotes.size > MAX_FILE_SIZE) {
            return toast.error("Course notes file is too large.");
        }
    
        if (fileTrailer) files.push(fileTrailer);
        if (fileNotes) files.push(fileNotes);
    
        const jsonData = {
            Course_Title: formData.get("Course_Title"),
            Course_Description: formData.get("Course_Description"),
            Course_Subject: formData.get("Course_Subject"),
            Course_VR_link: formData.get("Course_VR_link"),
            Course_Duration: formData.get("Course_Duration"),
            Course_Activity: formData.get("Course_Activity") === "on",
            Course_Difficulty: formData.get("Course_Difficulty"),
        };
    
        const token = localStorage.getItem("token");
        if (!token) {
            return toast.error("Unauthorized. Please log in again.");
        }
    
        try {
            // Step 1: Submit Course Data
            const response = await fetch('http://localhost:1337/api/create-courses', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ data: jsonData }),
            });
    
            const result = await response.json();
    
            if (!response.ok) {
                throw new Error(result.message || "Failed to create course.");
            }
    
            // Step 2: Handle File Uploads
            const { id } = result.data;
            if (files.length > 0) {
                const fileData = new FormData();
                files.forEach((file) => fileData.append("files", file));
                fileData.append("ref", "api::create-course.create-course");
                fileData.append("refId", id);
                fileData.append("field", "attachments");
    
                const uploadResponse = await fetch("http://localhost:1337/api/upload", {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                    body: fileData, // Use FormData to upload files
                });
    
                const uploadResult = await uploadResponse.json();
    
                if (!uploadResponse.ok) {
                    throw new Error(uploadResult.message || "File upload failed.");
                }
            }
    
            toast.success("Course created successfully!");
            navigate("/courses");
    
        } catch (error) {
            console.error("Error:", error.message);
            toast.error(`An error occurred: ${error.message}`);
        }
    };
    


    return (
        <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Create VR Course</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Course Title */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Course Title</label>
                    <input
                        type="text"
                        name="Course_Title"
                        value={formData.Course_Title}
                        onChange={handleInputChange}
                        className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter course title"
                        required
                    />
                </div>

                {/* Course Description */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Course Description</label>
                    <textarea
                        name="Course_Description"
                        value={formData.Course_Description}
                        onChange={handleInputChange}
                        className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter course description"
                        rows="4"
                        required
                    ></textarea>
                </div>

                {/* Course Subject */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Course Subject</label>
                    <input
                        type="text"
                        name="Course_Subject"
                        value={formData.Course_Subject}
                        onChange={handleInputChange}
                        className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter course subject"
                        required
                    />
                </div>

                {/* Course Trailer */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Course Trailer (Media)</label>
                    <input
                        type="file"
                        name="Course_trailer"
                        className="mt-1 block w-full p-2 border rounded-md shadow-sm"
                    />
                </div>

                {/* Course Notes */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Course Notes (Media)</label>
                    <input
                        type="file"
                        name="Course_Notes"
                        className="mt-1 block w-full p-2 border rounded-md shadow-sm"
                    />
                </div>

                {/* Course VR Link */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Course VR Link</label>
                    <input
                        type="url"
                        name="Course_VR_link"
                        value={formData.Course_VR_link}
                        onChange={handleInputChange}
                        className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter VR link"
                    />
                </div>

                {/* Course Duration */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Course Duration (in hours)</label>
                    <input
                        type="number"
                        name="Course_Duration"
                        value={formData.Course_Duration}
                        onChange={handleInputChange}
                        className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter course duration"
                    />
                </div>

                {/* Course Activity */}
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        name="Course_Activity"
                        checked={formData.Course_Activity}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                    />
                    <label className="ml-2 text-sm font-medium text-gray-700">Include Course Activities</label>
                </div>

                {/* Course Difficulty */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Course Difficulty</label>
                    <select
                        name="Course_Difficulty"
                        value={formData.Course_Difficulty}
                        onChange={handleInputChange}
                        className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    >
                        {difficulties.map((level) => (
                            <option key={level} value={level}>
                                {level}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Submit Button */}
                <div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        Save Course
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateCourse
