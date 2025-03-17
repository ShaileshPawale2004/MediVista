import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSymptomContext } from '../context/SymptomContext';
import { generatePDF } from '../utils/pdfGenerator';
import male from "../assets/images/Male.jpeg"
import female from "../assets/images/Female.jpeg"
import youngMale from "../assets/images/School Boy.jpeg"
import youngFemale from "../assets/images/School Girl.jpeg"
import adultMale from "../assets/images/Adult Boy.jpeg"
import adultFemale from "../assets/images/Adult Girl.jpeg"
import seniorUncle from "../assets/images/Old Uncle.jpeg"
import seniorAunty from "../assets/images/Old Aunty.jpeg"
import head from "../assets/images/Head.jpeg"
import chest from "../assets/images/Chest.jpeg"
import stomachMale from "../assets/images/Male Stomach.jpeg"
import stomachFemale from "../assets/images/Female Stomach.jpeg"
import arms from "../assets/images/Arm.jpeg"
import legs from "../assets/images/Leg.jpeg"
import eye from "../assets/images/Eye.jpeg"
import dust from "../assets/images/Dust.jpeg"
import pollen from "../assets/images/Pollen.jpeg"
import medication from "../assets/images/Medicine.jpeg"
import food from "../assets/images/Food.jpeg"
import pets from "../assets/images/Pet.jpeg"

function Report() {
  const { state } = useSymptomContext();
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownloadPDF = async () => {
    setIsGenerating(true);
    const success = await generatePDF('report-content', 'health-report.pdf');
    setIsGenerating(false);
    
    if (success) {
      // Show success message or handle accordingly
    } else {
      // Show error message
    }
  };

  const getSeverityColor = (severity) => {
    if (severity <= 3) return 'bg-green-100 text-green-800';
    if (severity <= 7) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  const formatDate = (date) => {
    return new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleGender = () => (state.gender === "male" ? male : female);

  const handleAge = ()=>{
    if(state.gender==="male"){
      if(state.ageGroup==="young") return youngMale;
      else if(state.ageGroup==="adult") return adultMale;
      else return seniorUncle;
    } else{
      if(state.ageGroup==="young") return youngFemale;
      else if(state.ageGroup==="adult") return adultFemale;
      else return seniorAunty;
    }
  }
  
  const handleAffectedBodyPart = () => {
    const bodyPartImages = { head, chest, stomach: state.gender === "male" ? stomachMale : stomachFemale, arms, legs, eye };
    return bodyPartImages[state.bodyPart] || "";
  };
  

  const allergyImages = {
    dust: dust,
    pollen: pollen,
    medication: medication,
    food: food,
    pets: pets
  };
  

  return (
    <div className="pt-20 min-h-screen bg-background-light">
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div id="report-content" className="bg-white rounded-lg shadow-md p-8">
          {/* Header */}
          <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-primary">MediVista</h1>
          <p className="text-gray-600 text-lg">Your Personalized Health Report</p>
        </div>
          <div className="border-b pb-6 mb-6">
            <div className="flex justify-between items-start mb-4">
              <h1 className="text-3xl font-bold text-primary">Health Report</h1>
              <span className="text-gray-500">{formatDate(new Date())}</span>
            </div>
            <p className="text-gray-600">
              This report is generated based on your symptom selections. Please consult with a healthcare professional for accurate diagnosis.
            </p>
          </div>

          {/* Personal Information */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-black">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-6 rounded-lg flex flex-col items-center text-center shadow-md">
                <img className="rounded-full h-24 w-24 mb-3 border-2 border-gray-300 shadow-sm" src={handleGender()} alt="Gender" />
                <span className="text-gray-500 text-sm uppercase tracking-wide font-semibold">Gender</span>
                <p className="font-medium text-lg capitalize text-gray-900 mt-1">{state.gender}</p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg flex flex-col items-center text-center shadow-md">
                <img className="rounded-full h-24 w-24 mb-3 border-2 border-gray-300 shadow-sm" src={handleAge()} alt="Age Group" />
                <span className="text-gray-500 text-sm uppercase tracking-wide font-semibold">Age Group</span>
                <p className="font-medium text-lg capitalize text-gray-900 mt-1">{state.ageGroup}</p>
              </div>
            </div>
          </div>

          {/* Symptom Details */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-black">Symptom Details</h2>
            <div className="space-y-4">
              <div className="bg-gray-50 p-6 rounded-lg flex flex-col items-center text-center shadow-md">
               <img className="rounded-full h-24 w-24 mb-3 border-2 border-gray-300 shadow-sm" src={handleAffectedBodyPart()} alt="Age Group" />
                <span className="text-gray-500 text-sm uppercase tracking-wide font-semibold">Affected Body Part</span>
                <p className="font-medium text-lg capitalize text-gray-900 mt-1">{state.bodyPart}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <span className="text-gray-600">Duration</span>
                <p className="font-medium mt-1 capitalize text-black">{state.duration}</p>
              </div>
            </div>
          </div>

          {/* Pain Assessment */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-black">Pain Assessment</h2>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="mb-4">
                <span className="text-gray-600">Severity Level</span>
                <div className="mt-2 flex items-center gap-4">
                  <div className="flex-1 bg-gray-200 h-4 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary"
                      style={{ width: `${(state.severity / 10) * 100}%` }}
                    ></div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm ${getSeverityColor(state.severity)}`}>
                    {state.severity}/10
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Allergies */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-black">Allergy Information</h2>
            <div className="bg-gray-50 p-6 rounded-lg shadow-md flex flex-wrap gap-4 justify-center">
              {state.allergies.length > 0 ? (
                state.allergies.map((allergy) => (
                  <div key={allergy} className="flex flex-col items-center text-center">
                    <img 
                      src={allergyImages[allergy]} 
                      alt={allergy} 
                      className="w-20 h-20 rounded-full border border-gray-300 shadow-sm"
                    />
                    <p className="text-gray-700 mt-2">{allergy}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-600">No allergies reported</p>
              )}
            </div>
         </div>
          {/* Disclaimer */}
          <div className="text-sm text-gray-500 border-t pt-6 mt-8">
            <p>
              Disclaimer: This report is generated based on the symptoms you've selected and should not be considered as a medical diagnosis. 
              Please consult with a qualified healthcare professional for proper medical advice and treatment.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <button
            onClick={handleDownloadPDF}
            disabled={isGenerating}
            className={`flex-1 btn-primary flex items-center justify-center gap-2 ${
              isGenerating ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isGenerating ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generating PDF...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download Report
              </>
            )}
          </button>
          <Link
            to="/clinics"
            className="flex-1 bg-gray-100 text-gray-700 px-6 py-3 rounded-full hover:bg-gray-200 transition-colors duration-300 text-center"
          >
            Find Nearby Clinics
          </Link>
          <Link
            to="/symptom-checker"
            className="flex-1 border border-primary text-primary px-6 py-3 rounded-full hover:bg-primary/5 transition-colors duration-300 text-center"
          >
            Start New Check
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Report;
