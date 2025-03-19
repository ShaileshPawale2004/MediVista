// Selection.js (With Dark Blue Background and Updated Navigation)
import React from 'react';
import { useNavigate } from 'react-router-dom';

function Selection() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#0A2540]"> 
            <div className="relative z-10 text-center">
                <h1 className="text-4xl font-bold mb-8 text-white">Select Your Role</h1>
                <div className="flex space-x-8">
                    <div className="text-center cursor-pointer" onClick={() => navigate('/login')}>
                        <img 
                            src="https://cdn-icons-png.flaticon.com/512/2922/2922510.png" 
                            alt="Patient" 
                            className="w-40 h-40 rounded-full shadow-lg border-4 border-white mb-4 hover:scale-110 transition-transform"
                        />
                        <p className="text-lg font-semibold text-white">Patient</p>
                    </div>

                    <div className="text-center cursor-pointer" onClick={() => alert('Doctor Dashboard Coming Soon!')}>
                        <img 
                            src="https://cdn-icons-png.flaticon.com/512/607/607414.png" 
                            alt="Doctor" 
                            className="w-40 h-40 rounded-full shadow-lg border-4 border-white mb-4 hover:scale-110 transition-transform"
                        />
                        <p className="text-lg font-semibold text-white">Doctor</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Selection;
