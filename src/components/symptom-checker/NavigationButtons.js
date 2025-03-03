import React from 'react';
import { motion } from 'framer-motion';
import { useSymptomContext } from '../../context/SymptomContext';

const NavigationButtons = ({ canProceed = true }) => {
  const { state, dispatch } = useSymptomContext();

  const handleBack = () => {
    dispatch({ type: 'PREV_STEP' });
  };

  const handleNext = () => {
    dispatch({ type: 'NEXT_STEP' });
  };

  return (
    <div className="flex justify-between mt-12">
      {state.currentStep > 1 ? (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleBack}
          className="px-6 py-3 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200"
        >
          ← Previous
        </motion.button>
      ) : (
        <div></div>
      )}

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleNext}
        disabled={!canProceed}
        className={`
          px-6 py-3 rounded-lg font-medium transition-all duration-200
          ${canProceed
            ? 'bg-primary-500 text-white hover:bg-primary-600 shadow-lg hover:shadow-xl'
            : 'bg-gray-200 text-gray-400 cursor-not-allowed dark:bg-gray-700 dark:text-gray-500'}
        `}
      >
        {state.currentStep === 7 ? 'Submit' : 'Continue →'}
      </motion.button>
    </div>
  );
};

export default NavigationButtons;
