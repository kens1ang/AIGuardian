import React, { useState, useRef, useEffect } from "react";

const MonitoringSection = () => {
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
    <div className="flex flex-col md:flex-row justify-between items-center border-[8px] border-gray-400 border-dashed rounded-xl p-14 sm:p-24 w-full">
      <div className="w-full sm:w-3/4 md:w-1/2 pr-12">
        <h3 className="text-4xl mb-4 font-neue-machina font-light uppercase">
          Report suspicious activity.
        </h3>
        <p className="mb-4 font-light font-neue-machina">
          Protect your data integrity and report users who post unauthentic
          content. Power to take down fake content IN YOUR OWN HANDS
        </p>
        <a href="#" className="text-orange-300 hover:underline">
          Learn More
        </a>
      </div>
      <div className="w-full sm:w-3/4 md:w-1/2">
        {/* Add your video as a placeholder */}
        <div className="bg-gray-800 p-4 rounded-lg">
          <div
            className="h-64 bg-gray-700 rounded-lg border-2 border-gray-400 border-dashed cursor-pointer"
            onClick={() => handleVideoClick("/assets/videos/reportvideo.mp4")}
          >
            {isClient && (
              <video
                ref={video1Ref}
                src="/assets/videos/reportvideo.mp4" // Path to your placeholder video
                className="w-full h-full object-cover"
                autoPlay
                loop
                muted
              />
            )}
          </div>
        </div>
      </div>

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

export default MonitoringSection;
