import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import { Link } from 'react-router-dom';

// Sample data - replace with actual API call
const initClinics = [
  {
    id: 1,
    name: 'City Health Center',
    specialty: 'General Practice',
    address: '123 Healthcare Ave, Medical District',
    rating: 4.5,
    distance: '0.8 km',
    openNow: true,
    url: 'N/A',
  },
  {
    id: 2,
    name: 'Family Care Clinic',
    specialty: 'Family Medicine',
    address: '456 Wellness Blvd, Care Zone',
    rating: 4.8,
    distance: '1.2 km',
    openNow: true,
    url: 'N/A',
  },
  {
    id: 3,
    name: 'Pediatric Wellness',
    specialty: 'Pediatrics',
    address: "789 Children's Way, Kidcare Plaza",
    rating: 4.7,
    distance: '2.1 km',
    openNow: false,
    url: 'N/A',
  },
  {
    id: 4,
    name: 'Dental Excellence',
    specialty: 'Dentistry',
    address: '321 Smile Street, Dental Complex',
    rating: 4.6,
    distance: '1.5 km',
    openNow: true,
    url: 'N/A',
  },
];

function Clinics() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');
  const [clinics, setClinics] = useState(initClinics);
  const [lat, setLat] = useState(0);
  const [log, setLog] = useState(0);
  const [placeIds, setPlaceIds] = useState([]);
  const xRapidApiKey = '2ca7d3d3camsh4083132c212f675p1dd9e7jsn0eaf4025d210';

  useEffect(() => {
    setClinics(initClinics);
  }, []);

  const specialties = ['all', 'General Practice', 'Family Medicine', 'Pediatrics', 'Dentistry'];

  const filteredClinics = clinics.filter((clinic) => {
    const matchesSearch =
      clinic.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      clinic.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = selectedSpecialty === 'all' || clinic.specialty === selectedSpecialty;
    return matchesSearch && matchesSpecialty;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const getLatAndLog = async (place) => {
    console.log('98 lat and log entry\n');

    const options = {
      method: 'GET',
      url: 'https://address-from-to-latitude-longitude.p.rapidapi.com/geolocationapi',
      params: {
        address: `${place}`,
      },
      headers: {
        'x-rapidapi-key': `${xRapidApiKey}`,
        'x-rapidapi-host': 'address-from-to-latitude-longitude.p.rapidapi.com',
      },
    };

    try {
      const response = await axios.request(options);
      setLat(response.data.Results[0].latitude);
      setLog(response.data.Results[0].longitude);
    } catch (error) {
      console.error(error);
    }
  };

  const handleOnClick = async () => {
    console.log('enter clicked\n');
    if (searchTerm) await getLatAndLog(searchTerm);
  };

  const getPlaceIds = async (lat, log) => {
    console.log('128: ', lat, log);

    const options = {
      method: 'GET',
      url: 'https://google-map-places.p.rapidapi.com/maps/api/place/nearbysearch/json',
      params: {
        location: `${lat},${log}`,
        radius: '1000',
        type: 'hospital',
        language: 'en',
        opennow: 'true',
        rankby: 'prominence',
      },
      headers: {
        'x-rapidapi-key': `${xRapidApiKey}`,
        'x-rapidapi-host': 'google-map-places.p.rapidapi.com',
      },
    };

    try {
      const response = await axios.request(options);
      const places = response.data.results;
      console.log('152: ', places);
      // Save all place_ids to the state
      setPlaceIds(places.map((place) => place.place_id));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (lat && log) {
      getPlaceIds(lat, log);
    }
  }, [lat, log]);

  const getPlaceDetails = async (placeId) => {
    console.log('170: ', placeId);

    const options = {
      method: 'GET',
      url: 'https://google-map-places.p.rapidapi.com/maps/api/place/details/json',
      params: {
        place_id: `${placeId}`,
        region: 'en',
        fields: 'name,formatted_address,rating,url,opening_hours',
        language: 'en',
        reviews_no_translations: 'true',
      },
      headers: {
        'x-rapidapi-key': `${xRapidApiKey}`,
        'x-rapidapi-host': 'google-map-places.p.rapidapi.com',
      },
    };

    try {
      const response = await axios.request(options);
      console.log('API response:', response);
      const data = response.data.result;
      console.log('194: ', data);
      const newClinic = {
        id: new Date().getTime(),
        name: data.name,
        specialty: 'Unknown',
        address: data.formatted_address,
        rating: data.rating,
        distance: 'N/A',
        openNow: data.opening_hours?.open_now || false,
        url: data.url || 'N/A',
      };
      setClinics((prevClinics) => [...prevClinics, newClinic]);
    } catch (error) {
      console.error('Error fetching place details:', error);
    }
  };

  useEffect(() => {
    // Loop over all placeIds and get details one by one
    const fetchDetails = async () => {
      for (const placeId of placeIds) {
        await getPlaceDetails(placeId); // Wait for each place to fetch its details
      }
    };
    if (placeIds.length > 0) {
      fetchDetails();
    }
  }, [placeIds]);

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
            <h1 className="text-4xl font-bold text-primary mb-4">Find Clinics Near You</h1>
            <p className="text-lg text-text-light dark:text-text-dark">
              Discover and book appointments at trusted healthcare facilities
            </p>
          </motion.div>

          {/* Search and Filter */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="enter place ..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="input pl-10"
                    onKeyUp={(e)=>{
                      if(e.key=='Enter') handleOnClick();
                    }}
                  />
                  <svg
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
              <div>
                <button className='w-full md:w-48 input text-center' onClick={handleOnClick}>Enter</button>
              </div>
            </div>
          </motion.div>

          {/* Clinics List */}
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid gap-6">
            <AnimatePresence>
              {filteredClinics.map((clinic) => (
                <motion.div key={clinic.id} variants={itemVariants} layout className="card p-6">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-xl font-bold text-primary">{clinic.name}</h3>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${clinic.openNow ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                        >
                          {clinic.openNow ? 'Open' : 'Closed'}
                        </span>
                      </div>
                      <p className="text-text-light dark:text-text-dark mt-1">{clinic.specialty}</p>
                      <p className="text-text-muted text-sm mt-1">{clinic.address}</p>
                      <p className="text-text-muted text-sm mt-1">
                       <a
                            href={clinic.url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >open in map: {clinic.url}
                      </a>
                      </p>
                      <div className="flex items-center gap-4 mt-2">
                        <div className="flex items-center">
                          <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <span className="ml-1 text-text-light dark:text-text-dark">{clinic.rating}</span>
                        </div>
                        <div className="flex items-center">
                          <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a2 2 0 010-2.827l4.243-4.243a2 2 0 012.828 0l4.243 4.243a2 2 0 010 2.828z"
                            />
                          </svg>
                          <span className="ml-1 text-text-light dark:text-text-dark">{clinic.distance}</span>

                        </div>
                      </div>
                    </div>
                    <a href={clinic.url} className="text-primary text-sm mt-4">
                      View details
                    </a>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </>
  );
}

export default Clinics;
