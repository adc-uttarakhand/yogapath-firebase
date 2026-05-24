/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, Video, ArrowLeft, Download, Share2, Info } from 'lucide-react';
import { addDoc, collection } from 'firebase/firestore';                
import { db } from './lib/firebase';

import { YogaFrame } from './components/YogaFrame';

const QUOTES = [
  "योग अपनाएं, जीवन को सुंदर बनाएं।",
  "चलो करें योग, दूर भगाएं रोग।",
  "स्वास्थ्य का एक ही राज़, योग हो हर दिन हमारे साथ।",
];

const DISTRICTS = [
  "Dehradun", "Nainital", "Haridwar", "Almora", "Pauri Garhwal", 
  "Tehri Garhwal", "Chamoli", "Rudraprayag", "Uttarkashi", 
  "Pithoragarh", "Champawat", "Bageshwar", "Udham Singh Nagar"
];

export default function App() {
  const [step, setStep] = useState<'landing' | 'camera' | 'preview'>('landing');
  const [name, setName] = useState('');
  const [designation, setDesignation] = useState('');
  const [district, setDistrict] = useState('');
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>('portrait');
  const [quote] = useState(QUOTES[Math.floor(Math.random() * QUOTES.length)]);

  const submitToDatabase = async (poseName: string, type: 'photo' | 'video') => {
    try {
      await addDoc(collection(db, 'submissions'), {
        userName: name,
        district: district,
        poseName: poseName,
        date: new Date().toISOString(),
        type: type,
      });
      console.log("Submission saved");
    } catch (error) {
      console.error("Error saving submission:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0c0b] text-[#e0e0e0] font-sans selection:bg-[#c5a059]">
      <header className="flex items-center justify-between px-10 py-6 border-b border-white/5">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-[#8b2626] rounded-full flex items-center justify-center border border-white/20">
            <span className="text-[10px] font-bold leading-none text-center">AYUSH<br/>UK</span>
          </div>
          <div>
            <h1 className="text-xl font-semibold tracking-tight">Yoga Studio <span className="text-[#c5a059] font-light italic">Uttarakhand</span></h1>
          </div>
        </div>
      </header>
      
      <AnimatePresence mode="wait">
        {step === 'landing' && (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center min-h-[calc(100vh-100px)] p-6"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-8 tracking-tighter">Yoga Path <span className="text-[#c5a059]">Uttarakhand</span></h1>
            <div className="w-full max-w-md space-y-4">
              <input type="text" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg p-4 focus:outline-none focus:border-[#c5a059]/50 transition-colors placeholder:opacity-30" />
              <input type="text" placeholder="Designation" value={designation} onChange={(e) => setDesignation(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg p-4 focus:outline-none focus:border-[#c5a059]/50 transition-colors placeholder:opacity-30" />
              <select value={district} onChange={(e) => setDistrict(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg p-4 focus:outline-none focus:border-[#c5a059]/50 transition-colors text-[#e0e0e0]">
                <option value="" disabled>Select District</option>
                {DISTRICTS.map((d) => <option key={d} value={d} className="bg-[#0a0c0b] text-[#e0e0e0]">{d}</option>)}
              </select>
              <button 
                onClick={() => setStep('camera')}
                disabled={!name || !district}
                className="w-full bg-[#8b2626] hover:bg-[#a12d2d] py-4 rounded-lg font-semibold transition disabled:bg-gray-800 disabled:opacity-50"
              >
                Start Yoga Journey
              </button>
            </div>
          </motion.div>
        )}

        {step === 'camera' && (
           <motion.div
            key="camera"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="flex flex-col items-center justify-center min-h-[calc(100vh-100px)] p-6"
          >
            <button onClick={() => setStep('landing')} className="self-start p-4 hover:bg-white/5 rounded-full"><ArrowLeft /></button>
            
            <div className="mb-6 flex gap-1 bg-white/5 p-1 rounded-full border border-white/10">
                <button onClick={() => setOrientation('portrait')} className={`px-6 py-1.5 rounded-full text-[10px] uppercase tracking-widest ${orientation === 'portrait' ? 'bg-[#c5a059] text-black font-bold' : 'hover:bg-white/5'}`}>Portrait</button>
                <button onClick={() => setOrientation('landscape')} className={`px-6 py-1.5 rounded-full text-[10px] uppercase tracking-widest ${orientation === 'landscape' ? 'bg-[#c5a059] text-black font-bold' : 'hover:bg-white/5'}`}>Landscape</button>
            </div>

            <div className="w-full max-w-lg aspect-[4/3] bg-white/5 rounded-3xl flex items-center justify-center border-2 border-dashed border-white/10">
                 <Camera size={48} className="text-[#c5a059]/50" />
                 <p className="ml-4 opacity-50">Camera/Video Preview</p>
            </div>
            
            <div className="mt-8 flex gap-4">
                 <button onClick={() => {submitToDatabase('Pose', 'photo'); setStep('preview');}} className="bg-white text-black p-6 rounded-full hover:scale-105 transition"><Camera /></button>
                 <button onClick={() => {submitToDatabase('Pose', 'video'); setStep('preview');}} className="bg-[#8b2626] text-white p-6 rounded-full hover:scale-105 transition"><Video /></button>
            </div>
          </motion.div>
        )}

        {step === 'preview' && (
           <motion.div
            key="preview"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="flex flex-col items-center justify-center min-h-[calc(100vh-100px)] p-6"
          >
             <YogaFrame orientation={orientation} quote={quote} name={name} designation={designation} district={district} />
             
             <div className="flex gap-4 mt-8">
                <button className="flex items-center gap-2 bg-[#c5a059] text-black px-6 py-3 rounded-full font-bold hover:bg-[#d4b069] transition"><Download size={20} /> Download</button>
                <button className="flex items-center gap-2 bg-white/5 px-6 py-3 rounded-full hover:bg-white/10 transition"><Share2 size={20} /> Share</button>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
