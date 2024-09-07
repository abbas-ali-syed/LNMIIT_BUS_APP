import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";

const Login = () => {
  const [rollNo, setRollNo] = useState("");
  const [password, setPassword] = useState("");

  const {setUser} = useContext(UserContext)

  const navigate = useNavigate();

  const handleLogin = async () => {  // Removed parameters since we already have them in state
    try {
        const response = await axios.post("http://localhost:8804/login", {
            rollNo,
            password
        });
        if (response.data.success) {
            setUser({rollNo})
            navigate(`/qrpage/${rollNo}`);
        } else {
            console.log(response.data.message);
        }
    } catch (err) {
        console.log(err);
    }
  };

  return (
    <div>
      <label>Roll Number</label>
      <input
        type="text"
        value={rollNo}
        onChange={(e) => setRollNo(e.target.value)}
      />
      <br />
      <label>Password</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button> {/* Corrected here */}
    </div>
  );
};

export default Login;
