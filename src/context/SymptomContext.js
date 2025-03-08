import React, { createContext, useContext, useReducer } from 'react';

const SymptomContext = createContext();

const initialState = {
  gender: '',
  ageGroup: '',
  bodyPart: '',
  duration: '',
  severity: 0,
  allergies: [],
  currentStep: 1
};

function symptomReducer(state, action) {
  switch (action.type) {
    case 'SET_GENDER':
      return { ...state, gender: action.payload };
    case 'SET_AGE_GROUP':
      return { ...state, ageGroup: action.payload };
    case 'SET_BODY_PART':
      return { ...state, bodyPart: action.payload };
    case 'SET_DURATION':
      return { ...state, duration: action.payload };
    case 'SET_SEVERITY':
      return { ...state, severity: action.payload };
    case 'TOGGLE_ALLERGY':
      const allergies = state.allergies.includes(action.payload)
        ? state.allergies.filter(a => a !== action.payload)
        : [...state.allergies, action.payload];
      return { ...state, allergies };
    case 'NEXT_STEP':
      return { ...state, currentStep: state.currentStep + 1 };
    case 'PREV_STEP':
      return { ...state, currentStep: Math.max(1, state.currentStep - 1) };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

export function SymptomProvider({ children }) {
  const [state, dispatch] = useReducer(symptomReducer, initialState);

  return (
    <SymptomContext.Provider value={{ state, dispatch }}>
      {children}
    </SymptomContext.Provider>
  );
}

export function useSymptomContext() {
  const context = useContext(SymptomContext);
  if (!context) {
    throw new Error('useSymptomContext must be used within a SymptomProvider');
  }
  return context;
}
