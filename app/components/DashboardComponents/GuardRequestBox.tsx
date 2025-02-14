import React from "react";
import Modal from "./Modal";

const GuardRequestBox = () => {
  const guardData = [
    { id: 1, name: "Rajesh Kumar", place: "Main Gate" },
    { id: 2, name: "Amit Singh", place: "Lobby" },
    { id: 3, name: "Pankaj Verma", place: "Parking" },
    { id: 4, name: "Suresh Yadav", place: "Back Gate" },
    { id: 5, name: "Vikram Thakur", place: "Floor 2" },
    { id: 6, name: "Ravi Sharma", place: "CCTV Room" },
    { id: 7, name: "Manoj Das", place: "Warehouse" },
    { id: 8, name: "Deepak Rana", place: "Control Room" },
    { id: 9, name: "Suraj Mehta", place: "Reception" },
    { id: 10, name: "Anil Tiwari", place: "Server Room" },
  ];

  return (
    <div className="max-w-4xl h-[50vh] rounded-md overflow-scroll shadow-lg  mt-4">
      <div className="flex justify-between items-center  p-4 bg-green-200 text-white rounded-t-md">
        <h3 className="text-lg font-semibold text-black">Guard Requests</h3>
      </div>
      <div className="p-4 bg-green-100">
        <ul className="space-y-2">
          {guardData.map((guard) => (
            <li
              key={guard.id}
              className="flex justify-between items-center shadow-md bg-slate-100 p-2 rounded-md"
            >
              <div className="flex items-center space-x-2">
                <h1>{guard.id}.</h1>
                <h4 className="text-lg font-semibold">{guard.name}</h4>
                <p className="text-sm text-gray-500">{guard.place}</p>
              </div>
              <div className=" w-20 h-8 mr-7 rounded-full hover:bg-green-600 bg-green-500 flex items-center justify-center">
                <Modal />
                </div>{" "}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default GuardRequestBox;
