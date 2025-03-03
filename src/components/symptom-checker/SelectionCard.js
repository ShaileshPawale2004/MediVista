import React from 'react';
import { motion } from 'framer-motion';

const SelectionCard = ({ selected, onClick, icon, label, className = '' }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`w-full p-6 rounded-xl text-center transition-all duration-200 ${
        selected
          ? 'bg-primary-500 text-white shadow-lg'
          : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 shadow-soft-md'
      } ${className}`}
    >
      <div className="flex flex-col items-center space-y-3">
        <span className="text-4xl">{icon}</span>
        <span className="font-medium">{label}</span>
      </div>
    </motion.button>
  );
};

export default SelectionCard;
