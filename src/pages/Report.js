import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSymptomContext } from '../context/SymptomContext';
import { generatePDF } from '../utils/pdfGenerator';

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

  return (
    <div className="pt-20 min-h-screen bg-background-light">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div id="report-content" className="bg-white rounded-lg shadow-md p-8">
          {/* Header */}
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
            <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <span className="text-gray-600">Gender</span>
                <p className="font-medium mt-1 capitalize">{state.gender}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <span className="text-gray-600">Age Group</span>
                <p className="font-medium mt-1 capitalize">{state.ageGroup}</p>
              </div>
            </div>
          </div>

          {/* Symptom Details */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Symptom Details</h2>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <span className="text-gray-600">Affected Body Part</span>
                <p className="font-medium mt-1 capitalize">{state.bodyPart}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <span className="text-gray-600">Symptom Type</span>
                <p className="font-medium mt-1 capitalize">{state.symptomType}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <span className="text-gray-600">Duration</span>
                <p className="font-medium mt-1 capitalize">{state.duration}</p>
              </div>
            </div>
          </div>

          {/* Pain Assessment */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Pain Assessment</h2>
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
            <h2 className="text-xl font-semibold mb-4">Allergy Information</h2>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex flex-wrap gap-2">
                {state.allergies.length > 0 ? (
                  state.allergies.map((allergy) => (
                    <span
                      key={allergy}
                      className="bg-primary/10 text-primary px-3 py-1 rounded-full"
                    >
                      {allergy}
                    </span>
                  ))
                ) : (
                  <p className="text-gray-600">No allergies reported</p>
                )}
              </div>
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
