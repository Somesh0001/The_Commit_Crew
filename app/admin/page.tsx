"use client"; 
import React, { useEffect, useState } from "react";
import Link from "next/link";

interface Event {
  _id: string;
  title: string;
  author: string;
  body: string;
  briefSummary: string;
  location: string;
  imageUrls: string[];
  createdAt: string;
  updatedAt: string;
}

const Page = () => {
  const [events, setEvents] = useState<Event[]>([]); 

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("/api/getEvents");
        const data = await response.json();
        if (data.status === 201) {
          setEvents(data.data);
        } else {
          console.error("Error fetching events:", data.message);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchEvents();
  }, []);

  return (
    <div>
      <div className="text-3xl text-center font-bold">Admin Dashboard</div>
      <div className="flex flex-col gap-4">
        <div className="text-center font-bold text-2xl flex justify-center items-center bg-[#FF9D23] rounded-lg text-white px-4 py-2 w-fit">
          <Link href="/admin/createEvent">Create Event</Link>
        </div>

        <div className="text-center font-bold text-2xl flex justify-center items-center bg-[#FF9D23] rounded-lg text-white px-4 py-2 w-fit">
          <Link href="/api/auth/signout">Logout</Link>
        </div>
      </div>

      <div>
  <div className="text-3xl text-center font-bold">Events</div>
  <div className="flex flex-col gap-4">
    {events.length === 0 ? (
      <div className="text-center text-xl font-semibold">No events available.</div>
    ) : (
      events.map((event) => (
        <div
          key={event._id}
          className="bg-[#074799] text-white p-6 rounded-lg shadow-lg flex flex-col gap-4"
        >
          <div className="text-2xl font-bold">{event.title}</div>
          <div className="text-lg">{event.body}</div>
          <div className="text-lg italic">{event.briefSummary}</div>
          <div className="text-md font-semibold">Author: {event.author}</div>

          
          <div className="flex space-x-4 mt-4">
            {event.imageUrls.map((imageUrl, index) => (
              <img
                key={index}
                src={imageUrl}
                alt={`Event Image ${index}`}
                className="w-32 h-32 object-cover rounded-lg"
              />
            ))}
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="text-center font-bold text-2xl flex justify-center items-center bg-[#FF9D23] rounded-lg text-white px-4 py-2 w-fit">
              <Link href={`/admin/editEvent/${event._id}`}>Edit Event</Link>
            </div>
            <div className="text-center font-bold text-2xl flex justify-center items-center bg-[#FF9D23] rounded-lg text-white px-4 py-2 w-fit">
              <Link href={`/admin/deleteEvent/${event._id}`}>Delete Event</Link>
            </div>
          </div>
        </div>
      ))
    )}
  </div>
</div>

    </div>
  );
};

export default Page;
