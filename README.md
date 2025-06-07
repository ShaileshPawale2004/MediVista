# MediVista 🩺

MediVista is an intelligent healthcare management web application that leverages modern frontend design, interactive mapping, document generation, and AI-powered features to enhance clinical workflows and patient engagement.

## 🌐 Live Demo

> _Coming soon_ — Add your deployment link here (e.g., Vercel/Netlify/Render).

---

## 🔧 Tech Stack

### 📦 Frontend
- **React 18** – Component-based UI
- **TypeScript** – Strongly typed React development
- **Tailwind CSS** – Modern utility-first styling
- **Framer Motion** – Smooth animations
- **React Router DOM** – Routing/navigation
- **Leaflet + React Leaflet** – Map integration
- **Google Generative AI** – Smart content generation
- **html2canvas + jsPDF + html2pdf.js** – PDF exports and screenshot capturing

### 🌐 Backend
- **Express.js** – REST API server
- **Mongoose** – MongoDB ORM
- **CORS** – Middleware for cross-origin resource sharing

---

## 🏗️ Features

- 📍 Interactive hospital/clinic map locator
- 📄 Downloadable patient reports in PDF format
- 🤖 AI-assisted question or summary generation
- 📅 Date & time management using `date-fns`
- 🧠 Smart autocomplete using Google’s AI SDK
- 🔒 Backend REST APIs with secure CORS support
- 🌐 Fully responsive UI

---

## 🗂️ Folder Structure

Code/
└── Shailesh/
└── MediVista/
├── backend/ # Express.js server
├── public/ # Static assets
├── src/ # React + TS frontend
├── .env # Environment variables
├── package.json # Project metadata & dependencies
└── tailwind.config.js # Tailwind CSS config


---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn
- MongoDB instance (local/cloud)

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/medivista.git
cd Code/Shailesh/MediVista

2. Install Dependencies
npm install

3. Environment Setup
Create a .env file in the root directory and add:
REACT_APP_API_URL=http://localhost:5000/api
MONGO_URI=your_mongodb_connection_string
PORT=5000

4. Run the App
# Start frontend and backend together (if configured)
npm start


📦 Deployment
You can deploy this project on platforms like:

Frontend: Vercel / Netlify

Backend: Render / Railway / Heroku

Database: MongoDB Atlas





