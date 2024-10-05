import React from 'react';

const TechStacks = () => {
  return (
    <div className="flex justify-center items-center rounded-xl p-12">
        <h3 className="text-4xl mb-4 font-neue-machina font-light uppercase text-center tracking-light">Powered by</h3>
            <div className="flex flex-col items-center">
                <img src="/assets/wld-logo.avif" alt="WorldCoin" className="h-32" />
            </div>
            <div className="flex flex-col items-center">
                <img src="./assets/python.jpg" alt="Python" className="h-32" />
            </div>         
    </div>
  );
};

export default TechStacks;