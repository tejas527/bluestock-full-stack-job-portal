import React from "react";
import { CgProfile } from "react-icons/cg"; 
import { IoPersonOutline } from "react-icons/io5";
import { FiGlobe } from "react-icons/fi";


const CompanyRegistrationLayout = ({ currentStep, children }) => {
    const progressPercentage = ((currentStep - 1) / 4) * 100;
    
    const tabs = [
        { name: "Company Info", step: 1, icon: <IoPersonOutline/> },
        { name: "Founding Info", step: 2, icon: <CgProfile/> },
        { name: "Social Media Profile", step: 3,icon:<FiGlobe/> },
        { name: "Contact", step: 4,icon:'@' },
    ];

  return (
    <div className="min-h-screen font-sans">
        <header className="">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="w-full py-5 px-20 flex items-center justify-between">
                    <div className="flex items-center">
                         <ion-icon color="primary" size="large" name="briefcase-outline"></ion-icon>
                         <span className="ml-3 text-2xl font-bold text-gray-800">Jobpilot</span>
                    </div>
                    <div className="w-1/4 mr-5">
                        <div className="flex justify-between items-center mb-1">
                            <span className="text-sm font-medium text-gray-400">Setup Progress</span>
                            <span className="text-sm font-bold text-blue-500">{Math.round(progressPercentage)}% Completed</span>
                        </div>
                        <div className="w-full bg-blue-50 rounded-full h-2 mt-3">
                            <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${progressPercentage}%` }}></div>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
        
        <main className="max-w-4xl mx-auto py-2 px-4 sm:px-6 lg:px-8">
            {currentStep <= 4 && (
                <div className="mb-0 border-b border-gray-300 px-2 mx-[30px]">
                    <div className="flex space-x-8">
                        {tabs.map((tab,index) => (
                             <button 
                                key={tab.name} 
                                className={
                                  `flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm  
                                  ${currentStep === tab.step ? 
                                  'border-blue-500 text-blue-600' 
                                  : 
                                  'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                  } ${index === 0 ? 'ml-20' : ''}`
                                }
                              >
                                <span className="text-lg">{tab.icon}</span>
                                {tab.name}
                            </button>
                        ))}
                    </div>
                </div>
            )}
            {children}
        </main>
    </div>
  );
};


export default CompanyRegistrationLayout;
