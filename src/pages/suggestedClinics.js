import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { aside } from 'framer-motion/client';
import { useSymptomContext } from '../context/SymptomContext';

// Sample data - replace with actual API call

function SuggestedClinics() {
    
  const { state } = useSymptomContext();
  const [searchTerm, setSearchTerm] = useState(`${state.bodyPart} hospitals`);
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');
  const [SuggestedClinics, setSuggestedClinics] = useState([]);
  const [placeIds, setPlaceIds] = useState([]);
  //d8760adca0msh7789ebe411a91acp182a4cjsnd60b4c10aac2
  //5fbed5117dmsh8c9a4b95711434cp132a06jsnc1fa0463075b
  //f2d731bf9emsh992f9fa4452a67ep1b57dfjsn3d3b12e9cf32
  //b5f160820fmsha766666e8473595p1ea421jsnbf80a4785207
  const xRapidApiKey = '5fbed5117dmsh8c9a4b95711434cp132a06jsnc1fa0463075b';
  const [lat, setLat] = useState(0);
  const [log, setLog] = useState(0);
  const [subRegion, setsubRegion] = useState("");


    
    const setLatAndLog = async(position)=>{
        setLat(position.coords.latitude);
        setLog(position.coords.longitude);
        return;
    }

    async function gotLocation(position){
        console.log("location: ", position.coords.latitude, position.coords.longitude);
        setLatAndLog(position);
        return;
    }

    function failedToGet(){
        console.log("There was some issue");
        return;
        
    }

    async function getUserLocationDetails() {
         navigator.geolocation.getCurrentPosition(gotLocation, failedToGet);
         return;
    }

    const handleLocationAccess = async()=>{
        await getUserLocationDetails();
        return;
    }



      const getLocation = async()=>{
        console.log("lat and log: ", lat, log);
        
        const options = {
          method: 'GET',
          url: 'https://feroeg-reverse-geocoding.p.rapidapi.com/address',
          params: {
            lat: lat,
            lon: log,
            lang: 'en',
            mode: 'text',
            format: `'[SN[, ] - [23456789ab[, ]'`
          },
          headers: {
            'x-rapidapi-key': xRapidApiKey,
            'x-rapidapi-host': 'feroeg-reverse-geocoding.p.rapidapi.com'
          }
        };
          
          try {

              async function fetchData() {
                try {
                  const response = await axios.request(options);
                  console.log(response.data);
                  
                  setsubRegion(response.data);
                } catch (error) {
                  console.error(error);
                }
              }
              await fetchData();
          } catch (error) {
              console.error(error);
          }
        }

        
        const updateSetQuery = async()=>{
          setSearchTerm(`${state.bodyPart} hospitals in ${subRegion}`);
          return;
        }

        useEffect(()=>{
            console.log("sub region: ", subRegion);
            const f = async()=>{
              if(subRegion.length){
                await updateSetQuery();
                await handleOnClick();
              }
            }
            f();
        }, [subRegion])

      useEffect(()=>{
        const fetchLocation = async()=>{
            setSuggestedClinics([]);
            await getLocation();
            console.log("updated query: ", searchTerm);
            
            await updateSetQuery();
        }
        fetchLocation();
      }, [lat, log])

      useEffect(()=>{
        const f = async()=>{

          await getUserLocationDetails();
        }
        f();
      }, [])


      
  const specialties = ['all', 'General Practice', 'Family Medicine', 'Pediatrics', 'Dentistry'];


  const containerVariants = {
    hidden: { opasubRegion: 0 },
    visible: {
      opasubRegion: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opasubRegion: 0, y: 20 },
    visible: {
      opasubRegion: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };


  const searchTermCheck = async()=>{
    setSearchTerm(searchTerm.toLowerCase());
    if(!searchTerm.includes("hospital")){
      const temp = searchTerm + " hospitals";
    }
    return searchTerm;
  }

  const emptySuggestedClinics = async()=>{
    setSuggestedClinics([]);
    setPlaceIds([]);
    return;
  }

  const getPlaceIds = async () => {
    setSearchTerm(await searchTermCheck());
    console.log("search Term: ", searchTerm, subRegion);
    console.log("lat and log: ", lat, log);
    
    await emptySuggestedClinics();
    
    const options = {
      method: 'GET',
      url: 'https://google-map-places.p.rapidapi.com/maps/api/place/textsearch/json',
      params: {
        query: `${state.bodyPart} ${searchTerm} in ${subRegion}`,
        radius: '1000',
        opennow: 'true',
        location: '40,-110',
        language: 'en',
        region: 'en',
      },
      headers: {
        'x-rapidapi-key': xRapidApiKey,
        'x-rapidapi-host': 'google-map-places.p.rapidapi.com',
      },
    };
  
    try {
      const response = await axios.request(options);
      const places = response.data.results;
      const ids = places.map((place) => place.place_id);
    //   console.log('Place IDs:', ids);
      setPlaceIds(ids);
      return ids; // Return the place IDs
    } catch (error) {
      console.error('Error fetching place IDs:', error);
      return [];
    }
  };
  


  const pushInSuggestedClinics = async(newClinic)=>{
    setSuggestedClinics((prevSuggestedClinics) => [...prevSuggestedClinics, newClinic]);

  }

  const getPlaceDetails = async (placeId) => {
    // console.log('170: ', placeId);

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
    //   console.log('API response:', response);
      const data = response.data.result;
    //   console.log('194: ', data);
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

      await pushInSuggestedClinics(newClinic);
      console.log("SuggestedClinics: ", SuggestedClinics);
      

    } catch (error) {
      console.error('Error fetching place details:', error);
    }
  };


  
  const handleOnClick = async () => {
    console.log('Fetching place IDs...');
    const ids = await getPlaceIds(); // Wait for place IDs to be set
    console.log('Place IDs received:', ids);
  
    for (const placeId of ids) {
      await getPlaceDetails(placeId); // Fetch details one by one
    }
  };
  

  return (
    <>
      <Helmet>
        <title>Find SuggestedClinics - Image-e-Nation</title>
        <meta name="description" content="Find and book appointments at healthcare SuggestedClinics near you" />
      </Helmet>

      <div className="min-h-screen bg-background-light dark:bg-background-dark py-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opasubRegion: 0, y: -20 }}
            animate={{ opasubRegion: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold text-primary mb-4">Suggested Clinics From MediVista</h1>
            <p className="text-lg text-text-light dark:text-text-dark">
              Discover and book appointments at trusted healthcare facilities
            </p>
          </motion.div>

         

          {/* SuggestedClinics List */}
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid gap-6">
            <AnimatePresence>
              {SuggestedClinics.map((clinic) => (
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
          <div className="flex justify-center mt-4">
          <Link
            to="/clinics"
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
          >
            Search For More Clinics
          </Link>
        </div>

        </div>
      </div>
    </>
  );
}

export default SuggestedClinics;
