import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../config";
const SignUp = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState(''); // State for messages
    const [isSuccess, setIsSuccess] = useState(false); // State for success indication

    const navigate = useNavigate(); // Initialize navigate

    const handleSignup = async (e) => {
        e.preventDefault();
        setMessage(''); // Clear previous messages

        try {
            await axios.post(`${BASE_URL}api/auth/signup`, {
                username,
                email,
                password,
                role: 'user' // default role 
            });

            setIsSuccess(true); 
            setMessage('User registered successfully!'); 
            navigate("/home"); // Navigate to home page
        } catch (error) {
            setIsSuccess(false); // Indicate failure
            setMessage(error.response ? error.response.data.message : 'Signup failed. Please try again.'); // Error message
        }
    };

    return (
        <div className="flex h-screen items-center justify-center p-6 bg-gradient-to-r from-rose-400 to-orange-300">
            <div className="form flex flex-col p-6 bg-white rounded-lg shadow-lg w-full max-w-md">
                <div className="heading text-2xl font-bold text-center mb-6">CREATE AN ACCOUNT</div>
                <form onSubmit={handleSignup}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block mb-2">User Name</label>
                        <input 
                            type="text" 
                            id="name" 
                            placeholder="Enter your name" 
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="h-10 w-full p-3 border-2 border-blue-200 rounded-lg bg-blue-50" 
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block mb-2">E-Mail</label>
                        <input 
                            type="email" 
                            id="email" 
                            placeholder="Enter your email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="h-10 w-full p-3 border-2 border-blue-200 rounded-lg bg-blue-50" 
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block mb-2">Password</label>
                        <input 
                            type="password" 
                            id="password" 
                            placeholder="Enter your password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="h-10 w-full p-3 border-2 border-blue-200 rounded-lg bg-blue-50" 
                        />
                    </div>
                    <button 
                        type="submit" 
                        className="h-10 w-full bg-blue-600 text-white uppercase font-bold tracking-wide rounded-lg hover:bg-blue-500 active:scale-95 transition-transform mt-4"
                    >
                        Submit
                    </button>
                    <h2 className="text-center my-4 text-lg">OR</h2>
                </form>
                {message && (
                    <div className={`mt-4 text-center ${isSuccess ? 'text-green-500' : 'text-red-500'}`}>
                        {message}
                    </div>
                )}
                <p className="text-sm mt-4">
                    Have an account? <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
                </p>
            </div>
        </div>
    );
};

export default SignUp;
