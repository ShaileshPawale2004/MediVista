import React from 'react';
import { motion } from 'framer-motion';
import { useSymptomContext } from '../context/SymptomContext';
import StepIndicator from '../components/symptom-checker/StepIndicator';
import SelectionCard from '../components/symptom-checker/SelectionCard';
import NavigationButtons from '../components/symptom-checker/NavigationButtons';

const heroImages = {
  1: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80", // Medical professionals
  2: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&q=80", // Age-related
  3: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80", // Body examination
  4: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&q=80", // Symptoms
  5: "https://images.unsplash.com/photo-1666214280557-f1b5022eb634?auto=format&fit=crop&q=80", // Pain assessment
  6: "https://images.unsplash.com/photo-1628595351029-c2bf17511435?auto=format&fit=crop&q=80", // Allergies
  7: "https://images.unsplash.com/photo-1527613426441-4da17471b66d?auto=format&fit=crop&q=80"  // Summary
};

function SymptomChecker() {
  const { state, dispatch } = useSymptomContext();

  const renderStep = () => {
    switch (state.currentStep) {
      case 1:
        return (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-white mb-4">Select Your Gender</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">Help us provide more accurate health insights by selecting your gender.</p>
            <div className="grid grid-cols-2 gap-6">
              <SelectionCard
                selected={state.gender === 'male'}
                onClick={() => dispatch({ type: 'SET_GENDER', payload: 'male' })}
                icon="👨"
                label="Male"
                className="transform hover:scale-105 transition-transform"
              />
              <SelectionCard
                selected={state.gender === 'female'}
                onClick={() => dispatch({ type: 'SET_GENDER', payload: 'female' })}
                icon="👩"
                label="Female"
                className="transform hover:scale-105 transition-transform"
              />
            </div>
            <NavigationButtons canProceed={state.gender !== ''} />
          </motion.div>
        );

      case 2:
        return (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-white mb-4">Select Your Age Group</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">Different age groups may experience symptoms differently. Let us know your age range.</p>
            <div className="grid grid-cols-3 gap-6">
              <SelectionCard
                selected={state.ageGroup === 'young'}
                onClick={() => dispatch({ type: 'SET_AGE_GROUP', payload: 'young' })}
                icon="👶"
                label="Young (0-18)"
                className="transform hover:scale-105 transition-transform"
              />
              <SelectionCard
                selected={state.ageGroup === 'adult'}
                onClick={() => dispatch({ type: 'SET_AGE_GROUP', payload: 'adult' })}
                icon="👨‍💼"
                label="Adult (19-59)"
                className="transform hover:scale-105 transition-transform"
              />
              <SelectionCard
                selected={state.ageGroup === 'senior'}
                onClick={() => dispatch({ type: 'SET_AGE_GROUP', payload: 'senior' })}
                icon="👴"
                label="Senior (60+)"
                className="transform hover:scale-105 transition-transform"
              />
            </div>
            <NavigationButtons canProceed={state.ageGroup !== ''} />
          </motion.div>
        );

      case 3:
        const bodyParts = [
          { id: 'head', label: 'Head', icon: '🤕' },
          { id: 'chest', label: 'Chest', icon: '💗' },
          { id: 'stomach', label: 'Stomach', icon: '🤰' },
          { id: 'arms', label: 'Arms', icon: '💪' },
          { id: 'legs', label: 'Legs', icon: '🦵' },
          { id: 'skin', label: 'Skin', icon: '🖐' },
        ];

        return (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-white mb-4">Select Affected Body Part</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">Identify the area where you're experiencing discomfort or symptoms.</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {bodyParts.map((part, index) => (
                <motion.div
                  key={part.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <SelectionCard
                    selected={state.bodyPart === part.id}
                    onClick={() => dispatch({ type: 'SET_BODY_PART', payload: part.id })}
                    icon={part.icon}
                    label={part.label}
                    className="transform hover:scale-105 transition-transform"
                  />
                </motion.div>
              ))}
            </div>
            <NavigationButtons canProceed={state.bodyPart !== ''} />
          </motion.div>
        );

      case 4:
        const symptoms = {
          head: [
            { id: 'headache', label: 'Headache', icon: '🤕' },
            { id: 'dizziness', label: 'Dizziness', icon: '😵' },
            { id: 'fever', label: 'Fever', icon: '🤒' },
          ],
          chest: [
            { id: 'cough', label: 'Cough', icon: '😷' },
            { id: 'shortness_breath', label: 'Shortness of Breath', icon: '😮‍💨' },
            { id: 'chest_pain', label: 'Chest Pain', icon: '💔' },
          ],
          // Add more symptoms for other body parts
        };

        const currentSymptoms = symptoms[state.bodyPart] || [];

        return (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-white mb-4">Select Symptom Type</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">Choose the symptom that best describes your condition.</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {currentSymptoms.map((symptom, index) => (
                <motion.div
                  key={symptom.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <SelectionCard
                    selected={state.symptomType === symptom.id}
                    onClick={() => dispatch({ type: 'SET_SYMPTOM_TYPE', payload: symptom.id })}
                    icon={symptom.icon}
                    label={symptom.label}
                    className="transform hover:scale-105 transition-transform"
                  />
                </motion.div>
              ))}
            </div>
            <NavigationButtons canProceed={state.symptomType !== ''} />
          </motion.div>
        );

      case 5:
        return (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-white mb-4">Select Pain Duration & Severity</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">Assess the duration and severity of your pain.</p>
            <div className="space-y-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  How long have you been experiencing this?
                </label>
                <select
                  value={state.duration}
                  onChange={(e) => dispatch({ type: 'SET_DURATION', payload: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50"
                >
                  <option value="">Select duration</option>
                  <option value="today">Today</option>
                  <option value="few_days">Few days</option>
                  <option value="week">A week</option>
                  <option value="month">A month or more</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pain Severity (1-10)
                </label>
                <input
                  type="range"
                  min="0"
                  max="10"
                  value={state.severity}
                  onChange={(e) => dispatch({ type: 'SET_SEVERITY', payload: parseInt(e.target.value) })}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Mild</span>
                  <span>Moderate</span>
                  <span>Severe</span>
                </div>
              </div>
            </div>
            <NavigationButtons canProceed={state.duration !== ''} />
          </motion.div>
        );

      case 6:
        const allergies = [
          { id: 'dust', label: 'Dust', icon: '🏠' },
          { id: 'pollen', label: 'Pollen', icon: '🌺' },
          { id: 'medication', label: 'Medication', icon: '💊' },
          { id: 'food', label: 'Food', icon: '🍽' },
          { id: 'pets', label: 'Pets', icon: '🐱' },
          { id: 'none', label: 'No Allergies', icon: '✅' },
        ];

        return (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-white mb-4">Select Allergy History</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">Do you have any allergies?</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {allergies.map((allergy, index) => (
                <motion.div
                  key={allergy.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <SelectionCard
                    selected={state.allergies.includes(allergy.id)}
                    onClick={() => dispatch({ type: 'TOGGLE_ALLERGY', payload: allergy.id })}
                    icon={allergy.icon}
                    label={allergy.label}
                    className="transform hover:scale-105 transition-transform"
                  />
                </motion.div>
              ))}
            </div>
            <NavigationButtons canProceed={true} />
          </motion.div>
        );

      case 7:
        return (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-white mb-4">Summary of Your Selections</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">Review your answers before submitting.</p>
            <div className="space-y-4">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                <h3 className="font-medium mb-2">Personal Information</h3>
                <p>Gender: {state.gender}</p>
                <p>Age Group: {state.ageGroup}</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                <h3 className="font-medium mb-2">Symptoms</h3>
                <p>Affected Body Part: {state.bodyPart}</p>
                <p>Symptom Type: {state.symptomType}</p>
                <p>Duration: {state.duration}</p>
                <p>Severity: {state.severity}/10</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                <h3 className="font-medium mb-2">Allergies</h3>
                <div className="flex flex-wrap gap-2">
                  {state.allergies.map(allergy => (
                    <span key={allergy} className="bg-primary/10 text-primary px-3 py-1 rounded-full">
                      {allergy}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => dispatch({ type: 'RESET' })}
                className="flex-1 bg-gray-100 text-gray-700 px-6 py-3 rounded-full hover:bg-gray-200 transition-colors duration-300"
              >
                Start Over
              </button>
              <button
                onClick={() => {/* Handle submission */}}
                className="flex-1 btn-primary"
              >
                Get Report
              </button>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section with Dynamic Image */}
      <div className="relative h-[40vh] mb-8">
        <div className="absolute inset-0">
          <img
            src={heroImages[state.currentStep]}
            alt="Medical background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary-900/75 to-primary-800/50" />
        </div>
        <div className="relative h-full flex items-center justify-center">
          <div className="text-center text-white p-8">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl font-display font-bold mb-4"
            >
              Symptom Checker
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-white/90"
            >
              Get instant insights about your health concerns
            </motion.p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-20">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-soft-xl p-8">
            <StepIndicator currentStep={state.currentStep} />
            <div className="mt-8">
              {renderStep()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SymptomChecker;
