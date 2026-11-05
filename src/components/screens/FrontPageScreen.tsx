import React from 'react';
import { 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  Activity, 
  Radio, 
  Layers, 
  Flame, 
  Volume2, 
  VolumeX, 
  ChevronRight, 
  ShieldAlert, 
  Lock 
} from 'lucide-react';
import { useSound } from '../../hooks/useSound';
import { ScreenId } from '../HeaderHUD';

interface FrontPageScreenProps {
  onEnterCommand: (targetScreen?: ScreenId) => void;
}

export const FrontPageScreen: React.FC<FrontPageScreenProps> = ({ onEnterCommand }) => {
  const { isMuted, toggleMute, playClick, playPageTransition, playHover, playSuccess } = useSound();

  const handleEnter = (screen: ScreenId = 'topology') => {
    playPageTransition();
    playSuccess();
    onEnterCommand(screen);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#070B14] text-[#dfe2f0] select-none font-sans">
      {/* Sleek Landing Top Bar */}
      <header className="absolute top-0 left-0 right-0 z-40 px-6 sm:px-12 py-5 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-[#111C2D]/90 border border-[#48A5FF]/40 flex items-center justify-center shadow-[0_0_14px_rgba(72,165,255,0.3)]">
            <Zap className="w-5 h-5 text-[#48A5FF]" />
          </div>
          <div>
            <span className="font-command font-bold text-lg tracking-wider text-white">
              GRIDSHIELD
            </span>
            <span className="ml-2 px-1.5 py-0.2 rounded text-[10px] font-command font-semibold bg-[#48A5FF]/15 text-[#48A5FF] border border-[#48A5FF]/30 tracking-widest hidden sm:inline">
              CYBER DEFENSE
            </span>
          </div>
        </div>

        {/* Right Action & Audio Controls */}
        <div className="flex items-center gap-3">
          {/* Audio toggle button */}
          <button
            onClick={toggleMute}
            onMouseEnter={playHover}
            title={isMuted ? 'Tactical Audio: MUTED (Click to Unmute)' : 'Tactical Audio: ACTIVE (Click to Mute)'}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-command font-semibold border backdrop-blur-md transition-all ${
              isMuted
                ? 'bg-[#111C2D]/80 border-white/10 text-[#8a919d] hover:text-white'
                : 'bg-[#111C2D]/80 border-[#48A5FF]/40 text-[#48A5FF] shadow-[0_0_12px_rgba(72,165,255,0.25)]'
            }`}
          >
            {isMuted ? (
              <>
                <VolumeX className="w-3.5 h-3.5 text-[#FF405D]" />
                <span className="hidden sm:inline text-[11px]">MUTED</span>
              </>
            ) : (
              <>
                <Volume2 className="w-3.5 h-3.5 text-[#35E6A1] animate-bounce" />
                <span className="hidden sm:inline text-[11px] text-[#35E6A1]">AUDIO ON</span>
              </>
            )}
          </button>

          {/* Top CTA */}
          <button
            onClick={() => handleEnter('topology')}
            onMouseEnter={playHover}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#48A5FF] hover:bg-[#3595f5] text-[#070B14] font-command font-bold text-xs tracking-wider uppercase transition-all shadow-[0_0_20px_rgba(72,165,255,0.5)]"
          >
            <span>ENTER COMMAND CENTRE</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#070B14]" />
          </button>
        </div>
      </header>

      {/* HERO SECTION matching user uploaded screenshot image_43fec584.png */}
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden border-b border-[rgba(72,165,255,0.15)] bg-[#070B14] pt-20">
        {/* Background Visual Asset from screenshot */}
        <div className="absolute inset-0 z-0">
          <img
            src="/assets/aistudio/image_43fec584.png"
            alt="Smart Microgrid Cyber Defense Network"
            className="w-full h-full object-cover object-center opacity-90 mix-blend-screen scale-100 sm:scale-105 transition-transform duration-1000 ease-out"
          />
          {/* Subtle gradient vignettes to blend naturally with dark background */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#070B14] via-[#070B14]/65 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#070B14] via-transparent to-[#070B14]/80"></div>
          <div className="absolute inset-0 bg-radial from-transparent via-[#070B14]/25 to-[#070B14]"></div>
        </div>

        {/* Floating Interactive Live Telemetry Badges over the Nodes in the Hero */}
        <div className="hidden lg:block absolute inset-0 z-10 pointer-events-none">
          {/* Hospital Node Marker */}
          <div className="absolute bottom-[22%] right-[22%] pointer-events-auto">
            <div 
              onClick={() => handleEnter('topology')}
              onMouseEnter={playHover}
              className="cursor-pointer group flex items-center gap-2 px-2.5 py-1 rounded bg-[#0D1422]/90 backdrop-blur-md border border-[#35E6A1]/40 shadow-[0_0_14px_rgba(53,230,161,0.25)] hover:border-[#35E6A1] transition-all"
            >
              <span className="w-2 h-2 rounded-full bg-[#35E6A1] animate-ping"></span>
              <span className="text-[10px] font-command font-bold text-[#35E6A1]">
                HOSPITAL CRITICAL FEEDER // 100% ONLINE
              </span>
            </div>
          </div>

          {/* Central Control Substation Marker */}
          <div className="absolute top-[32%] right-[38%] pointer-events-auto">
            <div 
              onClick={() => handleEnter('topology')}
              onMouseEnter={playHover}
              className="cursor-pointer group flex items-center gap-2 px-2.5 py-1 rounded bg-[#0D1422]/90 backdrop-blur-md border border-[#48A5FF]/40 shadow-[0_0_14px_rgba(72,165,255,0.25)] hover:border-[#48A5FF] transition-all"
            >
              <span className="w-2 h-2 rounded-full bg-[#48A5FF] animate-pulse"></span>
              <span className="text-[10px] font-command font-bold text-[#48A5FF]">
                SUBSTATION ALPHA // 230kV (60.01 Hz)
              </span>
            </div>
          </div>

          {/* Industrial Plant Marker */}
          <div className="absolute top-[34%] right-[10%] pointer-events-auto">
            <div 
              onClick={() => handleEnter('threats')}
              onMouseEnter={playHover}
              className="cursor-pointer group flex items-center gap-2 px-2.5 py-1 rounded bg-[#0D1422]/90 backdrop-blur-md border border-[#FF405D]/40 shadow-[0_0_14px_rgba(255,64,93,0.3)] hover:border-[#FF405D] transition-all"
            >
              <span className="w-2 h-2 rounded-full bg-[#FF405D] animate-ping"></span>
              <span className="text-[10px] font-command font-bold text-[#FF405D]">
                NORTH INDUSTRIAL // SCADA ALERT INTERCEPTED
              </span>
            </div>
          </div>
        </div>

        {/* Hero Content aligned exactly as in screenshot */}
        <div className="relative z-20 max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 py-16 sm:py-24 w-full">
          <div className="max-w-2xl">
            {/* Top eyebrow tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded bg-[rgba(72,165,255,0.1)] border border-[rgba(72,165,255,0.3)] mb-6 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#48A5FF] animate-pulse"></span>
              <span className="text-xs sm:text-sm font-command font-bold tracking-[0.22em] text-[#48A5FF] uppercase">
                SMART MICROGRID CYBER DEFENSE
              </span>
            </div>

            {/* Giant Title matching screenshot */}
            <h1 className="font-command font-bold text-5xl sm:text-7xl lg:text-8xl tracking-tight text-white leading-[1.05] mb-6">
              The grid is yours <br />
              <span className="text-[#48A5FF] drop-shadow-[0_0_40px_rgba(72,165,255,0.7)]">
                to defend.
              </span>
            </h1>

            {/* Subtitle matching screenshot */}
            <p className="text-base sm:text-xl text-[#c0c7d4] font-normal leading-relaxed mb-10 max-w-xl">
              An intelligent cyber defense environment for the next generation of connected energy systems.
            </p>

            {/* CTA Button matching screenshot */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={() => handleEnter('topology')}
                onMouseEnter={playHover}
                className="group relative inline-flex items-center justify-between gap-5 px-7 py-4 rounded-xl bg-[#48A5FF] hover:bg-[#3595f5] text-[#070B14] font-command font-bold text-sm sm:text-base tracking-wider uppercase transition-all duration-200 shadow-[0_0_36px_rgba(72,165,255,0.7)] hover:shadow-[0_0_50px_rgba(72,165,255,0.95)] hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>ENTER COMMAND CENTRE</span>
                <span className="w-8 h-8 rounded-full bg-[#070B14]/20 flex items-center justify-center group-hover:translate-x-1.5 transition-transform">
                  <ArrowRight className="w-4 h-4 text-[#070B14]" />
                </span>
              </button>

              <button
                onClick={() => handleEnter('warroom')}
                onMouseEnter={playHover}
                className="inline-flex items-center justify-center gap-2 px-5 py-4 rounded-xl bg-[#0D1422]/85 hover:bg-[#18263D] border border-[rgba(72,165,255,0.3)] hover:border-[#48A5FF] text-xs sm:text-sm font-command font-bold text-[#dfe2f0] transition-all backdrop-blur-md"
              >
                <Flame className="w-4 h-4 text-[#FF405D]" />
                <span>LAUNCH DEFENSE DRILL</span>
              </button>
            </div>

            {/* Quick Live Telemetry Strip under CTA */}
            <div className="mt-12 pt-6 border-t border-[rgba(72,165,255,0.12)] flex items-center gap-6 sm:gap-10 text-xs font-mono-code text-[#8a919d]">
              <div>
                <span className="block text-[10px] text-[#8a919d]">GRID STATUS</span>
                <span className="text-[#35E6A1] font-bold text-sm flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#35E6A1]"></span>
                  SYNCHRONIZED (60.01 Hz)
                </span>
              </div>
              <div className="border-l border-[rgba(72,165,255,0.12)] pl-6 sm:pl-10">
                <span className="block text-[10px] text-[#8a919d]">INTERCEPT SPEED</span>
                <span className="text-[#48A5FF] font-bold text-sm">&lt; 14 ms</span>
              </div>
              <div className="border-l border-[rgba(72,165,255,0.12)] pl-6 sm:pl-10 hidden sm:block">
                <span className="block text-[10px] text-[#8a919d]">STANDBY STORAGE</span>
                <span className="text-[#dfe2f0] font-bold text-sm">30.0 MWh</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OPERATIONAL CAPABILITIES & MODULES SHOWCASE */}
      <section className="py-20 px-6 sm:px-10 lg:px-12 max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs font-command font-bold tracking-widest text-[#48A5FF] uppercase block mb-2">
              TACTICAL CAPABILITIES
            </span>
            <h2 className="text-2xl sm:text-4xl font-command font-bold text-white tracking-tight">
              Engineered for Critical Energy Infrastructure
            </h2>
          </div>
          <p className="text-sm text-[#c0c7d4] max-w-md">
            Defense-grade situational awareness fusing IEC 61850 SCADA telemetry, automated air-gap containment, and synchrophasor PMU synchronization.
          </p>
        </div>

        {/* 4 Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Card 1 */}
          <div
            onClick={() => handleEnter('topology')}
            onMouseEnter={playHover}
            className="hud-card p-6 flex flex-col justify-between cursor-pointer group hover:border-[#48A5FF] transition-all hover:-translate-y-1"
          >
            <div>
              <div className="w-10 h-10 rounded bg-[#18263D] border border-[#48A5FF]/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Radio className="w-5 h-5 text-[#48A5FF]" />
              </div>
              <span className="text-[10px] font-command font-bold text-[#48A5FF] tracking-widest block mb-1">
                MODULE 01
              </span>
              <h3 className="font-command font-bold text-lg text-white mb-2">
                2D/3D Digital Twin Topology
              </h3>
              <p className="text-xs text-[#c0c7d4] leading-relaxed">
                Real-time active reticle mapping of every generator, high-voltage substation switchyard, and battery energy bank.
              </p>
            </div>
            <div className="mt-6 flex items-center gap-1.5 text-xs font-command font-bold text-[#48A5FF]">
              <span>EXPLORE TOPOLOGY</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 2 */}
          <div
            onClick={() => handleEnter('threats')}
            onMouseEnter={playHover}
            className="hud-card p-6 flex flex-col justify-between cursor-pointer group hover:border-[#FF405D] transition-all hover:-translate-y-1"
          >
            <div>
              <div className="w-10 h-10 rounded bg-[rgba(255,64,93,0.15)] border border-[#FF405D]/40 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <ShieldAlert className="w-5 h-5 text-[#FF405D]" />
              </div>
              <span className="text-[10px] font-command font-bold text-[#FF405D] tracking-widest block mb-1">
                MODULE 02
              </span>
              <h3 className="font-command font-bold text-lg text-white mb-2">
                SIEM & Threat Interception
              </h3>
              <p className="text-xs text-[#c0c7d4] leading-relaxed">
                Raw Hex packet dissector for DNP3 and IEC 61850 protocols with automatic zero-day breaker injection mitigation.
              </p>
            </div>
            <div className="mt-6 flex items-center gap-1.5 text-xs font-command font-bold text-[#FF405D]">
              <span>INSPECT THREAT MATRIX</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 3 */}
          <div
            onClick={() => handleEnter('equilibrium')}
            onMouseEnter={playHover}
            className="hud-card p-6 flex flex-col justify-between cursor-pointer group hover:border-[#35E6A1] transition-all hover:-translate-y-1"
          >
            <div>
              <div className="w-10 h-10 rounded bg-[rgba(53,230,161,0.15)] border border-[#35E6A1]/40 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Activity className="w-5 h-5 text-[#35E6A1]" />
              </div>
              <span className="text-[10px] font-command font-bold text-[#35E6A1] tracking-widest block mb-1">
                MODULE 03
              </span>
              <h3 className="font-command font-bold text-lg text-white mb-2">
                60.00 Hz Equilibrium & PMU
              </h3>
              <p className="text-xs text-[#c0c7d4] leading-relaxed">
                Continuous hairline waveform oscilloscope, synchrophasor PMU vector polar scope, and synthetic inertia governor.
              </p>
            </div>
            <div className="mt-6 flex items-center gap-1.5 text-xs font-command font-bold text-[#35E6A1]">
              <span>MONITOR OSCILLOSCOPE</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 4 */}
          <div
            onClick={() => handleEnter('hologram')}
            onMouseEnter={playHover}
            className="hud-card p-6 flex flex-col justify-between cursor-pointer group hover:border-[#48A5FF] transition-all hover:-translate-y-1"
          >
            <div>
              <div className="w-10 h-10 rounded bg-[#18263D] border border-[#48A5FF]/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Layers className="w-5 h-5 text-[#48A5FF]" />
              </div>
              <span className="text-[10px] font-command font-bold text-[#48A5FF] tracking-widest block mb-1">
                MODULE 04
              </span>
              <h3 className="font-command font-bold text-lg text-white mb-2">
                3D Holographic CAD Twin
              </h3>
              <p className="text-xs text-[#c0c7d4] leading-relaxed">
                Interactive rotating 3D autotransformer view with wireframe, infrared thermal heatmap, and Dissolved Gas Analysis.
              </p>
            </div>
            <div className="mt-6 flex items-center gap-1.5 text-xs font-command font-bold text-[#48A5FF]">
              <span>LAUNCH 3D CAD TWIN</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0D1422] border-t border-[rgba(72,165,255,0.12)] px-6 sm:px-12 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono-code text-[#8a919d]">
        <div className="flex items-center gap-3">
          <span className="text-white font-command font-bold">GRIDSHIELD</span>
          <span>© 2026 CRITICAL MICROGRID CYBER DEFENSE</span>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => handleEnter('topology')}
            className="text-[#48A5FF] hover:underline font-command font-semibold"
          >
            ENTER COMMAND CENTRE →
          </button>
        </div>
      </footer>
    </div>
  );
};
