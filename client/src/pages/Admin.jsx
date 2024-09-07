import { useEffect, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";

const socket = io("http://localhost:8804");

const Admin = () => {
  const [rolls, setRolls] = useState([]);

  // Fetch all rolls initially
  useEffect(() => {
    const fetchRolls = async () => {
      try {
        const response = await axios.get("http://localhost:8804/rolls");
        setRolls(response.data.data);
      } catch (error) {
        console.error("Error fetching rolls", error);
      }
    };

    fetchRolls();
  }, []);

  // Listen for real-time updates on rolls
  useEffect(() => {
    socket.on("updateRolls", (updatedRoll) => {
      setRolls((prevRolls) => {
        const existingRoll = prevRolls.find(
          (roll) => roll.rollNo === updatedRoll.rollNo
        );

        if (existingRoll) {
          // Update existing roll's count
          return prevRolls.map((roll) =>
            roll.rollNo === updatedRoll.rollNo
              ? { ...roll, count: updatedRoll.count }
              : roll
          );
        } else {
          // Add new roll if not present
          return [...prevRolls, updatedRoll];
        }
      });
    });

    return () => {
      socket.off("updateRolls");
    };
  }, []);

  
  return (
    <div>
      <h1>Admin Panel</h1>
      <table>
        <thead>
          <tr>
            <th>Roll Number</th>
            <th>Count</th>
          </tr>
        </thead>
        <tbody>
          {rolls.map((roll) => (
            <tr key={roll.rollNo}>
              <td>{roll.rollNo}</td>
              <td>{roll.count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Admin;
