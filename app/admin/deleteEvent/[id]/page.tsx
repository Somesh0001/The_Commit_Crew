"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Toastify CSS

interface Event {
  _id?: string;
  title: string;
  author: string;
  body: string;
  briefSummary: string;
  location: string;
  imageUrls: string[];
}

const DeleteEvent = () => {
  const [event, setEvent] = useState<Event>({
    title: "",
    author: "",
    body: "",
    briefSummary: "",
    location: "",
    imageUrls: [],
  });
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const params = useParams();

  const isEditing = !!params?.id;

  
  useEffect(() => {
    const fetchEvent = async () => {
      if (isEditing) {
        try {
          const response = await fetch(`/api/events/${params.id}`);
          const data = await response.json();
          if (data?.event) {
            setEvent(data.event);
            setImagePreviews(data.event.imageUrls); 
          } else {
            toast.error("Event not found.");
            router.push("/admin");
          }
        } catch (error) {
          console.error("Error fetching event:", error);
          toast.error("Failed to load event data.");
        }
      }
    };
    fetchEvent();
  }, [isEditing, params, router]);

  const handleDelete = async () => {
    try {
      await fetch(`/api/events/${params.id}`, { method: "DELETE" });
      toast.success("Event deleted successfully.");
      router.push("/admin");
    } catch (error) {
      console.error("Error deleting event:", error);
      toast.error("Failed to delete event.");
    }
  };
 

  return (
    <div className="flex flex-col items-center justify-center w-3/4 bg-gray-100">
      <div className="bg-[#074799] p-8 shadow-lg text-center w-full text-white">
        <h1 className="text-3xl font-bold mb-6">
            Are you sure you want to delete the event ? 
        </h1>
        <button
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mt-4"
          onClick={handleDelete}
          disabled={isLoading}
        >
          {isLoading ? "Deleting..." : "Delete Event"}
        </button>

      
      </div>
     
      <ToastContainer />
    </div>
  );
};

export default DeleteEvent;
