import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';

interface DashboardProps {
  data: { district: string; count: number }[];
  onBack: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ data, onBack }) => {
  return (
    <motion.div
      key="dashboard"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center min-h-[calc(100vh-100px)] p-6"
    >
      <button onClick={onBack} className="self-start p-4 hover:bg-white/5 rounded-full"><ArrowLeft /></button>
      <h2 className="text-2xl font-bold mb-8 text-[#c5a059]">District Participation</h2>
      <div className="w-full max-w-md space-y-2">
        {data.map(d => (
          <div key={d.district} className="flex justify-between items-center py-3 border-b border-white/5">
            <span className="text-sm">{d.district}</span>
            <span className="text-sm font-mono text-[#c5a059]">{d.count}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};
