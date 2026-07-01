import React from 'react';

const Watermark = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        <img
          src="/ashoklogo.png"
          alt="Ashok Security Services"
          className="w-[600px] h-[600px] sm:w-[700px] sm:h-[700px] md:w-[800px] md:h-[800px] lg:w-[900px] lg:h-[900px] xl:w-[1200px] xl:h-[1200px] opacity-[0.15] select-none"
          draggable={false}
        />
      </div>
    </div>
  );
};

export default Watermark;