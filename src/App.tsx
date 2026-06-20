import React, { useState, useRef, useEffect } from 'react';
import {
  INITIAL_NICHES,
  REACT_NATIVE_FILES,
  NicheData,
  ServiceItem,
} from './data';
import {
  Smartphone,
  Cpu,
  Video,
  Layers,
  ShieldCheck,
  Copy,
  Check,
  RotateCcw,
  FileCode,
  FileText,
  Settings,
  Send,
  Lock,
  Volume2,
  VolumeX,
  Sparkles,
  Globe,
  ChevronRight,
  Eye,
  Terminal,
  ExternalLink,
} from 'lucide-react';

export default function App() {
  // Configured states
  const [nichesState, setNichesState] = useState<Record<string, NicheData>>(INITIAL_NICHES);
  const [activeNicheKey, setActiveNicheKey] = useState<'watchmaker' | 'automotive' | 'architecture' | 'resort'>('watchmaker');
  const [copiedFile, setCopiedFile] = useState<string | null>(null);
  const [activeCodeTab, setActiveCodeTab] = useState<string>('App.tsx');
  
  // Custom form inputs inside the smartphone simulator
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryEmail, setInquiryEmail] = useState('');
  const [inquiryText, setInquiryText] = useState('');
  const [submittingInquiry, setSubmittingInquiry] = useState(false);
  const [inquirySuccess, setInquirySuccess] = useState(false);

  // Video settings inside the frame
  const [videoMuted, setVideoMuted] = useState(true);
  const [videoLoaded, setVideoLoaded] = useState(false);

  // Active configure values
  const activeNiche = nichesState[activeNicheKey];

  // Scroll tracking inside the mobile phone simulation
  const [phoneScrollY, setPhoneScrollY] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Parallax calculations based on scroll position (resembles useAnimatedStyle)
  const headerTranslateY = Math.min(phoneScrollY * 0.38, 110);
  const headerOpacity = Math.max(1 - phoneScrollY / 180, 0);
  const headerScale = Math.max(1 - phoneScrollY / 1200, 0.82);

  // Dynamic Video perspective zoom on scroll down
  const videoScale = 1 + Math.min(Math.max(phoneScrollY, 0) / 1000, 0.15);
  const videoOpacity = Math.max(0.7 - phoneScrollY / 550, 0.35);

  // Update specific live fields
  const handleUpdateField = (key: keyof NicheData, value: any) => {
    setNichesState((prev) => ({
      ...prev,
      [activeNicheKey]: {
        ...prev[activeNicheKey],
        [key]: value,
      },
    }));
  };

  const handleUpdateService = (index: number, key: keyof ServiceItem, value: string) => {
    const updatedServices = [...activeNiche.services];
    updatedServices[index] = {
      ...updatedServices[index],
      [key]: value,
    };
    handleUpdateField('services', updatedServices);
  };

  // Switch Niche and reset state
  const handleSwitchNiche = (key: 'watchmaker' | 'automotive' | 'architecture' | 'resort') => {
    setActiveNicheKey(key);
    setPhoneScrollY(0);
    setInquiryName('');
    setInquiryEmail('');
    setInquiryText('');
    setInquirySuccess(false);
    setVideoLoaded(false);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  };

  // Reset all to template defaults
  const handleResetDefaults = () => {
    setNichesState(JSON.parse(JSON.stringify(INITIAL_NICHES)));
    setInquiryName('');
    setInquiryEmail('');
    setInquiryText('');
    setInquirySuccess(false);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  };

  // Scroll callback mapping virtual scroll to parallax state inputs
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setPhoneScrollY(e.currentTarget.scrollTop);
  };

  // Copy code from IDE view helper
  const handleCopyCode = (filename: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedFile(filename);
    setTimeout(() => {
      setCopiedFile(null);
    }, 2000);
  };

  // Submit secure inquiry handler
  const handleTransmitInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryName || !inquiryEmail) {
      alert('Please fill out Name and Confidential Email before transmitting.');
      return;
    }
    setSubmittingInquiry(true);
    setTimeout(() => {
      setSubmittingInquiry(false);
      setInquirySuccess(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#090A0C] text-gray-100 font-sans flex flex-col antialiased selection:bg-amber-500 selection:text-black">
      {/* GLOBAL BACKGROUND ELEMENTS */}
      <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-amber-500/5 to-transparent pointer-events-none" />

      {/* --- TOP HIGH-END NAVIGATION BAR --- */}
      <header className="border-b border-gray-800/40 bg-[#0E0F12]/80 backdrop-blur-md px-6 py-4 flex flex-wrap items-center justify-between sticky top-0 z-50">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="h-9 w-9 bg-gradient-to-tr from-amber-500 to-amber-600 rounded-lg flex items-center justify-center shadow-lg shadow-amber-500/10">
              <Cpu className="h-5 w-5 text-black" />
            </div>
            <div className="absolute -bottom-1 -right-1 h-3.5 w-3.5 bg-green-500 border-2 border-[#090A0C] rounded-full animate-ping" />
            <div className="absolute -bottom-1 -right-1 h-3.5 w-3.5 bg-green-500 border-2 border-[#090A0C] rounded-full" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-serif-lux font-bold tracking-wider text-sm text-white">BusinessShowcase SDK</span>
              <span className="bg-amber-500/10 text-amber-400 text-[10px] uppercase font-mono px-1.5 py-0.5 rounded border border-amber-500/20">
                PRO EDITION
              </span>
            </div>
            <p className="text-[11px] text-gray-400 font-mono">React Native CLI Core Boilerplate Generator</p>
          </div>
        </div>

        <div className="flex items-center space-x-4 mt-3 sm:mt-0">
          <div className="hidden lg:flex items-center space-x-1.5 bg-gray-900/60 border border-gray-800 px-3 py-1.5 rounded-full text-[11px] font-mono text-gray-400">
            <span className="h-1.5 w-1.5 rounded-full bg-green-500 inline-block animate-pulse" />
            <span>Target Platform: iOS (SwiftUI Canvas) & Android (Compose Wrapper)</span>
          </div>
          <button
            onClick={handleResetDefaults}
            className="flex items-center space-x-1 bg-gray-950 hover:bg-gray-900 text-gray-300 font-mono text-xs px-3 py-1.5 rounded border border-gray-800 transition active:scale-95"
            title="Reset active configurator texts back to master luxury templates"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Restore Defaults</span>
          </button>
        </div>
      </header>

      {/* --- MASTER LAYOUT ROOT --- */}
      <main className="flex-1 max-w-[1700px] w-full mx-auto p-4 lg:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* ==============================================================================
            LEFT COLUMN (COGNITIVE BRAND CONTROL ROOM & CODE INSPECTION DESK) - 7 COLS
            ============================================================================== */}
        <section className="lg:col-span-7 flex flex-col space-y-6">
          
          {/* 1. ARCHETYPE LAUNCHER BAR */}
          <div className="bg-[#0E0F12] border border-gray-800/40 rounded-2xl p-5 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-24 bg-amber-500/5 blur-3xl rounded-full pointer-events-none" />
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xs uppercase font-mono text-amber-500 tracking-widest flex items-center space-x-2">
                <Sparkles className="h-4 w-4 animate-spin-slow" />
                <span>SELECT BRAND ARCHETYPE</span>
              </h2>
              <span className="text-[10px] text-gray-500 font-mono">Real-time state binding</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { id: 'watchmaker', name: 'CHRONOS HOROLOGY', icon: '🕒', theme: 'Gold & Carbon' },
                { id: 'automotive', name: 'APEX RACING', icon: '🏎️', theme: 'Racing Charcoal' },
                { id: 'architecture', name: 'ATELIER MONOLITH', icon: '🏛️', theme: 'Raw Stone Concrete' },
                { id: 'resort', name: 'ELYSIAN HIDEAWAY', icon: '🏝️', theme: 'Resort Emerald' },
              ].map((archetype) => {
                const isSelected = activeNicheKey === archetype.id;
                return (
                  <button
                    key={archetype.id}
                    onClick={() => handleSwitchNiche(archetype.id as any)}
                    className={`relative p-3.5 rounded-xl border text-left transition duration-200 group ${
                      isSelected
                        ? 'border-amber-500 bg-[#16181C] shadow-lg shadow-amber-500/5'
                        : 'border-gray-800 bg-gray-950/40 hover:bg-gray-900/60 hover:border-gray-700'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-xl">{archetype.icon}</span>
                      {isSelected && (
                        <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
                      )}
                    </div>
                    <div className="font-serif-lux text-white text-[11px] font-bold group-hover:text-amber-400 transition">
                      {archetype.name}
                    </div>
                    <div className="text-[9px] text-gray-400 font-mono mt-0.5">{archetype.theme}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. REAL-TIME CONTENT WRITER & PARAMETER PANEL */}
          <div className="bg-[#0E0F12] border border-gray-800/40 rounded-2xl p-5 shadow-2xl">
            <h2 className="text-xs uppercase font-mono text-gray-400 tracking-widest flex items-center space-x-2 mb-4 border-b border-gray-800/40 pb-3">
              <Settings className="h-4 w-4 text-amber-500" />
              <span>CUSTOMISE APP TEXTS & RE-BRAND</span>
            </h2>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-mono text-gray-400 uppercase tracking-wider mb-1.5">
                    Brand Name / Luxury Header
                  </label>
                  <input
                    type="text"
                    value={activeNiche.brand}
                    onChange={(e) => handleUpdateField('brand', e.target.value)}
                    className="w-full bg-gray-950 border border-gray-800 rounded-lg py-2 px-3 focus:outline-none focus:border-amber-500/70 text-white font-serif-lux font-bold uppercase tracking-wider transition"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono text-gray-400 uppercase tracking-wider mb-1.5">
                    Luxury Header Tagline
                  </label>
                  <input
                    type="text"
                    value={activeNiche.tagline}
                    onChange={(e) => handleUpdateField('tagline', e.target.value)}
                    className="w-full bg-gray-950 border border-gray-800 rounded-lg py-2 px-3 focus:outline-none focus:border-amber-500/70 text-white italic transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-mono text-gray-400 uppercase tracking-wider mb-1.5">
                  Narrative Ethos / Manifesto Description
                </label>
                <textarea
                  value={activeNiche.description}
                  onChange={(e) => handleUpdateField('description', e.target.value)}
                  rows={2}
                  className="w-full bg-gray-950 border border-gray-800 rounded-lg py-2 px-3 focus:outline-none focus:border-amber-500/70 text-white leading-relaxed transition"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="block text-[10px] font-mono text-gray-400 uppercase tracking-wider">
                    Core Services & Custom Metrics (Showing 3 Cards)
                  </label>
                  <span className="text-[9px] text-amber-500 font-mono">Animated cards scroll-trigger</span>
                </div>
                <div className="space-y-3">
                  {activeNiche.services.map((service, idx) => (
                    <div
                      key={service.id}
                      className="grid grid-cols-1 sm:grid-cols-12 gap-2 bg-gray-950/60 p-3 rounded-lg border border-gray-800"
                    >
                      <div className="sm:col-span-1 flex items-center justify-center text-[10px] font-mono text-amber-500">
                        #{idx+1}
                      </div>
                      <div className="sm:col-span-3">
                        <input
                          type="text"
                          placeholder="Card Title"
                          value={service.title}
                          onChange={(e) => handleUpdateService(idx, 'title', e.target.value)}
                          className="w-full bg-black border border-gray-800/80 rounded py-1 px-2 text-white font-bold"
                        />
                      </div>
                      <div className="sm:col-span-6">
                        <input
                          type="text"
                          placeholder="Description"
                          value={service.description}
                          onChange={(e) => handleUpdateService(idx, 'description', e.target.value)}
                          className="w-full bg-black border border-gray-800/80 rounded py-1 px-2 text-gray-300 text-[11px]"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <input
                          type="text"
                          placeholder="Metric"
                          value={service.metric}
                          onChange={(e) => handleUpdateService(idx, 'metric', e.target.value)}
                          className="w-full bg-black border border-gray-800/80 rounded py-1 px-1 text-amber-400 font-mono text-[10px] text-center"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                <div>
                  <label className="block text-[10px] font-mono text-gray-400 uppercase tracking-wider mb-1.5">
                    Contact Field Placeholder Text
                  </label>
                  <input
                    type="text"
                    value={activeNiche.contactPlaceholder}
                    onChange={(e) => handleUpdateField('contactPlaceholder', e.target.value)}
                    className="w-full bg-gray-950 border border-gray-800 rounded-lg py-2 px-3 focus:outline-none focus:border-amber-500/70 text-white transition text-[11px]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono text-gray-400 uppercase tracking-wider mb-1.5">
                    Ambient Background Looping Video URL
                  </label>
                  <select
                    value={activeNiche.videoUri}
                    onChange={(e) => handleUpdateField('videoUri', e.target.value)}
                    className="w-full bg-gray-950 border border-gray-800 rounded-lg py-2 px-3 focus:outline-none focus:border-amber-500/70 text-white transition text-[11px]"
                  >
                    <option value="https://assets.mixkit.co/videos/preview/mixkit-mechanical-movement-of-a-pocket-watch-close-up-41908-large.mp4">Pocket Watch Gear (Mixkit Free Premium)</option>
                    <option value="https://assets.mixkit.co/videos/preview/mixkit-front-of-a-luxurious-sports-car-parked-42614-large.mp4">Sports Exhaust Chassis (Mixkit Free Premium)</option>
                    <option value="https://assets.mixkit.co/videos/preview/mixkit-architectural-shot-of-a-futuristic-concrete-building-44023-large.mp4">Brutalist Building Concrete (Mixkit Free Premium)</option>
                    <option value="https://assets.mixkit.co/videos/preview/mixkit-drone-view-of-overwater-villas-in-a-resort-43093-large.mp4">Lagoon Resort Island (Mixkit Free Premium)</option>
                    <option value="https://assets.mixkit.co/videos/preview/mixkit-waves-lapping-gently-on-the-shore-43022-large.mp4">Waves Water Shimmer (Mixkit Free Premium)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* 3. HARDWARE CODE EXPORTER & SYNTAX VIEWER */}
          <div className="bg-[#0E0F12] border border-gray-800/40 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
            <div className="p-5 border-b border-gray-800/40 flex items-center justify-between bg-gradient-to-r from-gray-950 to-gray-900">
              <div className="flex items-center space-x-2">
                <FileCode className="h-4.5 w-4.5 text-amber-500" />
                <div>
                  <span className="text-xs uppercase font-mono font-bold tracking-widest text-white">REACT NATIVE SYSTEM CODES EXPORTED ON DISK</span>
                  <div className="text-[10px] text-gray-400 font-mono">Stand-alone files under <code className="text-amber-500 bg-amber-500/5 px-1 py-0.5 rounded">/BusinessShowcase/</code></div>
                </div>
              </div>
              <span className="flex items-center space-x-1 text-[10px] bg-green-500/10 text-green-400 px-2 py-0.5 rounded border border-green-500/20 font-mono">
                <Terminal className="h-3 w-3" />
                <span>CLEAN WORKSPACE</span>
              </span>
            </div>

            {/* TAB SELECTOR FOR FILES */}
            <div className="flex border-b border-gray-800/60 bg-[#0E0F12] overflow-x-auto text-xs font-mono">
              {Object.keys(REACT_NATIVE_FILES).map((fileName) => (
                <button
                  key={fileName}
                  onClick={() => setActiveCodeTab(fileName)}
                  className={`px-5 py-3 border-r border-gray-800/40 transition flex items-center space-x-2 relative ${
                    activeCodeTab === fileName
                      ? 'bg-gray-950/80 text-amber-500 border-b-2 border-b-amber-500'
                      : 'text-gray-400 hover:bg-gray-900 hover:text-white'
                  }`}
                >
                  <FileText className="h-3.5 w-3.5" />
                  <span>{fileName}</span>
                </button>
              ))}
            </div>

            {/* CODE BLOCK BODY */}
            <div className="bg-gray-950/90 p-4 font-mono text-[11px] leading-relaxed relative max-h-[380px] overflow-y-auto">
              {/* Copy action button */}
              <button
                onClick={() => handleCopyCode(activeCodeTab, REACT_NATIVE_FILES[activeCodeTab as keyof typeof REACT_NATIVE_FILES])}
                className="absolute top-4 right-4 z-10 bg-gray-900/90 hover:bg-amber-500 hover:text-black hover:border-transparent text-gray-300 flex items-center space-x-1.5 py-1.5 px-3 rounded-lg border border-gray-800 transition active:scale-95 duration-200"
              >
                {copiedFile === activeCodeTab ? (
                  <>
                    <Check className="h-3 w-3" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3 w-3" />
                    <span>Copy Code</span>
                  </>
                )}
              </button>

              <pre className="text-gray-300">
                <code>{REACT_NATIVE_FILES[activeCodeTab as keyof typeof REACT_NATIVE_FILES]}</code>
              </pre>
            </div>

            {/* Code summary footer */}
            <div className="p-4 bg-gray-900/40 border-t border-gray-800/40 text-[11px] text-gray-400 font-mono flex items-center justify-between">
              <span>Supports <code className="text-gray-200">Reanimated 3.X</code> & <code className="text-gray-200">ExoPlayer/AVFoundation</code> video bindings</span>
              <span className="text-amber-500 flex items-center hover:underline cursor-pointer" onClick={() => setActiveCodeTab('README.md')}>
                Read setup guides <ChevronRight className="h-3 m-0" />
              </span>
            </div>
          </div>

        </section>

        {/* ==============================================================================
            RIGHT COLUMN (INTERACTIVE PREMIUM IPHONE 15 PRO EMULATOR GLASS) - 5 COLS
            ============================================================================== */}
        <section className="lg:col-span-5 flex flex-col items-center justify-center py-2 relative">
          
          {/* SIMULATOR CAPTION */}
          <div className="mb-4 text-center">
            <span className="text-xs font-mono uppercase bg-gray-900 border border-gray-800 text-amber-500 rounded-full px-3.5 py-1 tracking-widest inline-flex items-center space-x-1.5 shadow-xl">
              <Eye className="h-3 w-3 animate-pulse" />
              <span>LIVE INTERACTIVE PREVIEW</span>
            </span>
            <p className="text-[10px] text-gray-400 font-mono mt-2">Scroll inside the device screen to test parallax & scaling cards!</p>
          </div>

          {/* --- SMARTPHONE CASE WRAPPER --- */}
          <div className="relative w-[345px] h-[720px] bg-[#121318] rounded-[52px] shadow-[0_0_0_12px_#2B2E36,0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_5px_12px_rgba(255,255,255,0.05)] border border-gray-950 flex flex-col overflow-hidden">
            
            {/* PHYSICAL NOTCH DIALS / DYNAMIC ISLAND */}
            <div className="absolute top-3.5 left-1/2 -translate-x-1/2 h-7 w-28 bg-[#000000] rounded-full z-[101] flex items-center justify-between px-3.5">
              {/* Camera dot */}
              <div className="h-2 w-2 rounded-full bg-[#111122] border border-gray-800" />
              {/* Dynamic status pill */}
              <span className="text-[7.5px] font-mono text-amber-400/90 tracking-widest animate-pulse flex items-center space-x-0.5">
                <span className="h-1 w-1 rounded-full bg-amber-500 inline-block mr-1 animate-ping" />
                <span>SECURE</span>
              </span>
              {/* Sensor dial */}
              <div className="h-1.5 w-1.5 rounded-full bg-gray-900" />
            </div>

            {/* SCREEN TIME AND POWER INDICATORS (Top line) */}
            <div className="absolute top-[1.5px] left-0 right-0 h-11 px-7 flex items-end justify-between text-[10px] font-semibold text-white/90 z-[100] pointer-events-none tracking-tight">
              <span>9:41 AM</span>
              <div className="flex items-center space-x-1.5">
                <Globe className="h-3 w-3 text-white/80" />
                <span>5G</span>
                <div className="w-5 h-2.5 rounded border border-white/60 p-[1px] flex items-center">
                  <div className="w-[15px] h-full bg-white rounded-xs" />
                </div>
              </div>
            </div>

            {/* HOME SWIPE BAR INDICATOR (Bottom) */}
            <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-32 h-1.5 bg-white/70 rounded-full z-[101] pointer-events-none" />

            {/* --- SMARTPHONE SCREEN CORE INSIDE --- */}
            <div
              style={{ backgroundColor: activeNiche.primaryColor }}
              className="flex-1 relative flex flex-col h-full rounded-[48px] overflow-hidden transition-colors duration-500"
            >
              
              {/* AMBIENT MEDIA BACKSTAGE */}
              <div className="absolute top-0 left-0 right-0 h-full pointer-events-none overflow-hidden z-1">
                {/* Fallback image shown during loading */}
                {!videoLoaded && (
                  <div className="absolute inset-0 bg-cover bg-center transition-opacity duration-700"
                    style={{ backgroundImage: `url('https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=600')` }}
                  />
                )}
                
                {/* Looping full-screen background video */}
                <video
                  src={activeNiche.videoUri}
                  autoPlay
                  loop
                  muted={videoMuted}
                  playsInline
                  onLoadedData={() => setVideoLoaded(true)}
                  style={{
                    transform: `scale(${videoScale})`,
                    opacity: videoOpacity,
                  }}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-100 ease-out transition-opacity duration-500"
                />

                {/* Media Shade overlay shield */}
                <div className="absolute inset-0 bg-black/60" />
              </div>

              {/* MUTED TRACK TRIGGER FLOAT */}
              <button
                onClick={() => setVideoMuted(!videoMuted)}
                className="absolute top-16 right-5 z-[50] h-7 w-7 rounded-full bg-black/60 hover:bg-black text-gray-300 flex items-center justify-center backdrop-blur-sm border border-white/10 active:scale-90 transition"
                title={videoMuted ? "Unmute loop audio" : "Mute audio"}
              >
                {videoMuted ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5 text-amber-400" />}
              </button>

              {/* FLOATING NICHE NAV TAB RAILS inside the phone */}
              <div className="absolute top-14 left-4 right-4 z-40 bg-black/55 backdrop-blur-md rounded-full border border-white/5 p-[3px] flex justify-between">
                {[
                  { id: 'watchmaker', name: 'TIME' },
                  { id: 'automotive', name: 'APEX' },
                  { id: 'architecture', name: 'ARCH' },
                  { id: 'resort', name: 'ISLE' },
                ].map((item) => {
                  const isTabActive = activeNicheKey === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleSwitchNiche(item.id as any)}
                      className={`flex-1 text-[9px] font-mono tracking-widest font-black py-1.5 rounded-full transition-all duration-300 ${
                        isTabActive
                          ? 'bg-white/10 text-white shadow-xs border border-white/10'
                          : 'text-white/40 hover:text-white/70'
                      }`}
                    >
                      {item.name}
                    </button>
                  );
                })}
              </div>

              {/* PHONE VIRTUAL VIEWPORT SCROLLABLE TRACK */}
              <div
                ref={scrollContainerRef}
                onScroll={handleScroll}
                className="flex-1 overflow-y-auto px-5 pt-32 pb-16 z-10 scroll-smooth relative"
                style={{ scrollbarWidth: 'none' }}
              >
                
                {/* --- PHONE SECTION 1: IMPRESSIVE PARALLAX HERO --- */}
                <div
                  style={{
                    transform: `translateY(${headerTranslateY}px) scale(${headerScale})`,
                    opacity: headerOpacity,
                  }}
                  className="pt-10 pb-20 flex flex-col items-center justify-center text-center transition-all duration-100 ease-out origin-center select-none"
                >
                  <div className="flex items-center space-x-1.5 mb-2.5">
                    <span className="h-0.5 w-3 bg-amber-500" style={{ backgroundColor: activeNiche.accentColor }} />
                    <span className="text-[8px] font-mono tracking-[0.35em] text-white/80 uppercase font-bold">
                      ESTABLISHED CRAFT
                    </span>
                    <span className="h-0.5 w-3 bg-amber-500" style={{ backgroundColor: activeNiche.accentColor }} />
                  </div>

                  <h1
                    style={{ color: activeNiche.textColor }}
                    className="font-serif-lux font-black tracking-widest text-[#FFF] text-2xl uppercase mt-1 leading-snug drop-shadow-xl"
                  >
                    {activeNiche.brand}
                  </h1>

                  <p className="text-white/75 text-[11px] italic tracking-wider mt-2.5 max-w-[260px] leading-relaxed">
                    {activeNiche.tagline}
                  </p>

                  {/* Elegant micro divider */}
                  <svg className="w-16 h-4 mt-5 text-amber-500/80" viewBox="0 0 100 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M0 7 C 25 2, 25 12, 50 7 C 75 2, 75 12, 100 7"
                      stroke={activeNiche.accentColor}
                      strokeWidth="3.5"
                    />
                  </svg>

                  <span className="text-[7.5px] uppercase font-mono tracking-widest text-white/35 mt-16 animate-bounce">
                    PULL TO INQUIRE
                  </span>
                </div>

                {/* --- PHONE SECTION 2: EXQUISITE MANIFESTO FOCUS CARD --- */}
                <div className="mb-8">
                  <div
                    style={{ borderColor: `${activeNiche.accentColor}25` }}
                    className="p-5 rounded-2xl bg-white/5 border backdrop-blur-md relative overflow-hidden group hover:bg-white/[0.08] transition duration-300"
                  >
                    {/* Corner accent glow */}
                    <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 blur-xl group-hover:bg-amber-500/5 transition duration-300 pointer-events-none" />

                    <h3
                      style={{ color: activeNiche.accentColor }}
                      className="text-[9.5px] font-mono font-bold tracking-[0.25em] uppercase mb-2"
                    >
                      OUR CREATIVE ETHOS
                    </h3>
                    <p className="text-xs text-white/80 leading-relaxed tracking-wide text-justify">
                      {activeNiche.description}
                    </p>
                  </div>
                </div>

                {/* --- PHONE SECTION 3: SERVICES AND PORTFOLIO CARDS --- */}
                <div className="mb-8 space-y-4">
                  <div>
                    <span className="text-[7px] font-mono tracking-widest text-white/40 uppercase block">ELITE INTEGRITY</span>
                    <h3 className="text-sm font-bold tracking-wider text-white mt-1 uppercase flex items-center justify-between">
                      <span>SIGNATURE OFFERS</span>
                      <span className="text-[9px] font-mono text-white/50">03 COMMISSIONS</span>
                    </h3>
                    <div className="h-[1px] w-8 bg-amber-500/80 mt-1" style={{ backgroundColor: activeNiche.accentColor }} />
                  </div>

                  {activeNiche.services.map((service, idx) => (
                    <div
                      key={service.id}
                      style={{ borderColor: `${activeNiche.accentColor}18` }}
                      className="group relative p-4 rounded-xl bg-white/[0.03] border hover:bg-white/[0.06] transition duration-300 overflow-hidden"
                    >
                      {/* Metric sticker badge */}
                      <div className="absolute top-3.5 right-4 bg-white/5 px-2 py-0.5 rounded text-[8px] font-mono text-[#FFF]" style={{ color: activeNiche.accentColor }}>
                        {service.metric}
                      </div>

                      <span className="text-[8px] font-mono text-white/20">0{idx + 1}/03</span>
                      <h4 className="text-xs font-bold text-white mt-1 group-hover:text-amber-300 duration-300" style={{ color: activeNiche.textColor }}>
                        {service.title}
                      </h4>
                      <p className="text-[11px] text-white/60 leading-relaxed mt-1">
                        {service.description}
                      </p>

                      {/* Small focus element indicating clickable premium */}
                      <div
                        style={{ backgroundColor: activeNiche.accentColor }}
                        className="absolute left-0 top-0 bottom-0 w-1"
                      />
                    </div>
                  ))}
                </div>

                {/* --- PHONE SECTION 4: CONTACT & INQUIRY GLASSFORM --- */}
                <div className="mb-14">
                  <div
                    style={{ borderColor: `${activeNiche.accentColor}30`, backgroundColor: `${activeNiche.primaryColor}F0` }}
                    className="p-5 rounded-2xl border bg-[#0E0F11]/95 shadow-xl relative overflow-hidden"
                  >
                    <h3 style={{ color: activeNiche.accentColor }} className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase mb-1">
                      SECURED BRIDGING PORTAL
                    </h3>
                    <p className="text-[11px] text-white/50 leading-relaxed mb-4">
                      Direct secure channel to private relations management desk. Response is guaranteed within 4 hours.
                    </p>

                    {inquirySuccess ? (
                      <div className="bg-green-500/10 border border-green-500/20 p-4 rounded-xl text-center space-y-2 py-6">
                        <ShieldCheck className="h-8 w-8 text-green-400 mx-auto animate-bounce" />
                        <h4 className="text-xs font-serif-lux font-bold text-white">TRANSMISSION ENCRYPTED</h4>
                        <p className="text-[10px] text-gray-300 leading-relaxed">
                          Your records were bridged safely with the 256-bit secure gateway. Stand by for specialist dispatch.
                        </p>
                        <button
                          onClick={() => setInquirySuccess(false)}
                          className="text-[9px] font-mono text-amber-400 hover:underline pt-2 inline-block block"
                        >
                          Send New Enquiry
                        </button>
                      </div>
                    ) : (
                      <form onSubmit={handleTransmitInquiry} className="space-y-3">
                        <div>
                          <input
                            type="text"
                            required
                            placeholder="YOUR NAME"
                            value={inquiryName}
                            onChange={(e) => setInquiryName(e.target.value)}
                            className="w-full bg-white/[0.04] border border-white/10 rounded-lg py-2 px-3 text-[11px] text-white tracking-wider placeholder-white/30 focus:outline-none focus:border-amber-500/50"
                          />
                        </div>

                        <div>
                          <input
                            type="email"
                            required
                            placeholder="CONFIDENTIAL EMAIL"
                            value={inquiryEmail}
                            onChange={(e) => setInquiryEmail(e.target.value)}
                            className="w-full bg-white/[0.04] border border-white/10 rounded-lg py-2 px-3 text-[11px] text-white placeholder-white/30 focus:outline-none focus:border-amber-500/50"
                          />
                        </div>

                        <div>
                          <textarea
                            rows={3}
                            placeholder={activeNiche.contactPlaceholder.toUpperCase()}
                            value={inquiryText}
                            onChange={(e) => setInquiryText(e.target.value)}
                            className="w-full bg-white/[0.04] border border-white/10 rounded-lg py-2 px-3 text-[11px] text-white placeholder-white/30 focus:outline-none focus:border-amber-500/50 leading-relaxed"
                          />
                        </div>

                        <button
                          type="submit"
                          disabled={submittingInquiry}
                          style={{ backgroundColor: activeNiche.accentColor }}
                          className="w-full text-black hover:opacity-90 font-bold text-[9px] uppercase tracking-widest py-2.5 rounded-lg transition duration-200 active:scale-95 flex items-center justify-center space-x-1.5"
                        >
                          <Send className="h-3 w-3" />
                          <span>{submittingInquiry ? 'SENDING SECURE...' : 'TRANSMIT SECURE INQUIRY'}</span>
                        </button>
                      </form>
                    )}

                    <div className="flex items-center justify-center space-x-1.5 mt-4 text-[7px] text-white/30 font-mono tracking-widest">
                      <Lock className="h-2.5 w-2.5" />
                      <span>256-BIT ENCRYPTED CLIENT PORTAL</span>
                    </div>
                  </div>
                </div>

                {/* --- PHONE SECTION 5: FOOTER META AND CITIES BANNER --- */}
                <div className="text-center pt-2 pb-6 border-t border-white/5">
                  <span className="text-[8px] tracking-[0.1em] text-white/40 uppercase block">
                    © 2026 {activeNiche.brand}
                  </span>
                  <p className="text-[7.5px] uppercase font-mono tracking-[0.25em] text-white/20 mt-1">
                    GENEVA • TOKYO • NEW YORK • MONACO
                  </p>
                </div>

              </div>

            </div>

          </div>

          {/* SIMULATOR QUICK REVELA DETAILS PANEL */}
          <div className="w-[345px] mt-4 bg-gray-950/70 border border-gray-800 rounded-2xl p-4 text-xs font-mono">
            <div className="flex items-center space-x-2 text-amber-500 font-bold uppercase tracking-wider text-[10px] mb-2">
              <Cpu className="h-4 w-4" />
              <span>Mobile Simulation Metrics</span>
            </div>
            
            <div className="grid grid-cols-2 gap-2 text-[10px] text-gray-400">
              <div className="bg-gray-900/60 p-2 rounded border border-gray-800/40">
                <span className="block text-[8px] uppercase tracking-wide text-gray-500">Video Height</span>
                <span className="text-white">FULL-SCREEN (cover)</span>
              </div>
              <div className="bg-gray-900/60 p-2 rounded border border-gray-800/40">
                <span className="block text-[8px] uppercase tracking-wide text-gray-500">Parallax Formula</span>
                <span className="text-amber-400">translateY({headerTranslateY}px)</span>
              </div>
              <div className="bg-gray-900/60 p-2 rounded border border-gray-800/40">
                <span className="block text-[8px] uppercase tracking-wide text-gray-500">Header Scale</span>
                <span className="text-white">{headerScale.toFixed(2)}x</span>
              </div>
              <div className="bg-gray-900/60 p-2 rounded border border-gray-800/40">
                <span className="block text-[8px] uppercase tracking-wide text-gray-500">Header Opacity</span>
                <span className="text-white">{headerOpacity.toFixed(2)}</span>
              </div>
            </div>
          </div>

        </section>

      </main>

      {/* --- FOOTER PLATFORM BADGING --- */}
      <footer className="border-t border-gray-800/40 bg-black/45 py-5 px-6 text-center text-xs text-gray-500 font-mono mt-10">
        <div className="max-w-[1700px] w-full mx-auto flex flex-col md:flex-row items-center justify-between">
          <p>© 2026 Premium Business Showcase Creator. Formulated via Google AI Studio.</p>
          <div className="flex items-center space-x-4 mt-2 md:mt-0">
            <span className="text-[10px] text-gray-600">TypeScript 5.8 / React 19 / Tailwind v4</span>
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
            <span className="text-[10px] text-gray-600">Secure Vault Storage Assured</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
