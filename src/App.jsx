import React, { useState, useEffect } from 'react';
import { db, auth } from './utils/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, query, onSnapshot } from 'firebase/firestore';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards } from 'swiper/modules';
import { MessageCircle, LogOut, Heart } from 'lucide-react';

// Swiper Styles
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
      <div className="h-screen bg-[#4A0E0E] flex flex-col items-center justify-center text-[#D4AF37]">
        <div className="animate-bounce mb-4 text-4xl">❤️</div>
        <p className="font-bold tracking-widest">لوڈنگ ہو رہی ہے...</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto min-h-screen bg-[#FDF5F5] font-sans">
      {/* Header */}
      <div className="bg-[#4A0E0E] p-8 rounded-b-[50px] shadow-2xl flex justify-between items-center">
        <h1 className="text-[#D4AF37] text-2xl font-black italic">AZWAJ</h1>
        <div className="flex gap-4 text-[#D4AF37]">
          <Heart size={20} />
          <LogOut size={20} onClick={() => auth.signOut()} className="cursor-pointer" />
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 -mt-10">
        {profiles.length > 0 ? (
          <Swiper
            effect={'cards'}
            grabCursor={true}
            modules={[EffectCards]}
            className="w-full h-[480px]"
          >
            {profiles.map((p) => (
              <SwiperSlide key={p.id} className="bg-white rounded-[40px] shadow-2xl border-4 border-[#D4AF37]/10 overflow-hidden">
                <img src={p.img || 'https://via.placeholder.com/400x500'} className="h-3/4 w-full object-cover" alt={p.name} />
                <div className="p-6 text-center bg-white">
                  <h3 className="font-bold text-[#4A0E0E] text-xl">{p.name || 'نامعلوم'}</h3>
                  <p className="text-gray-400 text-sm mb-4">{p.city || 'پاکستان'}</p>
                  <button className="w-full bg-[#4A0E0E] text-[#D4AF37] py-3 rounded-2xl font-bold flex justify-center items-center gap-2 hover:opacity-90">
                    <MessageCircle size={18} /> رابطہ کریں
                  </button>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="bg-white p-12 rounded-[40px] text-center shadow-xl mt-20">
            <p className="text-gray-400">فی الحال کوئی پروفائل دستیاب نہیں ہے</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
