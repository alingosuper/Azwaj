import React, { useState, useEffect } from 'react';
import { db, auth } from './utils/firebase';
import { onAuthStateChanged, signInAnonymously } from 'firebase/auth';
import { collection, query, onSnapshot } from 'firebase/firestore';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards } from 'swiper/modules';
import { Search, Heart, LogOut, CheckCircle, MessageSquare, Briefcase, MapPin, TreeDeciduous, User, Home } from 'lucide-react';

import 'swiper/css';
import 'swiper/css/effect-cards';

const App = () => {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (!currentUser) {
        signInAnonymously(auth).catch(err => console.error("Auth Error:", err));
      }
    });

    const q = query(collection(db, "profiles"));
    const unsubscribeData = onSnapshot(q, (snap) => {
      setProfiles(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    });

    return () => { unsubscribeAuth(); unsubscribeData(); };
  }, []);

  if (loading) return (
    <div className="h-screen bg-[#4A0E0E] flex flex-col items-center justify-center text-[#D4AF37]">
      <div className="animate-bounce text-5xl mb-4">❤️</div>
      <p className="font-bold tracking-[0.2em]">AZWAJ IS LOADING...</p>
    </div>
  );

  return (
    <div className="max-w-md mx-auto min-h-screen bg-[#FDF5F5] pb-24 relative overflow-hidden">
      
      {/* --- PREMIUM HEADER --- */}
      <div className="bg-[#4A0E0E] p-8 pb-20 rounded-b-[60px] shadow-2xl relative border-b-4 border-[#D4AF37]">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-[#D4AF37] p-1 rounded-lg"><Heart className="text-[#4A0E0E]" size={24} fill="currentColor"/></div>
            <h1 className="text-[#D4AF37] text-2xl font-black italic">AZWAJ</h1>
          </div>
          <div className="flex items-center gap-4">
             <div className="relative"><MessageSquare className="text-[#D4AF37]" size={24}/><span className="absolute -top-1 -right-1 bg-red-500 text-[8px] text-white px-1 rounded-full">2</span></div>
             <User className="text-[#D4AF37]" size={24} />
          </div>
        </div>
        <div className="mt-8 text-[#D4AF37]/80 text-sm font-medium">اسلام علیکم! آپ کے لیے بہترین رشتے حاضر ہیں</div>
      </div>

      {/* --- SWIPER SECTION --- */}
      <div className="px-6 -mt-12">
        <Swiper effect={'cards'} grabCursor={true} modules={[EffectCards]} className="w-full h-[540px]">
          {profiles.length > 0 ? profiles.map((p) => (
            <SwiperSlide key={p.id} className="bg-white rounded-[50px] shadow-2xl overflow-hidden border border-gray-100">
              <div className="relative h-2/3">
                <img src={p.img || 'https://via.placeholder.com/400x600'} className="h-full w-full object-cover" />
                <div className="absolute top-4 left-4 bg-black/30 backdrop-blur-md p-2 rounded-2xl flex items-center gap-2 border border-white/20">
                  <TreeDeciduous className="text-[#D4AF37]" size={20} />
                  <span className="text-white text-[10px] font-bold">شجرہ تصدیق شدہ</span>
                </div>
              </div>
              <div className="p-6 text-right">
                <div className="flex justify-between items-center mb-4">
                   <div className="bg-green-100 p-1 rounded-full"><CheckCircle className="text-green-600" size={16}/></div>
                   <h3 className="font-extrabold text-[#4A0E0E] text-xl">{p.name}</h3>
                </div>
                <div className="flex flex-wrap gap-4 justify-end text-xs text-gray-500 mb-6">
                  <span className="flex items-center gap-1"><MapPin size={14} className="text-[#D4AF37]"/> {p.city}</span>
                  <span className="flex items-center gap-1"><Briefcase size={14} className="text-[#D4AF37]"/> {p.profession}</span>
                  <span className="flex items-center gap-1"><User size={14} className="text-[#D4AF37]"/> {p.age} سال</span>
                </div>
                <button className="w-full bg-[#4A0E0E] text-[#D4AF37] py-4 rounded-3xl font-black text-sm shadow-xl active:scale-95 transition-all">CONNECT NOW</button>
              </div>
            </SwiperSlide>
          )) : (
            <div className="h-full bg-white rounded-[50px] flex items-center justify-center text-gray-400 font-bold p-10 text-center">
              فائر بیس میں پروفائلز لوڈ کریں تاکہ یہاں کارڈز نظر آئیں
            </div>
          )}
        </Swiper>
      </div>

      {/* --- BOTTOM NAV --- */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-md bg-[#4A0E0E] p-4 flex justify-around items-center rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-[#D4AF37]/30 z-[100]">
         <Home className="text-[#D4AF37]" size={22}/>
         <Search className="text-[#D4AF37]/50" size={22}/>
         <div className="bg-[#D4AF37] p-3 rounded-full -mt-12 shadow-lg border-4 border-[#FDF5F5]"><Heart className="text-[#4A0E0E]" size={28} fill="currentColor"/></div>
         <MessageSquare className="text-[#D4AF37]/50" size={22}/>
         <User className="text-[#D4AF37]/50" size={22}/>
      </div>
    </div>
  );
};

export default App;
