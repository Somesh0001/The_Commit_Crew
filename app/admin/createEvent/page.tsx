"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 


const CreateEvent = () => {
  const [title, setTitle] = useState(""); 
  const [author, setAuthor] = useState(""); 
  const [body, setBody] = useState(""); 
  const [briefSummary, setBriefSummary] = useState(""); 
  const [location, setLocation] = useState(""); 
  const [imageFiles, setImageFiles] = useState<File[]>([]); 
  const [imagePreviews, setImagePreviews] = useState<string[]>([]); 
  const [error, setError] = useState<string | null>(null); 
  const [isLoading, setIsLoading] = useState(false); 
  const router = useRouter();

 
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    if (files.length > 0) {
      const filePreviews = files.map((file) => URL.createObjectURL(file)); 
      setImageFiles(files);
      setImagePreviews(filePreviews);
    }
  };

 
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
   
    if (
      !title ||
      !author ||
      !body ||
      !briefSummary ||
      !location ||
      imageFiles.length === 0
    ) {
      setError("Please fill out all fields and upload at least one image.");
      toast.error("Please fill out all fields and upload at least one image.");
      return;
    }

    
    const formData = new FormData();
    formData.append("title", title);
    formData.append("author", author);
    formData.append("body", body);
    formData.append("briefSummary", briefSummary);
    formData.append("location", location);

    
    imageFiles.forEach((file) => {
      formData.append("images", file);
    });

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (data.success) {
        console.log("Uploaded image URLs:", data.urls);
        toast.success("Event created successfully!");
        router.push("/admin");
      } else {
        setError("There was an issue uploading the images.");
        toast.error("There was an issue uploading the images.");
      }
    } catch (error) {
      console.error("Error uploading event data:", error);
      setError("There was an error submitting the form.");
      toast.error("There was an error submitting the form.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-3/4 bg-gray-100">
      <div className="bg-[#074799] p-8 shadow-lg text-center w-full text-white">
        <h1 className="text-3xl font-bold mb-6">Create/Update Event</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="font-bold text-1xl text-red-500">{error}</div>
          )}

          <div className="flex flex-wrap justify-between">
            <div>
              <div className="text-left text-lg mb-2 mr-2">Title</div>
              <div>
                <input
                  id="title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="p-2 border border-gray-300 rounded-lg text-black"
                  required
                />
              </div>
            </div>
            <div>
              <div className="text-left text-lg mb-2 mr-2">Author Name</div>
              <div>
                <input
                  id="author"
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  className="p-2 border border-gray-300 rounded-lg text-black"
                  required
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="text-left text-lg mb-2">Body</div>
            <textarea
              name="body"
              id="body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="p-2 border border-gray-300 rounded-lg text-black"
              required
            ></textarea>
          </div>

          <div className="flex flex-col">
            <div className="text-left text-lg mb-2">Brief Summary</div>
            <textarea
              name="briefSummary"
              id="briefSummary"
              value={briefSummary}
              onChange={(e) => setBriefSummary(e.target.value)}
              className="p-2 border border-gray-300 rounded-lg text-black"
              required
            ></textarea>
          </div>

          <div className="flex flex-col">
            <div className="text-left text-lg mb-2">Location</div>
            <input
              id="location"
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="p-2 border border-gray-300 rounded-lg text-black"
              required
            />
          </div>

          {/* Image upload with preview */}
          <div className="mb-6 mt-4 flex flex-col flex-wrap  bg-transparent">
            <div className="block mb-2 text-lg">Upload Event Images</div>
            <div>
              <input
                type="file"
                id="image-upload"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                className=" w-full"
              />
            </div>

            {/* Show image preview if images are selected */}
            <div className="flex mt-4 space-x-4 flex-wrap ">
              {imagePreviews.map((preview, index) => (
                <div key={index} className="m-1">
                  <img
                    key={index}
                    src={preview}
                    alt={`Preview ${index}`}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                </div>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="text-center font-bold text-2xl flex justify-center items-center bg-[#FF9D23] rounded-lg text-white px-4 py-2 w-fit"
          >
            Create/Update Event
          </button>
        </form>
      </div>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
          <div className="spinner"></div>
        </div>
      )}
      <ToastContainer />

      
    </div>
  );
};

export default CreateEvent;
