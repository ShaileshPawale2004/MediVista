import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ErrorBoundary } from 'react-error-boundary';
import { ThemeProvider } from './context/ThemeContext';
import { SymptomProvider } from './context/SymptomContext';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import ChatBot from './components/ChatBot';
import Login from './pages/Login';
import SignUp from './pages/SignUp';

// Lazy loaded components
const Selection = lazy(() => import('./pages/Selection'));
const Home = lazy(() => import('./pages/Home'));
const SymptomChecker = lazy(() => import('./pages/SymptomChecker'));
const Clinics = lazy(() => import('./pages/Clinics'));
const Report = lazy(() => import('./pages/Report'));
const Contact = lazy(() => import('./pages/Contact'));

// Loading fallback
const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark transition-colors duration-200">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      <p className="mt-4 text-text-light dark:text-text-dark">Loading...</p>
    </div>
  </div>
);

const ErrorFallback = ({ error }) => (
  <div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark transition-colors duration-200">
    <div className="text-center p-8 rounded-lg">
      <h2 className="text-2xl font-bold text-red-600 mb-4">Something went wrong</h2>
      <p className="text-text-light dark:text-text-dark mb-4">{error.message}</p>
      <button 
        onClick={() => window.location.reload()}
        className="btn-primary"
      >
        Try again
      </button>
    </div>
  </div>
);

function AnimatedRoutes() {
  const location = useLocation();
  const showNavbar = !['/', '/login', '/signup'].includes(location.pathname);

  return (
    <div>
      {showNavbar && <Navbar />}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Selection />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/home" element={<Home />} />
          <Route path="/symptom-checker" element={<SymptomChecker />} />
          <Route path="/clinics" element={<Clinics />} />
          <Route path="/report" element={<Report />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider> {/* ✅ Moved ThemeProvider to the highest level */}
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <HelmetProvider>
          <SymptomProvider>
            <div className="min-h-screen bg-background-light dark:bg-background-dark transition-colors duration-200">
              <Router>
                <Suspense fallback={<LoadingFallback />}>
                  <AnimatedRoutes />
                </Suspense>
              </Router>
              <ChatBot />
            </div>
          </SymptomProvider>
        </HelmetProvider>
      </ErrorBoundary>
    </ThemeProvider>
  );
}

export default App;
