import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import busappvecjpeg from "../assets/busappvecjpeg.jpeg";
import { toast } from "react-hot-toast";
import SignUp from './SignUp';

const Login = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState(''); // State for messages
    const navigate = useNavigate(); // Initialize useNavigate
    
    
    const handleLogin = async (e) => {
        e.preventDefault();
        setMessage(''); // Clear previous messages
        if (!username || !password) {
            toast.error("Please fill in all fields");
            return;
        }

        try {
            const response = await axios.post('http://localhost:8804/api/auth/login', {
                username,
                email,
                password
            });

            const { token, role } = response.data;
            localStorage.setItem('token', token);
            localStorage.setItem('role', role);
            setMessage('Login successful!'); // Success message
            navigate("/home"); // Redirect to home

        } catch (error) {
            // Set an error message if user not found or other errors
            setMessage(error.response ? error.response.data.message : 'Login failed. Please try again.');
        }
    };

    return (
        <div className="flex h-screen items-center justify-center p-6 bg-gradient-to-r from-rose-400 to-red-500">
              <header className="text-center m-auto">
    <h1 className="text-4xl font-bold text-white">LNMIIT BUS APP</h1>
  </header>
            <div className="flex bg-white rounded-lg shadow-lg overflow-hidden w-full md:max-w-3xl">
                <div className="illustration w-3/5 mt-28">
                    <img 
                        src={busappvecjpeg} 
                        alt="illustration" 
                        className="w-full h-auto max-h-[400px] object-cover" 
                    />
                </div>

                <div className="form flex flex-col p-6 w-2/5"> 
                    <div className="heading text-2xl font-bold text-center mb-6">LOGIN</div>
                    <form onSubmit={handleLogin}>
                        <div className="mb-4">
                            <label htmlFor="name" className="block mb-2">Name</label>
                            <input 
                                type="text" 
                                id="name" 
                                placeholder="Enter your name" 
                                value={username} 
                                onChange={(e) => setUsername(e.target.value)} 
                                className="h-12 w-full p-3 border-2 border-blue-200 rounded-lg bg-blue-50" 
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="e-mail" className="block mb-2">E-Mail</label>
                            <input 
                                type="email" 
                                id="e-mail" 
                                placeholder="Enter your mail" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                className="h-12 w-full p-3 border-2 border-blue-200 rounded-lg bg-blue-50" 
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
                                className="h-12 w-full p-3 border-2 border-blue-200 rounded-lg bg-blue-50" 
                            />
                        </div>
                        <button 
                            type="submit" 
                            className="h-12 w-full bg-blue-600 text-white uppercase font-bold tracking-wide rounded-lg hover:bg-blue-500 active:scale-95 transition-transform mt-6"
                        >
                            Submit
                        </button>
                    </form>
                    {message && (
                        <div className={`mt-4 text-center ${message.includes('successful') ? 'text-green-500' : 'text-red-500'}`}>
                            {message}
                        </div>
                    )}
                    <p className="text-sm mt-4 text-center">
                         Don't have an account? <Link to="/signup" className="text-blue-600 hover:underline">Sign Up</Link>
                    </p>
                    
                </div>
            </div>
        </div>
    );
};

export default Login;
