import React, { useState } from "react";
import QrPage from "./QrPage";
import { useParams } from "react-router-dom";
import QrScanPage from "./QrScanPage";

const Bus = () => {
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    console.log(open);
    setOpen(!open);
  };
  return (
    <div className="flex justify-between m-4">
      <div className="text-2xl">
        <button onClick={handleClick}>Generate QR</button>
        {open ? <QrPage busId={id} /> : ""}
        <QrScanPage busId={id} />
      </div>
      {/*  scaning for admin */}
      <div>Track bus</div>
    </div>
  );
};

export default Bus;
