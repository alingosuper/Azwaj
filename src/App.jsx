import React, { useState, useEffect } from 'react';
import { db, auth } from './utils/firebase';
import { collection, query, onSnapshot } from 'firebase/firestore';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards } from 'swiper/modules';
import { Search, Heart, LogOut, CheckCircle, BrainCircuit, MessageSquare, Briefcase, MapPin, TreeDeciduous } from 'lucide-react';

// Swiper standard CSS
import 'swiper/css';
import 'swiper/css/effect-cards';

const App = () => {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // فائر بیس سے ڈیٹا لینا
    const q = query(collection(db, "profiles"));
    const unsubscribe = onSnapshot(q, (snap) => {
      const data = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProfiles(data);
      setLoading(false);
    }, (error) => {
      console.error("Firebase Error:", error);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="h-screen bg-[#4A0E0E] flex flex-col items-center justify-center text-[#D4AF37] font-sans">
        <div className="animate-spin mb-4 text-4xl">❤️</div>
        <p className="font-black text-xl tracking-widest">LOADING...</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto min-h-screen bg-[#FDF5F5] font-sans text-gray-800 pb-20">
      
      {/* --- HEADER --- */}
      <div className="bg-[#4A0E0E] p-8 pb-16 rounded-b-[60px] shadow-2xl relative border-b-4 border-[#D4AF37]">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <Heart className="text-[#D4AF37]" fill="#D4AF37" size={30} />
            <h1 className="text-[#D4AF37] text-3xl font-black italic tracking-tighter">AZWAJ</h1>
          </div>
          <div className="flex gap-4 text-[#D4AF37]">
            <LogOut size={24} onClick={() => auth.signOut()} className="cursor-pointer hover:scale-110" />
          </div>
        </div>
        
        {/* Search Bar */}
        <div className="relative mt-8">
          <input 
            type="text" 
            placeholder="Search verified matches..." 
            className="w-full p-4 pl-12 rounded-full bg-white/10 border border-[#D4AF37]/30 text-[#FDF5F5] placeholder:text-[#FDF5F5]/60 focus:ring-2 focus:ring-[#D4AF37] outline-none"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#D4AF37]" size={20} />
        </div>
      </div>

      {/* --- SWIPER CARDS (The main focus) --- */}
      <div className="px-6 -mt-10">
        {profiles.length > 0 ? (
          <Swiper
            effect={'cards'}
            grabCursor={true}
            modules={[EffectCards]}
            className="w-full h-[520px]"
          >
            {profiles.map((p) => (
              <SwiperSlide key={p.id} className="bg-white rounded-[50px] shadow-2xl border-2 border-[#D4AF37]/10 overflow-hidden relative">
                
                {/* Profile Image & Shajra Badge */}
                <div className="relative h-3/5 w-full">
                  <img 
                    src={p.img || 'https://images.unsplash.com/photo-1518171120140-6f781561730d?q=80&w=400'} 
                    className="h-full w-full object-cover" 
                    alt={p.name} 
                  />
                  {/* Verified Badge overlay */}
                  <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-md p-3 rounded-2xl flex items-center gap-2 border border-white/30">
                    <TreeDeciduous className="text-[#D4AF37]" size={24} />
                    <span className="text-white text-xs font-bold leading-tight">شجرہ<br/>تصدیق شدہ</span>
                  </div>
                  {/* Heart button */}
                  <div className="absolute top-4 right-4 bg-white p-3 rounded-full shadow-lg cursor-pointer">
                    <Heart className="text-[#A52A2A]" size={20} />
                  </div>
                </div>

                {/* Profile Details */}
                <div className="p-8 text-right bg-white relative">
                  <div className="flex justify-between items-center mb-4">
                     <CheckCircle className="text-green-500" size={24} fill="#FDF5F5"/>
                     <h3 className="font-extrabold text-[#4A0E0E] text-2xl tracking-tight">{p.name || 'نامعلوم'}</h3>
                  </div>
                  
                  {/* Info Grid */}
                  <div className="grid grid-cols-2 gap-x-4 gap-y-3 mb-6">
                    <div className="flex items-center gap-2 text-sm">
                       <Briefcase className="text-[#D4AF37]" size={16}/> {p.profession || 'ڈاکٹر'}
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                       <BrainCircuit className="text-[#D4AF37]" size={16}/> {p.age || '28'} سال
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                       <MapPin className="text-[#D4AF37]" size={16}/> {p.city || 'لاہور'}
                    </div>
                  </div>

                  {/* Contact Buttons */}
                  <div className="flex gap-4">
                    <button className="flex-1 bg-[#4A0E0E] text-[#D4AF37] py-4 rounded-3xl font-bold flex justify-center items-center gap-2 hover:opacity-90 transition-all">
                      <MessageSquare size={18} /> رابطہ کریں
                    </button>
                    <button className="flex-1 bg-white text-[#4A0E0E] border-2 border-[#4A0E0E] py-4 rounded-3xl font-bold flex justify-center items-center gap-2 hover:bg-gray-50">
                      <TreeDeciduous size={18} /> شجرہ دیکھیں
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="bg-white p-12 rounded-[50px] text-center shadow-xl mt-20 border-t-4 border-[#D4AF37]">
            <Heart className="mx-auto text-gray-300 mb-6" size={60} />
            <p className="text-gray-400 font-bold">فی الحال کوئی پروفائل دستیاب نہیں ہے</p>
            <p className="text-gray-300 text-sm mt-2">براہِ کرم فائر بیس میں ڈیٹا شامل کریں</p>
          </div>
        )}
      </div>

      {/* --- FIXED BOTTOM NAVIGATION (Tailwind style) --- */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white p-4 flex justify-around items-center rounded-t-3xl shadow-2xl border-t border-gray-100 z-50">
         <Heart className="text-gray-400" size={24}/>
         <Search className="text-[#D4AF37]" size={24}/>
         <MessageSquare className="text-gray-400" size={24}/>
         <LogOut className="text-gray-400" size={24}/>
      </div>
    </div>
  );
};

export default App;
