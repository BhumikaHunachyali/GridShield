import React from 'react';
import { 
  ShieldAlert, 
  Volume2, 
  VolumeX, 
  Radio, 
  Activity, 
  Cpu, 
  Zap, 
  Layers, 
  Crosshair, 
  Flame, 
  ArrowLeft 
} from 'lucide-react';
import { useSound } from '../hooks/useSound';

export type ScreenId = 'frontpage' | 'topology' | 'threats' | 'equilibrium' | 'hologram' | 'warroom';

interface HeaderHUDProps {
  currentScreen: ScreenId;
  onScreenChange: (screen: ScreenId) => void;
  islandModeActive: boolean;
  onToggleIslandMode: () => void;
  activeAlertCount: number;
}

export const HeaderHUD: React.FC<HeaderHUDProps> = ({
  currentScreen,
  onScreenChange,
  islandModeActive,
  onToggleIslandMode,
  activeAlertCount,
}) => {
  const { isMuted, toggleMute, playClick, playPageTransition, playHover, playAlert } = useSound();

  const handleNav = (screen: ScreenId) => {
    if (screen === currentScreen) return;
    playPageTransition();
    onScreenChange(screen);
  };

  const navItems: { id: ScreenId; label: string; code: string; icon: React.ReactNode }[] = [
    { id: 'topology', label: 'DIGITAL TWIN', code: '01', icon: <Radio className="w-3.5 h-3.5" /> },
    { id: 'threats', label: 'THREAT MATRIX', code: '02', icon: <ShieldAlert className="w-3.5 h-3.5" /> },
    { id: 'equilibrium', label: 'SCADA EQUILIBRIUM', code: '03', icon: <Activity className="w-3.5 h-3.5" /> },
    { id: 'hologram', label: '3D CAD TWIN', code: '04', icon: <Layers className="w-3.5 h-3.5" /> },
    { id: 'warroom', label: 'WAR ROOM DRILLS', code: '05', icon: <Flame className="w-3.5 h-3.5" /> },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#070B14]/95 backdrop-blur-md border-b border-[rgba(72,165,255,0.18)] select-none">
      {/* Top telemetry ticker strip */}
      <div className="bg-[#0D1422] border-b border-[rgba(72,165,255,0.08)] px-4 py-1 flex items-center justify-between text-[11px] font-mono-code text-[#c0c7d4]/80">
        <div className="flex items-center gap-6 overflow-x-auto whitespace-nowrap scrollbar-none">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#35E6A1] animate-pulse"></span>
            <span className="text-[#35E6A1] font-semibold">GRID TELEMETRY: SYNCED</span>
          </div>
          <div className="hidden sm:inline">
            <span className="text-[#8a919d]">SYSTEM FREQ: </span>
            <span className="text-[#48A5FF] font-semibold">60.012 Hz [NOMINAL]</span>
          </div>
          <div className="hidden md:inline">
            <span className="text-[#8a919d]">AGGREGATE LOAD: </span>
            <span className="text-[#dfe2f0]">264.8 MW / 325.0 MW</span>
          </div>
          <div className="hidden lg:inline">
            <span className="text-[#8a919d]">SCADA INTEGRITY: </span>
            <span className="text-[#35E6A1]">98.4% SHA-256</span>
          </div>
          <div className="hidden xl:inline">
            <span className="text-[#8a919d]">PMU TIME SYNC: </span>
            <span className="text-[#48A5FF]">GPS-L1 LOCKED (±0.02ms)</span>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono-code shrink-0">
          <span className="text-[#c0c7d4] text-[10px] hidden sm:inline">SEC-LEVEL 4 // OP-CENTER</span>
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-[rgba(255,64,93,0.12)] border border-[rgba(255,64,93,0.3)] text-[#FF405D] text-[11px] font-command">
            <Crosshair className="w-3 h-3 animate-spin" />
            <span>DEFCON 2</span>
          </div>
        </div>
      </div>

      {/* Main command bar */}
      <div className="px-4 py-2.5 flex items-center justify-between gap-4">
        {/* Brand identity & Back to Front Page button */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => handleNav('frontpage')}
            onMouseEnter={playHover}
            title="Return to Front Page"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded bg-[#0D1422] hover:bg-[#18263D] border border-[rgba(72,165,255,0.25)] hover:border-[#48A5FF] text-xs font-command font-bold text-[#48A5FF] transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">FRONT PAGE</span>
          </button>

          <div 
            onClick={() => handleNav('topology')}
            className="flex items-center gap-2.5 cursor-pointer"
          >
            <div className="w-8 h-8 rounded bg-[#111C2D] border border-[#48A5FF]/40 flex items-center justify-center relative shadow-[0_0_10px_rgba(72,165,255,0.25)]">
              <Zap className="w-4 h-4 text-[#48A5FF]" />
              <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#35E6A1] ring-2 ring-[#070B14]"></div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-command font-bold text-sm sm:text-base tracking-wider text-[#dfe2f0]">
                  COMMAND CENTRE
                </span>
              </div>
              <p className="text-[9px] text-[#8a919d] tracking-wider uppercase font-mono-code hidden sm:block">
                Operations & Defense HUD
              </p>
            </div>
          </div>
        </div>

        {/* Tactical Screen Navigation Tabs */}
        <nav className="hidden lg:flex items-center gap-1 bg-[#0D1422] p-1 rounded border border-[rgba(72,165,255,0.12)]">
          {navItems.map((item) => {
            const active = currentScreen === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                onMouseEnter={playHover}
                className={`relative px-3 py-1.5 rounded transition-all duration-150 flex items-center gap-2 text-xs font-command font-semibold tracking-wide ${
                  active
                    ? 'bg-[#18263D] text-[#48A5FF] border border-[#48A5FF]/40 shadow-[0_0_12px_rgba(72,165,255,0.25)]'
                    : 'text-[#c0c7d4]/80 hover:text-[#dfe2f0] hover:bg-[#111C2D]'
                }`}
              >
                {item.icon}
                <span>
                  <span className="text-[10px] opacity-60 mr-1">{item.code}</span>
                  {item.label}
                </span>
                {item.id === 'threats' && activeAlertCount > 0 && (
                  <span className="ml-1 px-1.5 py-0.2 rounded-full text-[9px] font-bold bg-[#FF405D] text-white animate-pulse">
                    {activeAlertCount}
                  </span>
                )}
                {active && (
                  <span className="absolute bottom-0 left-2 right-2 h-[2px] bg-[#48A5FF] rounded-full shadow-[0_0_8px_#48A5FF]"></span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Global Controls: Island Mode & Sound Synthesizer */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Sound FX Mute Toggle Button */}
          <button
            onClick={toggleMute}
            onMouseEnter={playHover}
            title={isMuted ? 'Tactical HUD Audio: MUTED (Click to Unmute)' : 'Tactical HUD Audio: ACTIVE (Click to Mute)'}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded text-xs font-command font-medium border transition-all ${
              isMuted
                ? 'bg-[#171c25] border-white/10 text-[#8a919d] hover:text-white hover:border-white/30'
                : 'bg-[#111C2D] border-[#48A5FF]/40 text-[#48A5FF] shadow-[0_0_10px_rgba(72,165,255,0.2)]'
            }`}
          >
            {isMuted ? (
              <>
                <VolumeX className="w-3.5 h-3.5 text-[#FF405D]" />
                <span className="hidden sm:inline text-[11px] text-[#8a919d]">MUTED</span>
              </>
            ) : (
              <>
                <Volume2 className="w-3.5 h-3.5 text-[#35E6A1] animate-bounce" />
                <span className="hidden sm:inline text-[11px] text-[#35E6A1]">AUDIO ON</span>
              </>
            )}
          </button>

          {/* Island Mode Emergency Toggle */}
          <button
            onClick={() => {
              playClick();
              if (!islandModeActive) {
                playAlert();
              }
              onToggleIslandMode();
            }}
            onMouseEnter={playHover}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-command font-bold tracking-wider border transition-all ${
              islandModeActive
                ? 'bg-[#FF405D] text-white border-[#FF405D] shadow-[0_0_18px_rgba(255,64,93,0.6)] animate-pulse'
                : 'bg-[#111C2D] text-[#dfe2f0] border-[rgba(72,165,255,0.25)] hover:border-[#48A5FF] hover:bg-[#18263D]'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{islandModeActive ? 'ISLAND: ENGAGED' : 'ENGAGE ISLAND'}</span>
            <span className="sm:hidden">{islandModeActive ? 'ISLAND' : 'ISLAND'}</span>
          </button>
        </div>
      </div>

      {/* Mobile/Tablet Screen Navigation Bar */}
      <div className="lg:hidden px-3 py-1.5 bg-[#0D1422] border-t border-[rgba(72,165,255,0.1)] flex items-center justify-between gap-1 overflow-x-auto scrollbar-none">
        {navItems.map((item) => {
          const active = currentScreen === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleNav(item.id)}
              onMouseEnter={playHover}
              className={`px-2.5 py-1 rounded whitespace-nowrap text-[11px] font-command font-semibold flex items-center gap-1.5 ${
                active
                  ? 'bg-[#18263D] text-[#48A5FF] border border-[#48A5FF]/40'
                  : 'text-[#c0c7d4]/80'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
              {item.id === 'threats' && activeAlertCount > 0 && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF405D]"></span>
              )}
            </button>
          );
        })}
      </div>
    </header>
  );
};
