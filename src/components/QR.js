import React, { useEffect, useState } from "react";
import QRCode from "qrcode.react"; // Import the correct package

function QR() {
  const [serialNumber, setSerialNumber] = useState("");
  const [qrData, setQRData] = useState("");
  let formData = localStorage.getItem("eventData");
  formData = JSON.parse(formData);
  const generateQRCode = () => {
    setQRData(formData.bID);
  };
useEffect(()=>{
    setQRData(formData.bID);
})
  return (
    <div className="flex flex-col items-center mt-10">
      {/* <input
        type="text"
        className="border p-2 m-2"
        placeholder="Enter Serial Number"
        value={serialNumber}
        onChange={(e) => setSerialNumber(e.target.value)}
      /> /}
      {/ <button
        className="bg-blue-500 text-white p-2 rounded"
        onClick={generateQRCode}
      >
        Generate QR Code
      </button> */}
      {qrData && (
        <div className="mt-4">
          <QRCode value={qrData} size={128} />
        </div>
      )}
    </div>
  );
}

export default QR;
