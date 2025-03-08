import React from 'react';
import { motion } from 'framer-motion';

const steps = [
  { id: 1, label: 'Gender' },
  { id: 2, label: 'Age' },
  { id: 3, label: 'Body Part' },
  { id: 4, label: 'Duration' },
  { id: 5, label: 'Allergies' },
  { id: 6, label: 'Summary' },
];

const StepIndicator = ({ currentStep }) => {
  return (
    <div className="w-full">
      <div className="flex justify-between items-center">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            {/* Step Circle */}
            <div className="flex flex-col items-center relative">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ 
                  scale: currentStep >= step.id ? 1 : 0.8,
                  opacity: 1 
                }}
                transition={{ duration: 0.3 }}
                className={`
                  w-10 h-10 rounded-full flex items-center justify-center
                  transition-all duration-300 font-semibold text-sm
                  ${currentStep > step.id 
                    ? 'bg-primary-500 text-white' 
                    : currentStep === step.id
                    ? 'bg-primary-500 text-white ring-4 ring-primary-100 dark:ring-primary-900'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400'}
                `}
              >
                {currentStep > step.id ? '✓' : step.id}
              </motion.div>
              
              {/* Step Label */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className={`
                  absolute -bottom-6 text-xs font-medium whitespace-nowrap
                  ${currentStep >= step.id 
                    ? 'text-primary-600 dark:text-primary-400' 
                    : 'text-gray-500 dark:text-gray-400'}
                `}
              >
                {step.label}
              </motion.div>
            </div>

            {/* Connector Line */}
            {index < steps.length - 1 && (
              <div className="flex-1 mx-2">
                <div className="h-[2px] relative">
                  <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700"></div>
                  <motion.div
                    initial={{ width: '0%' }}
                    animate={{ 
                      width: currentStep > step.id ? '100%' : '0%' 
                    }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 bg-primary-500 origin-left"
                  ></motion.div>
                </div>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default StepIndicator;
