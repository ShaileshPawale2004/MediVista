// SignUp.js (Updated with Dark Blue Background)
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function SignUp() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (!formData.name || !formData.email || !formData.password) {
            setError('All fields are required');
            return;
        }

        axios.post('http://localhost:5000/PatientRegister', formData)
            .then(res => {
                if (res.data === 'Success') {
                    navigate("/login");
                } else {
                    setError('Registration failed. Please try again.');
                }
            })
            .catch(err => {
                console.error(err);
                setError(err.response?.data || 'Registration failed');
            });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0A2540] text-white">
            <div className="bg-white text-black p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Signup</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block mb-2">Name:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                            required
                        />
                    </div>
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
                    {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
                    <button
                        type="submit"
                        className="w-full bg-[#0A2540] text-white p-2 rounded-md hover:bg-opacity-90"
                    >
                        Submit
                    </button>
                    <div className="mt-4 text-center">
                        <Link to="/login" className="text-blue-600 hover:text-blue-800">
                            Already have an account? Log In
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SignUp;
