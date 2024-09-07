import axios from "axios";
import { useState } from "react";

const QrScanPage = () => {
  const [rollNo, setRollNo] = useState("");  // Roll number from QR code
  const [isScanned, setIsScanned] = useState(false);  // Show tick button after scanning

  // Mock function to simulate QR code scanning and extracting rollNo
  const scanQR = () => {
    const scannedRollNo = "12345";  // Replace this with actual QR scanning logic
    setRollNo(scannedRollNo);
    setIsScanned(true);  // Show the tick button
  };

  // Handle the tick button click to increment count
  const handleTick = async () => {
    try {
      const response = await axios.post("http://localhost:8804/incrementCount", {
        rollNo
      });

      if (response.data.success) {
        alert("Count incremented successfully for roll number: " + rollNo);
        setIsScanned(false);  // Hide the tick button after increment
      }
    } catch (error) {
      console.error("Error incrementing count", error);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <button onClick={scanQR}>Scan QR Code</button>

      {isScanned && (
        <div style={{ marginTop: "20px" }}>
          <h3>Roll Number: {rollNo}</h3>
          <button onClick={handleTick}>✔ Confirm (Tick)</button>
        </div>
      )}
    </div>
  );
};

export default QrScanPage;
