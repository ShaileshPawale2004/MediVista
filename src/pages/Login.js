// Login.js (Updated with Dark Blue Background)
import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [isError, setIsError] = useState(0);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("form data here: ", formData);
        
        axios.post("http://localhost:3001/PatientLogIn", formData).
        then(res => {
            console.log("res: ", res.data);
            
            if(res.data=="Success"){
                navigate("/home");
            } else{
                setIsError(1);
                setTimeout(() => {
                    setIsError(0);
                }, 3000);
            }
        }).catch(err => {
            console.log(err);
            alert("Invalid credentials");
        })

        console.log('Form submitted:', formData);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0A2540] text-white">
            <div className="bg-white text-black p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block mb-2">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block mb-2">Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-[#0A2540] text-white p-2 rounded-md hover:bg-opacity-90"
                    >
                        Submit
                    </button>
                    <Link to="/signup">
                     <p>Sign Up</p>
                    </Link>
                   {
                    isError ? <p className='text-center text-red-500'>Invalid credentials</p> : ""
                   }
                </form>
            </div>
        </div>
    );
}

export default Login;
