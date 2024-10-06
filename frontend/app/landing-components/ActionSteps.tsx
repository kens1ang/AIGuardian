import React, { useRef, useState, useEffect } from "react";

const ActionSteps = () => {
  const video1Ref = useRef<HTMLVideoElement>(null);
  const [activeVideoSrc, setActiveVideoSrc] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Update the state to indicate that we are in the client environment
  }, []);

  const handleVideoClick = (videoSrc: string) => {
    setActiveVideoSrc(videoSrc);
  };

  const handleCloseModal = () => {
    setActiveVideoSrc(null);
  };

  return (
    <div className="grid grid-cols-8">
      <div className="flex justify-end col-span-1 mb-10">
        <span className="rounded-full bg-orange-300 text-black w-16 h-16 mr-5 mt-5 flex justify-center items-center text-4xl font-neue-machina font-light uppercase ">
          1
        </span>
      </div>
      <div className="flex flex-col md:flex-row justify-between items-center col-span-7 border-l-2 border-gray-400 border-dashed pl-5 pb-10 w-full">
        <div className="w-full sm:w-3/4 md:w-1/2 pr-8">
          <h3 className="text-4xl mb-4 font-neue-machina font-light uppercase ">
            Upload your video.
          </h3>
          <p className="mb-4 font-light font-neue-machina">
            Using a well-trained AI model, we can detect and cancel out
            deepfakes and AI-generated content. In this step, you will have to
            confirm your worldID, then upload your video. The model will check
            the authenticity of the video.
          </p>
        </div>
        <div className="w-full sm:w-3/4 md:w-1/2">
          {/* Add your code visualization component here */}
          <div className="bg-gray-800 p-4 rounded-lg">
            {/* Placeholder for code visualization */}
            <div
              className="h-64 bg-gray-700 rounded-lg cursor-pointer"
              onClick={() => handleVideoClick("/assets/videos/posting.mp4")}
            >
              {isClient && (
                <video
                  ref={video1Ref}
                  src="/assets/videos/posting.mp4"
                  className="w-full h-full object-cover p-4"
                  autoPlay
                  loop
                  muted
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end col-span-1 mb-10">
        <span className="rounded-full bg-orange-300 text-black w-16 h-16 mr-5 mt-5 flex justify-center items-center text-4xl font-neue-machina font-light uppercase">
          2
        </span>
      </div>
      <div className="flex flex-col md:flex-row justify-between items-center col-span-7 border-l-2 border-gray-400 border-dashed pl-5 pb-10">
        <div className="w-full sm:w-3/4 md:w-1/2 pr-8">
          <h3 className="text-2xl sm:text-4xl mb-4 font-neue-machina font-light uppercase">
            Video hashing timestamps.
          </h3>
          <p className="mb-4 font-light font-neue-machina">
            By leveraging blockchain technology, we can create a unique hash for
            each video. This hash is a unique identifier for the video and can
            be used to verify the authenticity of the video. Similar videos of
            later blockheight will be detected, or can be reported.
          </p>
        </div>
        <div className="w-full sm:w-3/4 md:w-1/2">
          {/* Add your code visualization component here */}
          <div className="bg-gray-800 p-4 rounded-lg">
            {/* Placeholder for code visualization */}
            <div className="h-64 bg-gray-700 rounded-lg"></div>
          </div>
        </div>
      </div>
      <div className="flex justify-end col-span-1 mb-10">
        <span className="rounded-full bg-orange-300 text-black w-16 h-16 mr-5 mt-5 flex justify-center items-center text-4xl font-neue-machina font-light uppercase">
          3
        </span>
      </div>
      <div className="flex flex-col md:flex-row justify-between items-center col-span-7 border-l-2 border-gray-400 border-dashed pl-5 pb-10">
        <div className="w-full sm:w-3/4 md:w-1/2 pr-8">
          <h3 className="text-2xl sm:text-4xl sm:text-8xlmb-4 font-neue-machina font-light uppercase">
            Entirely humanless.
          </h3>
          <p className="mb-4 font-light font-neue-machina">
            All the processing is done on the blockchain, so you don&apos;t need
            to worry about the human factor. The model is trained on a large
            dataset of videos and is able to detect and cancel out deepfakes and
            AI-generated content.
          </p>
        </div>
        <div className="w-full sm:w-3/4 md:w-1/2">
          {/* Add your code visualization component here */}
          <div className="bg-gray-800 p-4 rounded-lg">
            {/* Placeholder for code visualization */}
            <div className="h-64 bg-gray-700 rounded-lg"></div>
          </div>
        </div>
      </div>
      <div className="flex justify-end col-span-1 mb-10"></div>
      <a
        href="#"
        className="bg-orange-300 text-black px-7 py-4 rounded-sm hover:underline w-[150px] mt-10 font-neue-machina font-light"
      >
        Try it now
      </a>

      {/* Video Pop-up Modal */}
      {activeVideoSrc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
          <div className="relative bg-black p-6 rounded-lg shadow-lg">
            <button
              onClick={handleCloseModal}
              className="absolute top-2 right-2 text-white text-2xl"
            >
              &times;
            </button>
            <video
              src={activeVideoSrc}
              className="w-full h-full max-w-4xl"
              controls
              autoPlay
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ActionSteps;
