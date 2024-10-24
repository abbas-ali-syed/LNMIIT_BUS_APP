
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Html5QrcodeScanner } from "html5-qrcode";
import axios from "axios";

const Bus = () => {
  const { id } = useParams();
  const [qrCodeData, setQrCodeData] = useState("");
  const [scanResult, setScanResult] = useState("");
  const [showScanner, setShowScanner] = useState(false);
  const [scanError, setScanError] = useState("");
  const [busData, setBusData] = useState(null);
  const userRole = localStorage.getItem('role');
  const isAdmin = userRole === "admin";

  useEffect(() => {
    fetchBusData();
    console.log("Bus data updated:", busData);

  }, [id]);

  useEffect(() => {
    let scanner;
    if (showScanner) {
      scanner = new Html5QrcodeScanner('reader', {
        qrbox: {
          width: 250,
          height: 250,
        },
        fps: 5,
      }, false);
      scanner.render(onScanSuccess, onScanError);
    }

    return () => {
      if (scanner) {
        scanner.clear();
      }
    };
  }, [showScanner]);

  const fetchBusData = async () => {
    try {
      console.log("Fetching bus data for id:", id);
      const response = await axios.get(`http://localhost:8804/api/users/bus/${id}`);
      console.log("Received bus data:", response.data);
      setBusData(response.data);
      console.log("Updated bus data:", busData);
    } catch (error) {
      console.error("Error fetching bus data:", error.response ? error.response.data : error.message);
    }
  };

  const generateQRCode = () => {
    const qrData = JSON.stringify({ busId: id, timestamp: Date.now() });
    setQrCodeData(qrData);
  };

  const onScanSuccess = async (decodedText, decodedResult) => {
    setScanResult(decodedText);
    setScanError("");
    console.log('Scanned QR code data:', decodedText);
    console.log('Decoded result:', decodedResult);
   
    try {
        // Construct the object to send to the backend
        const qrData = {
            day: new Date().toLocaleString('en-US', { weekday: 'long' }), // Assuming day can be inferred from the current day
            busId: JSON.parse(decodedText).busId // Parse the scanned data and extract the busId
        };

        // Make the API call to the backend
        const response = await axios.post("http://localhost:8804/api/users/scanBusQR", { qrData });

        if (response.data.success) {
            alert("Bus count increased successfully!");
            setShowScanner(false);
            fetchBusData(); // Fetch updated bus data
        }
    } catch (error) {
        console.error("Error scanning QR code:", error);
        setScanError("Error processing QR code. Please try again.");
    }
};


  const onScanError = (errorMessage) => {
    console.error(errorMessage);
    if (!errorMessage.includes("NotFoundException")) {
      setScanError("Error scanning QR code. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-8">Bus {id}</h1>
      
      {busData && (
        <div className="mb-4 text-lg">
          <p>Route: {busData.start} to {busData.destination}</p>
          <p>Seats Left: {busData.capacity - busData.count}</p>
          <p>Departure Time: {busData.time}</p>
        </div>
      )}

      {isAdmin && (
        <div className="mb-8">
          <button 
            onClick={generateQRCode}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Generate QR Code
          </button>
          {qrCodeData && (
            <div className="mt-4">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrCodeData)}`}
                alt="QR Code"
              />
            </div>
          )}
        </div>
      )}

      <div className="mb-8">
        <button 
          onClick={() => {
            setShowScanner(prev => !prev);
            setScanError("");
          }}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          {showScanner ? "Hide Scanner" : "Scan QR Code"}
        </button>
      </div>

      {showScanner && (
        <div>
          <div id="reader" className="w-full max-w-md"></div>
          <p className="mt-2 text-sm text-gray-600">Position the QR code within the scanner area.</p>
        </div>
      )}

      {scanError && (
        <div className="mt-4 text-red-500">
          {scanError}
        </div>
      )}

      {scanResult && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold">Scan Result:</h2>
          <p>{scanResult}</p>
        </div>
      )}
    </div>
  );
};

export default Bus;