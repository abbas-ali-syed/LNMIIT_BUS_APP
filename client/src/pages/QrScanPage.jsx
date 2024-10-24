import React, { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import axios from "axios";
import { BASE_URL } from "../config";
const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const QrScanPage = ({ busId }) => {
  const [count, setCount] = useState(0);
  const [res, setRes] = useState(null);

  const d = new Date();
  let day = d.getDay();

  const today = daysOfWeek[day];
  useEffect(() => {
    const html5QrcodeScanner = new Html5QrcodeScanner("reader", {
      fps: 5,
      qrbox: { width: 300, height: 300 },
    });
    const handleScanSuccess = async (decodedText) => {
      html5QrcodeScanner.clear();
      setRes(decodedText);
      const res = await axios.post(
        `${BASE_URL}count/${today}/${busId}`
      );
      setCount(res.data);
      console.log(res.data);
      alert(`QR Code Scanned: ${decodedText}`);
    };
    const handleScanError = (error) => {
      console.error("QR Code Scan Error: ", error);
    };
    html5QrcodeScanner.render(handleScanSuccess, handleScanError);
  }, []);

  return (
    <>
      <div id="reader">Result:{res}</div>
      <div>Result:{count}</div>
    </>
  );
};

export default QrScanPage;
