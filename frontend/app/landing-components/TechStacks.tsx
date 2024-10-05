import React from 'react';

const TechStacks = () => {
  return (
    <div className="flex flex-col items-center rounded-xl p-6 md:p-12">
      <h3 className="text-2xl md:text-3xl mb-6 font-neue-machina font-light uppercase text-center tracking-light">Powered by</h3>
      <div className="flex flex-wrap justify-center items-center gap-6 md:gap-12">
        <img src="/assets/wld-logo.jpg" alt="WorldCoin" className="h-20 md:h-32" />
        <img src="./assets/python.jpg" alt="Python" className="h-20 md:h-32" />
        <img src="./assets/IC_logo_horizontal_white.svg" alt="ic" className="w-48 md:w-64" />
        <img src="./assets/scroll.png" alt="scroll" className="h-20 md:h-32" />
        <img src="./assets/manta.png" alt="manta" className="w-48 md:w-64" />
      </div>
    </div>
  );
};

export default TechStacks;