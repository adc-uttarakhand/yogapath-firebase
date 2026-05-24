import React from 'react';

interface YogaFrameProps {
  orientation: 'portrait' | 'landscape';
  quote: string;
  name: string;
  designation: string;
  district: string;
  mediaUrl?: string;
  mediaType?: 'photo' | 'video';
}

export const YogaFrame: React.FC<YogaFrameProps> = ({ orientation, quote, name, designation, district, mediaUrl, mediaType }) => {
  return (
    <div 
      style={{ aspectRatio: orientation === 'portrait' ? '3/4' : '4/3' }}
      className="w-full max-w-sm bg-[#8b2626] rounded-3xl p-6 flex flex-col justify-between border-4 border-white/10 relative overflow-hidden"
    >
      {mediaUrl && (
        <div className="absolute inset-0 z-0">
          {mediaType === 'photo' ? (
            <img src={mediaUrl} alt="Yoga pose" className="w-full h-full object-cover opacity-60" />
          ) : (
            <video src={mediaUrl} autoPlay loop muted className="w-full h-full object-cover opacity-60" />
          )}
        </div>
      )}
      <div className="relative z-10 flex flex-col justify-between h-full">
        <div className="text-right opacity-70">
          <span className="text-[10px] font-bold">AYUSH Uttarakhand</span>
        </div>
        <div className="text-center italic text-[#c5a059] font-bold text-shadow-sm">
          "{quote}"
        </div>
        <div className="text-[10px] bg-black/30 p-2 rounded text-white backdrop-blur-sm">
          {name} | {designation} | {district}
        </div>
      </div>
    </div>
  );
};
