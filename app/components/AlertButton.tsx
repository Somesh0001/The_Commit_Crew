import React from "react";

const AlertButton = () => {
  return (
    <>
      <div className="flex absolute top-0 flex-col items-center justify-center  gap-6 ">
        <div
          className="button w-32 h-32 bg-red-800 rounded-full cursor-pointer select-none
    active:translate-y-2  active:[box-shadow:0_0px_0_0_#8B0000,0_0px_0_0_#FF000041]
    active:border-b-[0px]
    transition-all duration-150 [box-shadow:0_8px_0_0_#8B0000,0_13px_0_0_#FF000041]
    border-[1px] border-red-600
  "
        >
          <span className="flex flex-col justify-center items-center h-full text-white font-bold text-md ">
            Emergency
          </span>
        </div>
      </div>
    </>
  );
};

export default AlertButton;
