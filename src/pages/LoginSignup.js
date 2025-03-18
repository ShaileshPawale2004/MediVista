// LoginSignup.js (Updated with Dark Blue Background)
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginSignup() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: '', password: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        navigate('/home'); // Redirect to home after form submission for now
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0A2540] text-white">
            <div className="bg-white text-black p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Login / Signup</h2>
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
                </form>
            </div>
        </div>
    );
}

export default LoginSignup;
