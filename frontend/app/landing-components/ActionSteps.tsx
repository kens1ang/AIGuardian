import React from 'react';

const ActionSteps = () => {
  return (
    
    <div className="grid grid-cols-8">
        <div className="flex justify-end col-span-1 mb-10">
            <span className="rounded-full bg-orange-300 text-black w-16 h-16 mr-5 mt-5 flex justify-center items-center text-4xl font-neue-machina font-light uppercase ">1</span>
        </div>
        <div className="flex justify-between items-center col-span-7 border-l-2 border-gray-400 border-dashed pl-5 pb-10">
            <div className="w-1/2 pr-8">
            <h3 className="text-4xl mb-4 font-neue-machina font-light uppercase">Upload your video.</h3>
            <p className="mb-4 font-light font-neue-machina">Using a well-trained AI model, we can detect and cancel out deepfakes and AI-generated content. In this step, you will have to confirm your worldID, then upload your video. The model will check the authenticity of the video.</p>
            </div>
            <div className="w-1/2">
                {/* Add your code visualization component here */}
                <div className="bg-gray-800 p-4 rounded-lg">
                    {/* Placeholder for code visualization */}
                    <div className="h-64 bg-gray-700 rounded-lg"></div>
                </div>
            </div>
        </div>
        <div className="flex justify-end col-span-1 mb-10">
            <span className="rounded-full bg-orange-300 text-black w-16 h-16 mr-5 mt-5 flex justify-center items-center text-4xl font-neue-machina font-light uppercase">2</span>
        </div>
        <div className="flex justify-between items-center col-span-7 border-l-2 border-gray-400 border-dashed pl-5 pb-10">
            <div className="w-1/2 pr-8">
            <h3 className="text-4xl mb-4 font-neue-machina font-light uppercase">Video hashing timestamps.</h3>
            <p className="mb-4 font-light font-neue-machina">By leveraging blockchain technology, we can create a unique hash for each video. This hash is a unique identifier for the video and can be used to verify the authenticity of the video. Similar videos of later blockheight will be detected, or can be reported.</p>
            </div>
            <div className="w-1/2">
                {/* Add your code visualization component here */}
                <div className="bg-gray-800 p-4 rounded-lg">
                    {/* Placeholder for code visualization */}
                    <div className="h-64 bg-gray-700 rounded-lg"></div>
                </div>
            </div>
        </div>
        <div className="flex justify-end col-span-1 mb-10">
            <span className="rounded-full bg-orange-300 text-black w-16 h-16 mr-5 mt-5 flex justify-center items-center text-4xl font-neue-machina font-light uppercase">3</span>
        </div>
        <div className="flex justify-between items-center col-span-7 border-l-2 border-gray-400 border-dashed pl-5 pb-10">
            <div className="w-1/2 pr-8">
            <h3 className="text-4xl mb-4 font-neue-machina font-light uppercase">Entirely humanless.</h3>
            <p className="mb-4 font-light font-neue-machina">All the processing is done on the blockchain, so you don&apos;t need to worry about the human factor. The model is trained on a large dataset of videos and is able to detect and cancel out deepfakes and AI-generated content.</p>
            </div>
            <div className="w-1/2">
                {/* Add your code visualization component here */}
                <div className="bg-gray-800 p-4 rounded-lg">
                    {/* Placeholder for code visualization */}
                    <div className="h-64 bg-gray-700 rounded-lg"></div>
                </div>
            </div>
        </div>
        <div className="flex justify-end col-span-1 mb-10"></div>
        <a href="#" className="bg-orange-300 text-black px-8 py-4 rounded-sm hover:underline w-fit mt-10">Try it now</a>
    </div>
   

    
    
  );
};

export default ActionSteps;