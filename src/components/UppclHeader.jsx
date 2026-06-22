import React, { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { Search, LogOut } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

export default function UppclHeader({ activeTab, setActiveTab }) {
  const { user, signIn, signOut, authError, clearAuthError } = useAuth();
  const [modalOpen, setModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const openModal = useCallback(() => {
    clearAuthError();
    setEmail('');
    setPassword('');
    setModalOpen(true);
  }, [clearAuthError]);

  const closeModal = useCallback(() => {
    setModalOpen(false);
    clearAuthError();
  }, [clearAuthError]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearAuthError();
    setLoading(true);
    try {
      await signIn(email.trim(), password);
      setModalOpen(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!modalOpen) return;
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') closeModal();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [modalOpen, closeModal]);

  return (
    <header className="w-full font-sans shadow-md flex flex-col">
      {/* 1. Top Blue Bar */}
      <div className="bg-[#1f498c] text-white text-[11px] font-bold px-4 py-1.5 flex justify-between items-center hidden md:flex">
        <div className="flex divide-x divide-white/30">
          <a href="/" onClick={(e) => e.preventDefault()}>
  SCREEN READER ACCESS
  </a>
          <a href="/" onClick={(e) => e.preventDefault()}>
  SKIP TO MAIN CONTENT
  </a>
          <a href="/" onClick={(e) => e.preventDefault()}>
  SITEMAP
  </a>
          <a href="/" onClick={(e) => e.preventDefault()}>
  OUTSOURCE KARMI PORTAL
  </a>
          <a href="/" onClick={(e) => e.preventDefault()}>
  हिंदी संस्करण
  </a>
          <span className="px-3 flex items-center justify-center bg-yellow-400 text-black">
  <a href="/" onClick={(e) => e.preventDefault()}>
    VBTS
  </a>
</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="pl-2 pr-8 py-0.5 text-black text-xs h-6 w-48"
            />
            <Search className="absolute right-1 top-1 text-gray-500" size={14} />
          </div>
        </div>
      </div>

      {/* 2. White Header Area */}
      <div className="bg-white px-6 py-3 flex justify-between items-center shadow-sm relative z-20">
        <div className="flex items-center gap-4">
          <img src="/kesco-logo.png" alt="KESCO Logo" className="w-16 h-16 object-contain" />
          <div className="flex flex-col">
            <span className="text-xl font-bold text-[#1f498c] tracking-wide leading-tight">
              Kanpur Electricity
            </span>
            <span className="text-[16px] font-bold text-orange-500 leading-tight">
              Supply Company Ltd.
            </span>
          </div>
        </div>
        <div className="flex items-center gap-4 text-sm font-semibold text-[#1f498c]">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`hover:text-orange-500 transition-colors ${activeTab === "dashboard" ? "text-orange-500 border-b-2 border-orange-500" : ""}`}
          >
            Dashboard
          </button>
          <span className="text-gray-300">|</span>
          <button
            onClick={() => setActiveTab("projects")}
            className={`hover:text-orange-500 transition-colors ${activeTab === "projects" ? "text-orange-500 border-b-2 border-orange-500" : ""}`}
          >
            Projects
          </button>
          <span className="text-gray-300">|</span>
          <button
            onClick={() => setActiveTab("meetings")}
            className={`hover:text-orange-500 transition-colors ${activeTab === "meetings" ? "text-orange-500 border-b-2 border-orange-500" : ""}`}
          >
            Meetings
          </button>

          {/* Auth Button */}
          {user ? (
            <div className="ml-4 flex items-center gap-3">
              <span className="text-xs font-normal bg-green-100 text-green-800 px-2 py-1 rounded">
                {user.email}
              </span>
              <button
                onClick={async () => { clearAuthError(); await signOut(); }}
                className="flex items-center gap-1 text-red-600 hover:underline"
              >
                <LogOut size={16} /> Sign out
              </button>
            </div>
          ) : (
            <button
              onClick={openModal}
              className="ml-4 bg-[#1f498c] hover:bg-blue-800 text-white px-4 py-1.5 rounded text-xs"
            >
              LOGIN
            </button>
          )}
        </div>
      </div>

      {/* 3. Red Hero Banner */}
      <div className="bg-[#de1b38] w-full min-h-[220px] flex items-center justify-center relative overflow-hidden">
        {/* Placeholder for the large slider - mimicking the PM/Gov banners */}
        <div className="flex w-full max-w-6xl mx-auto px-4 gap-4 items-center">
          <div className="flex-1 text-white pr-4">
            <h1 className="text-4xl font-extrabold mb-2 leading-tight">
              बिजली बिल <br />
              जमा करने के लिए किसी<br />
              को रुपए क्यों दें?
            </h1>
            <div className="bg-white text-black inline-flex items-center px-4 py-2 mt-4 rounded-full font-bold">
              KESCO की वेबसाइट है ना <Search size={18} className="ml-2 text-gray-400" />
            </div>
          </div>

          
          <div className=" border-2 flex shrink-0 items-end justify-center pt-4 opacity-90 hover:opacity-100 transition-opacity">
            <img
              src="/pm_portait.png"
              alt="Prime Minister"
              className="h-56 object-contain drop-shadow-md"
            />
          </div>

          <div className="flex-1 flex flex-col gap-3 items-end justify-center pl-4">
            <div className="border-2 border-white rounded-[30px] px-6 py-3 text-center text-white bg-white/10 backdrop-blur-sm max-w-md w-full">
              <p className="font-bold text-lg leading-tight">बिजली बिल भुगतान करना है? तो लाइन में लगने या किसी बिचौलिये को रुपए देने की जरुरत नहीं।</p>
            </div>
            <div className="border-2 border-white rounded-[30px] px-6 py-3 text-center text-white bg-white/10 backdrop-blur-sm max-w-md w-full">
              <p className="font-bold text-lg leading-tight">KESCO की आधिकारिक वेबसाइट KESCO.ORG पर जाएं और घर बैठे ऑनलाइन बिल जमा करें सुरक्षित और आसान!</p>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Yellow Ticker */}
      <div className="bg-[#ffeb3b] border-y border-gray-300 py-1.5 overflow-hidden flex whitespace-nowrap">
        <div className="animate-[marquee_20s_linear_infinite] text-sm font-semibold text-gray-800">
          To avail the benefits of KESCO PM Surya Ghar Free Electricity Scheme, download the app now!   •   Welcome to KESCO Summer Internship 2026 Portal! Stay updated on project progress and daily tasks.   •   Never share your OTP or password with anyone. KESCO never asks for it.
        </div>
      </div>

      {/* 5. Orange Action Bars */}
      <div className="bg-gradient-to-b from-[#e3ebf3] to-white py-4 flex justify-center gap-4 border-b border-gray-200">
        <button className="bg-[#ff6f3b] hover:bg-[#e65a25] text-white font-bold px-6 py-2 rounded shadow-md text-sm transition-colors">
          Download KESCO SMART App for Bill Payment/ recharge your Smart Meters
        </button>
        <button className="bg-[#ff6f3b] hover:bg-[#e65a25] text-white font-bold px-6 py-2 rounded shadow-md text-sm transition-colors">
          Smart Postpaid Meter Related Information
        </button>
      </div>

      {/* Login Modal */}
      {modalOpen && createPortal(
        <div onClick={closeModal} className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-8">
          <div onClick={(e) => e.stopPropagation()} className="w-full max-w-md rounded-lg bg-white p-8 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-bold text-[#1f498c]">Sign in</h2>
                <p className="text-sm text-gray-500">Enter authorised email and password.</p>
              </div>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-700 text-xl leading-none">×</button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:border-[#1f498c]"
                  placeholder="you@example.com"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-2">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:border-[#1f498c]"
                  placeholder="Password"
                  required
                  minLength={6}
                />
              </div>
              {authError && (
                <div className="text-xs text-red-500 bg-red-50 rounded px-3 py-2">
                  {authError}
                </div>
              )}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#1f498c] hover:bg-blue-800 text-white px-4 py-2.5 rounded text-sm font-bold disabled:opacity-60"
              >
                {loading ? 'Signing in…' : 'Continue'}
              </button>
            </form>
          </div>
        </div>,
        document.body
      )}
    </header>
  );
}
