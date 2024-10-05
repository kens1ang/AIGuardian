import React from 'react';

const AIEngineSection = () => {
  return (
    <div className="grid grid-cols-8 gap-y-16">
      <div className="col-span-1"></div>
<div className="border-l-2 border-gray-400 border-dashed px-4 flex flex-col gap-12 col-span-7">
      <div className="flex justify-between items-center">
        <div className="w-1/2 pr-8">
          <h3 className="text-4xl mb-4 font-neue-machina font-light uppercase">Creating a safe environment online.</h3>
          <p className="mb-4 font-light font-neue-machina">Using a well-trained AI model, we can detect and cancel out deepfakes and AI-generated content. Enable your users to feel safe and secure when using your application.</p>
        </div>
        <div className="w-1/2">
          {/* Add your code visualization component here */}
          <div className="bg-gray-800 p-4 rounded-lg">
            {/* Placeholder for code visualization */}
            <div className="h-64 bg-gray-700 rounded-lg"></div>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div className="w-1/2 pr-8">
          <h3 className="text-4xl mb-4 font-neue-machina font-light uppercase">Creating a safe environment online.</h3>
          <p className="mb-4 font-light font-neue-machina">Using a well-trained AI model, we can detect and cancel out deepfakes and AI-generated content. Enable your users to feel safe and secure when using your application.</p>
        </div>
        <div className="w-1/2">
          {/* Add your code visualization component here */}
          <div className="bg-gray-800 p-4 rounded-lg">
            {/* Placeholder for code visualization */}
            <div className="h-64 bg-gray-700 rounded-lg"></div>
          </div>
        </div>
      </div>
      <a href="#" className="bg-orange-300 text-black px-8 py-4 rounded-sm hover:underline w-fit">Try it now</a>
    </div>
    </div>
    
    
  );
};

export default AIEngineSection;