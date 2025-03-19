const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email is required'], // Fix the error message
    },
    password: {
        type: String,
        required: [true, 'Password is required'], // Fix the error message
    },
});

const PatientModel = mongoose.model("patients", patientSchema);

module.exports = PatientModel; // Use CommonJS syntax
