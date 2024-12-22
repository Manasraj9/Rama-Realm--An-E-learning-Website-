import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const CreateCourse = () => {
    const token = localStorage.getItem('token');
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
        Course_trailer: null, // for file
        Course_Notes: null, // for file
    });

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value, type, checked, files } = e.target;

        if (type === "file" && files[0]) {
            const { name: fileName, size, type: fileType } = files[0];

            // Validate file type (optional)
            const allowedFileTypes = ["application/pdf", "video/mp4"];
            if (!allowedFileTypes.includes(fileType)) {
                return console.error("Invalid file type selected.");
            }
        }

        setFormData((prevState) => ({
            ...prevState,
            [name]: type === "checkbox" ? checked : type === "file" ? files[0] : value,
        }));
    };



    const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB limit

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { Course_trailer, Course_Notes } = formData;

        // Check file sizes first
        if (Course_trailer && Course_trailer.size > MAX_FILE_SIZE) {
            console.log("Course trailer file is too large");
            return toast.error("Course trailer file is too large.");
        }
        if (Course_Notes && Course_Notes.size > MAX_FILE_SIZE) {
            console.log("Course notes file is too large");
            return toast.error("Course notes file is too large.");
        }

        // Prepare course data without files
        const courseData = {
            Course_Title: formData.Course_Title,
            Course_Description: formData.Course_Description,
            Course_Subject: formData.Course_Subject,
            Course_VR_link: formData.Course_VR_link,
            Course_Duration: formData.Course_Duration,
            Course_Activity: formData.Course_Activity,
            Course_Difficulty: formData.Course_Difficulty,
        };

        if (!token) {
            console.log("No token found, user is not authenticated");
            return toast.error("Unauthorized. Please log in again.");
        }

        try {
            // Step 1: Submit Course Data (without files)
            const response = await fetch('http://localhost:1337/api/create-courses', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({ data: courseData }),
            });

            const result = await response.json();

            if (!response.ok) {
                console.log("Error in course creation:", result.message || "Failed to create course.");
                throw new Error(result.message || "Failed to create course.");
            }

            // Get the created course ID
            const { id } = result.data;

            // Step 2: Prepare FormData for file upload
            const formDataToUpload = new FormData();

            // Append the trailer file if it exists
            if (Course_trailer) {
                formDataToUpload.append("files", Course_trailer);
            }

            // Append the notes file if it exists
            if (Course_Notes) {
                formDataToUpload.append("files", Course_Notes);
            }

            if (formDataToUpload.has("files")) {
                console.log("Starting file upload...");
                const uploadResponse = await fetch("http://localhost:1337/api/upload", {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                    body: formDataToUpload,
                });
            
                const uploadResult = await uploadResponse.json();
                
                const uploadedFiles = uploadResult;
            
                if (!uploadedFiles || !Array.isArray(uploadedFiles)) {
                    console.error("Error: Upload response does not contain valid file data.");
                    throw new Error("Failed to upload files or invalid response structure.");
                }
            
                const trailerMedia = uploadedFiles.find(file => file.name === formData.Course_trailer.name);
                const notesMedia = uploadedFiles.find(file => file.name === formData.Course_Notes.name);
            
            
                const updatePayload = {
                    data: {
                        Course_trailer: trailerMedia,
                        Course_Notes: notesMedia,
                    },
                };
            
                // Update the course with the file URLs
                const updateResponse = await fetch(`http://localhost:1337/api/create-courses/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`, // Add Authorization header here
                    },
                    body: JSON.stringify(updatePayload),
                });
            
                const updateResult = await updateResponse.json();
            
                if (!updateResponse.ok) {
                    console.error("Error in updating course with media URLs:", updateResult.message || "Failed to update course.");
                    throw new Error(updateResult.message || "Failed to update course.");
                }
            } else {
                console.log("No files to upload.");
            }

            toast.success("Course created and media uploaded successfully!");
            navigate("/CoursesAdmin");

        } catch (error) {
            console.error("Error:", error.message);  // Log any error in the process
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

                {/* File Inputs */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Course Trailer (Media)</label>
                    <input
                        type="file"
                        name="Course_trailer"
                        onChange={(e) => {
                            console.log("Trailer File Selected:", e.target.files[0]?.name);
                            handleInputChange(e);
                        }}
                        className="mt-1 block w-full p-2 border rounded-md shadow-sm"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Course Notes (Media)</label>
                    <input
                        type="file"
                        name="Course_Notes"
                        onChange={(e) => {
                            console.log("Notes File Selected:", e.target.files[0]?.name);
                            handleInputChange(e);
                        }}
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
