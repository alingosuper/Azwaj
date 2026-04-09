import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { auth } from './utils/firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

// 1. برانڈڈ سپلیش سکرین (Using suplesh.JPG)
const Splash = ({ onFinish }) => {
  useEffect(() => {
    const timer = setTimeout(onFinish, 3000);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="h-screen bg-[#800000] flex flex-col items-center justify-center overflow-hidden">
      <div className="w-48 h-48 flex items-center justify-center">
        {/* آپ کی سپلیش امیج کا اصلی نام */}
        <img src="/images/suplesh.JPG" className="w-full h-full object-contain animate-pulse shadow-2xl rounded-3xl" alt="Azwaj Splash" />
      </div>
      <h1 className="mt-8 text-[#FFD700] text-5xl font-black tracking-[10px] italic drop-shadow-2xl">AZWAJ</h1>
    </div>
  );
};

// 2. برانڈڈ لاگ ان پیج (Using Azwaj.png as Logo)
const LoginPage = () => {
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Login Error:", error.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDF5F5] flex flex-col items-center justify-center p-6" dir="rtl">
      <div className="w-full max-w-md bg-white rounded-[50px] shadow-2xl overflow-hidden border border-gray-100">
        <div className="bg-[#800000] p-12 text-center relative">
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-5 shadow-xl p-2 overflow-hidden">
            {/* آپ کے لوگو کا اصلی نام */}
            <img src="/images/Azwaj.png" className="w-full h-full object-contain" alt="Azwaj Logo" />
          </div>
          <h2 className="text-[#FFD700] text-3xl font-bold">خوش آمدید</h2>
          <p className="text-white/70 mt-2 text-sm">باوقار طریقے سے اپنے جیون ساتھی کی تلاش شروع کریں</p>
        </div>

        <div className="p-10 space-y-4">
          <button 
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-4 py-4 border-2 border-gray-100 rounded-2xl hover:bg-gray-50 transition-all font-bold text-gray-700 shadow-sm"
          >
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/action/google.svg" className="w-6" alt="google" />
            گوگل کے ساتھ لاگ ان کریں
          </button>

          <div className="flex items-center gap-4 py-2">
            <div className="h-[1px] bg-gray-100 flex-1"></div>
            <span className="text-gray-400 text-sm">یا</span>
            <div className="h-[1px] bg-gray-100 flex-1"></div>
          </div>

          <button className="w-full py-4 bg-[#800000] text-[#FFD700] rounded-2xl font-bold shadow-lg flex items-center justify-center gap-3">
            <span>📱</span> فون نمبر استعمال کریں
          </button>
        </div>
      </div>
    </div>
  );
};

const Protected = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

function AppContent() {
  const [showSplash, setShowSplash] = useState(true);
  if (showSplash) return <Splash onFinish={() => setShowSplash(false)} />;

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={
          <Protected>
            <div className="min-h-screen bg-white">
              <nav className="p-6 bg-[#800000] text-[#FFD700] text-center font-bold text-xl rounded-b-[40px] shadow-lg">Azwaj Dashboard</nav>
              <div className="p-12 text-center">
                <h1 className="text-gray-800 text-2xl font-bold">خوش آمدید!</h1>
                <button onClick={() => auth.signOut()} className="mt-12 text-red-500 underline text-sm">لاگ آؤٹ کریں</button>
              </div>
            </div>
          </Protected>
        } />
        <Route path="/" element={<Navigate to="/dashboard" />} />
      </Routes>
    </Router>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
