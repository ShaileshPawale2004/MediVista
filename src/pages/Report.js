import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSymptomContext } from '../context/SymptomContext';
import { generatePDF,sharePDF } from '../utils/pdfGenerator';
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
import painSeverityRange from "../assets/images/PainParameter.jpg"


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


  const handleSharePDF = async () => {
    setIsGenerating(true);
    try {
      // Generate PDF as data URI
      const dataUri = await sharePDF('report-content', 'health-report.pdf', 'datauri');
      
      // Convert data URI to base64
      const base64Data = dataUri.split(',')[1];
      
      // Create a Blob from the base64 data
      const blob = new Blob([Uint8Array.from(atob(base64Data), c => c.charCodeAt(0))], { type: 'application/pdf' });
      
      // Create a File object from the Blob
      const file = new File([blob], 'health-report.pdf', { type: 'application/pdf' });

      // Check if Web Share API supports sharing files
      if (navigator.share && navigator.canShare({ files: [file] })) {
        try {
          await navigator.share({
            files: [file],
            title: 'MediVista Health Report',
            text: 'Here is my health report from MediVista'
          });
        } catch (error) {
          // Fallback to WhatsApp Web sharing
          const messageText = encodeURIComponent("Here's my health report from MediVista");
          window.open(`https://wa.me/?text=${messageText}`, '_blank');
          
          // Also trigger download
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'health-report.pdf';
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
        }
      } else {
        // Fallback for browsers that don't support Web Share API
        const messageText = encodeURIComponent("Here's my health report from MediVista");
        window.open(`https://wa.me/?text=${messageText}`, '_blank');
        
        // Also trigger download
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'health-report.pdf';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error('Error sharing PDF:', error);
    } finally {
      setIsGenerating(false);
    }
  };

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
            <h1 className="text-3xl font-bold text-black">Health Report</h1>
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
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download Report
              </>
            )}
          </button>
          {/* Update WhatsApp Share Button */}
          <button
            onClick={handleSharePDF}
            disabled={isGenerating}
            className="flex-1 bg-green-500 text-white px-6 py-3 rounded-full hover:bg-green-600 transition-colors duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isGenerating ? (
              <>
                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Preparing...
              </>
            ) : (
              <>
                <svg className="w-14 h-14" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                </svg>
                Share PDF on WhatsApp
              </>
            )}
          </button>
          <Link
            to="/suggestedclinics"
            className="flex items-center justify-center gap-2 flex-1 bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 transition-colors duration-300 text-center"
          >
            <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C8.134 2 5 5.134 5 9c0 4.418 4.701 10.479 6.489 12.847a1 1 0 0 0 1.622 0C14.299 19.479 19 13.418 19 9c0-3.866-3.134-7-7-7zm0 10.5A3.5 3.5 0 1 1 15.5 9 3.504 3.504 0 0 1 12 12.5z" />
            </svg>
            Our Suggestions
          </Link>


          <Link
            to="/symptom-checker"
            className="flex items-center justify-center gap-2 flex-1 bg-green-500 text-white px-6 py-3 rounded-full hover:bg-green-600 transition-colors duration-300 text-center"
          >
            <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 11h-6V5a1 1 0 0 0-2 0v6H5a1 1 0 0 0 0 2h6v6a1 1 0 0 0 2 0v-6h6a1 1 0 0 0 0-2z" />
            </svg>
            Start New Check
          </Link>

        </div>
      </div>
    </div>
  );
}

export default Report;
