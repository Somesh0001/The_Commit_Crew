"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Event {
  title: string;
  author: string;
  body: string;
  briefSummary: string;
  location: string;
  imageUrls: string[]; 
}

const UpdateEvent = () => {
  const [event, setEvent] = useState<Event>({
    title: "",
    author: "",
    body: "",
    briefSummary: "",
    location: "",
    imageUrls: [],
  });
  const [newImages, setNewImages] = useState<File[]>([]); 
  const [newImagePreviews, setNewImagePreviews] = useState<string[]>([]); 
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const params = useParams();

  
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`/api/events/${params.id}`);
        const data = await response.json();
        if (data?.event) {
          setEvent(data.event);
        } else {
          toast.error("Event not found.");
          router.push("/admin");
        }
      } catch (error) {
        console.error("Error fetching event:", error);
        toast.error("Failed to load event data.");
      }
    };
    fetchEvent();
  }, [params, router]);

  
  const handleNewImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    if (files.length > 0) {
      const previews = files.map((file) => URL.createObjectURL(file));
      setNewImages((prev) => [...prev, ...files]);
      setNewImagePreviews((prev) => [...prev, ...previews]);
    }
  };

 
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (
      !event.title ||
      !event.author ||
      !event.body ||
      !event.briefSummary ||
      !event.location
    ) {
      toast.error("Please fill out all required fields.");
      setIsLoading(false);
      return;
    }

  
    const updatedEvent = {
      title: event.title,
      author: event.author,
      body: event.body,
      briefSummary: event.briefSummary,
      location: event.location,
      imageUrls: [...event.imageUrls, ...newImagePreviews],
    };

    try {
      const response = await fetch(`/api/events/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json", 
        },
        body: JSON.stringify(updatedEvent), 
      });

      const data = await response.json();

     
        toast.success("Event updated successfully!");
        router.push("/admin");
      
    } catch (error) {
      console.error("Error updating event:", error);
      toast.error("An error occurred while updating the event.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-3/4 bg-gray-100">
      <div className="bg-[#074799] p-8 shadow-lg text-center w-full text-white">
        <h1 className="text-3xl font-bold mb-6">Update Event</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-wrap justify-between">
            <div>
              <div className="text-left text-lg mb-2">Title</div>
              <input
                type="text"
                value={event.title}
                onChange={(e) =>
                  setEvent({ ...event, title: e.target.value })
                }
                className="p-2 border border-gray-300 rounded-lg text-black"
                required
              />
            </div>
            <div>
              <div className="text-left text-lg mb-2">Author</div>
              <input
                type="text"
                value={event.author}
                onChange={(e) =>
                  setEvent({ ...event, author: e.target.value })
                }
                className="p-2 border border-gray-300 rounded-lg text-black"
                required
              />
            </div>
          </div>

          <div className="flex flex-col">
            <div className="text-left text-lg mb-2">Body</div>
            <textarea
              value={event.body}
              onChange={(e) =>
                setEvent({ ...event, body: e.target.value })
              }
              className="p-2 border border-gray-300 rounded-lg text-black"
              required
            ></textarea>
          </div>

          <div className="flex flex-col">
            <div className="text-left text-lg mb-2">Brief Summary</div>
            <textarea
              value={event.briefSummary}
              onChange={(e) =>
                setEvent({ ...event, briefSummary: e.target.value })
              }
              className="p-2 border border-gray-300 rounded-lg text-black"
              required
            ></textarea>
          </div>

          <div className="flex flex-col">
            <div className="text-left text-lg mb-2">Location</div>
            <input
              type="text"
              value={event.location}
              onChange={(e) =>
                setEvent({ ...event, location: e.target.value })
              }
              className="p-2 border border-gray-300 rounded-lg text-black"
              required
            />
          </div>

          {/* Existing image previews */}
          <div className="mt-4">
            <h3 className="text-left text-lg mb-2">Existing Images</h3>
            <div className="flex space-x-4 flex-wrap">
              {event.imageUrls.map((url, index) => (
                <img
                  key={index}
                  src={url}
                  alt={`Existing Image ${index}`}
                  className="w-24 h-24 object-cover rounded-lg"
                />
              ))}
            </div>
          </div>

          {/* New image uploads */}
          <div className="mt-6">
            <h3 className="text-left text-lg mb-2">Add New Images</h3>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleNewImageChange}
            />
            <div className="flex mt-4 space-x-4 flex-wrap">
              {newImagePreviews.map((preview, index) => (
                <img
                  key={index}
                  src={preview}
                  alt={`New Image ${index}`}
                  className="w-24 h-24 object-cover rounded-lg"
                />
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="text-center font-bold text-2xl flex justify-center items-center bg-[#FF9D23] rounded-lg text-white px-4 py-2 w-fit"
          >
            Update Event
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

export default UpdateEvent;
