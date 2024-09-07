import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("")
  const [rollNo, setRollNo] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate("");

  const handleRegister = async () => {
    try {
      // Send the data in the POST request
      const response = await axios.post("http://localhost:8804/register", {
        name,
        rollNo,
        password,
      });

      if (response.data.success) {
        console.log("Roll Number:", rollNo);
        navigate("/login"); // Navigate to the login page on success
      } else {
        console.log("Registration failed:", response.data.message);
      }
    } catch (err) {
      console.log("Error during registration:", err);
    }
  };

  return (
    <div>
      <label>Name</label>
      <input
        type="text"
        name=""
        id=""
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br />

      <label>RollNumber</label>
      <input
        type="text"
        name=""
        id=""
        value={rollNo}
        onChange={(e) => setRollNo(e.target.value)}
      />
      <br />
      <label>Password</label>
      <input
        type="password"
        name=""
        id=""
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit" onClick={handleRegister}>login</button>
    </div>
  );
};

export default Register;
