import React, { useRef, useState, useEffect } from 'react';

const AIEngineSection = () => {
  const video1Ref = useRef<HTMLVideoElement>(null);
  const video2Ref = useRef<HTMLVideoElement>(null);
  const [activeVideoSrc, setActiveVideoSrc] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false); // State to track client-side rendering

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
    <div className="grid grid-cols-8 gap-y-16">
      <div className="col-span-1"></div>
      <div className="border-l-2 border-gray-400 border-dashed px-4 flex flex-col gap-12 col-span-7">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="w-full sm:w-3/4 md:w-1/2 pr-8">
            <h3 className="text-2xl sm:text-4xl mb-4 font-neue-machina font-light uppercase">Creating a safe environment online.</h3>
            <p className="mb-4 font-light font-neue-machina">
              Leveraging the power of Worldcoin's WLD token, we can detect and cancel out bots and non-organic users. Enable your users to feel safe and secure when using your application.
            </p>
          </div>
          <div className="w-full sm:w-3/4 md:w-1/2">
            <div className="bg-gray-800 p-4 rounded-lg cursor-pointer" onClick={() => handleVideoClick("/assets/videos/vid1.mp4")}>
              <div className="h-64 bg-gray-700 rounded-lg border-2 border-gray-400 border-dashed">
                {isClient && (
                  <video
                    ref={video1Ref}
                    src="/assets/videos/vid1.mp4"
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

        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="w-full sm:w-3/4 md:w-1/2 pr-8">
            <h3 className="text-4xl mb-4 font-neue-machina font-light uppercase">Fully onchain AI detection.</h3>
            <p className="mb-4 font-light font-neue-machina">
              Using a well-trained AI model deployed fully on the Internet Computer blockchain, we can detect and cancel out deepfakes and AI-generated content. Enable your users to feel safe and secure when using your application.
            </p>
          </div>
          <div className="w-full sm:w-3/4 md:w-1/2">
            <div className="bg-gray-800 p-4 rounded-lg cursor-pointer" onClick={() => handleVideoClick("/assets/videos/vid2.mp4")}>
              <div className="h-64 bg-gray-700 rounded-lg border-2 border-gray-400 border-dashed">
                {isClient && (
                  <video
                    ref={video2Ref}
                    src="/assets/videos/vid2.mp4"
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

        <a href="#" className="bg-orange-300 text-black px-4 py-4 rounded-sm hover:underline w-fit font-neue-machina font-light">Try it now</a>
      </div>

      {/* Video Pop-up Modal */}
      {activeVideoSrc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
          <div className="relative bg-black p-6 rounded-lg shadow-lg">
            <button onClick={handleCloseModal} className="absolute top-2 right-2 text-white text-2xl">
              &times;
            </button>
            <video src={activeVideoSrc} className="w-full h-full max-w-4xl" controls autoPlay />
          </div>
        </div>
      )}
    </div>
  );
};

export default AIEngineSection;
