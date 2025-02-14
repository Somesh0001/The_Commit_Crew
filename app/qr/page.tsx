"use client";

import { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";

export default function QRCodeGenerator() {
  const [inputValue, setInputValue] = useState("");
  const [qrValue, setQrValue] = useState("");

  const generateQRCode = () => {
    setQrValue(inputValue); // Update the QR value on button click
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <input
        type="text"
        placeholder="Enter text or URL"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="border p-2 rounded-md"
      />
      <button onClick={generateQRCode} className="bg-blue-500 text-white px-4 py-2 rounded-md">
        Generate QR Code
      </button>
      {qrValue && <QRCodeCanvas value={qrValue} size={200} />}
    </div>
  );
}
