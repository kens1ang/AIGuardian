import React from 'react';

const MonitoringSection = () => {
  return (
    <div className="flex justify-between items-center border-[8px] border-gray-400 border-dashed rounded-xl p-24">
      <div className="w-1/2 pr-12">
        <h3 className="text-4xl mb-4 font-neue-machina font-light uppercase">Report suspicious activity.</h3>
        <p className="mb-4 font-light font-neue-machina">Add a script tag to your local development, staging, and preview URL environments to record sessions. Optional: record production sessions too for additional coverage.</p>
        <a href="#" className="text-orange-300 hover:underline">Learn More</a>
      </div>
      <div className="w-1/2">
        {/* Add your visualization component here */}
        <div className="bg-gray-800 p-4 rounded-lg">
          {/* Placeholder for visualization */}
          <div className="h-64 bg-gray-700 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
};

export default MonitoringSection;