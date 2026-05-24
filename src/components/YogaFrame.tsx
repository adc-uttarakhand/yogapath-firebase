import React from 'react';

interface YogaFrameProps {
  orientation: 'portrait' | 'landscape';
  quote: string;
  name: string;
  designation: string;
  district: string;
}

export const YogaFrame: React.FC<YogaFrameProps> = ({ orientation, quote, name, designation, district }) => {
  return (
    <div className={`aspect-[${orientation === 'portrait' ? '3/4' : '4/3'}] w-full max-w-sm bg-[#8b2626] rounded-3xl p-6 flex flex-col justify-between border-4 border-white/10`}>
      <div className="text-right opacity-70">
        <span className="text-[10px] font-bold">AYUSH Uttarakhand</span>
      </div>
      <div className="text-center italic text-[#c5a059]">
        "{quote}"
      </div>
      <div className="text-[10px] opacity-70">
        {name} | {designation} | {district}
      </div>
    </div>
  );
};
