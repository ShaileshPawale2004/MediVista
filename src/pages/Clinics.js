import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';

function Clinics() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');

  // Sample data - replace with actual API call
  const clinics = [
    {
      id: 1,
      name: 'City Health Center',
      specialty: 'General Practice',
      address: '123 Healthcare Ave, Medical District',
      rating: 4.5,
      distance: '0.8 km',
      openNow: true,
    },
    {
      id: 2,
      name: 'Family Care Clinic',
      specialty: 'Family Medicine',
      address: '456 Wellness Blvd, Care Zone',
      rating: 4.8,
      distance: '1.2 km',
      openNow: true,
    },
    {
      id: 3,
      name: 'Pediatric Wellness',
      specialty: 'Pediatrics',
      address: "789 Children's Way, Kidcare Plaza",
      rating: 4.7,
      distance: '2.1 km',
      openNow: false,
    },
    {
      id: 4,
      name: 'Dental Excellence',
      specialty: 'Dentistry',
      address: '321 Smile Street, Dental Complex',
      rating: 4.6,
      distance: '1.5 km',
      openNow: true,
    },
  ];

  const specialties = ['all', 'General Practice', 'Family Medicine', 'Pediatrics', 'Dentistry'];

  const filteredClinics = clinics.filter(clinic => {
    const matchesSearch = clinic.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         clinic.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = selectedSpecialty === 'all' || clinic.specialty === selectedSpecialty;
    return matchesSearch && matchesSpecialty;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>Find Clinics - Image-e-Nation</title>
        <meta name="description" content="Find and book appointments at healthcare clinics near you" />
      </Helmet>

      <div className="min-h-screen bg-background-light dark:bg-background-dark py-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold text-primary mb-4">
              Find Clinics Near You
            </h1>
            <p className="text-lg text-text-light dark:text-text-dark">
              Discover and book appointments at trusted healthcare facilities
            </p>
          </motion.div>

          {/* Search and Filter */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search by clinic name or address..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="input pl-10"
                  />
                  <svg
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>
              <div className="w-full md:w-48">
                <select
                  value={selectedSpecialty}
                  onChange={(e) => setSelectedSpecialty(e.target.value)}
                  className="input"
                >
                  {specialties.map(specialty => (
                    <option key={specialty} value={specialty}>
                      {specialty === 'all' ? 'All Specialties' : specialty}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </motion.div>

          {/* Clinics List */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid gap-6"
          >
            <AnimatePresence>
              {filteredClinics.map(clinic => (
                <motion.div
                  key={clinic.id}
                  variants={itemVariants}
                  layout
                  className="card p-6"
                >
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-xl font-bold text-primary">
                          {clinic.name}
                        </h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          clinic.openNow ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {clinic.openNow ? 'Open' : 'Closed'}
                        </span>
                      </div>
                      <p className="text-text-light dark:text-text-dark mt-1">
                        {clinic.specialty}
                      </p>
                      <p className="text-text-muted text-sm mt-1">
                        {clinic.address}
                      </p>
                      <div className="flex items-center gap-4 mt-2">
                        <div className="flex items-center">
                          <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <span className="ml-1 text-text-light dark:text-text-dark">
                            {clinic.rating}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span className="ml-1 text-text-light dark:text-text-dark">
                            {clinic.distance}
                          </span>
                        </div>
                      </div>
                    </div>
                    <button className="btn-primary whitespace-nowrap">
                      Book Appointment
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Empty State */}
          {filteredClinics.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <svg
                className="mx-auto h-12 w-12 text-text-muted"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="mt-4 text-lg font-medium text-text-light dark:text-text-dark">
                No clinics found
              </h3>
              <p className="mt-2 text-text-muted">
                Try adjusting your search or filter criteria
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
}

export default Clinics;
