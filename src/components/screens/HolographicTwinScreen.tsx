import React, { useState } from 'react';
import { 
  Layers, 
  RotateCw, 
  Eye, 
  EyeOff, 
  Zap, 
  Thermometer, 
  Activity, 
  Cpu, 
  CheckCircle2, 
  AlertTriangle 
} from 'lucide-react';
import { useSound } from '../../hooks/useSound';

interface Hotspot {
  id: string;
  name: string;
  x: number; // percentage
  y: number; // percentage
  status: 'nominal' | 'warning' | 'alert';
  metric: string;
  detail: string;
}

export const HolographicTwinScreen: React.FC = () => {
  const { playClick, playNodeSelect, playHover, playSuccess } = useSound();
  const [wireframeMode, setWireframeMode] = useState<boolean>(false);
  const [thermalMode, setThermalMode] = useState<boolean>(false);
  const [emFluxActive, setEmFluxActive] = useState<boolean>(true);
  const [rotationAngle, setRotationAngle] = useState<number>(15);
  const [selectedHotspotId, setSelectedHotspotId] = useState<string>('bushing');

  const hotspots: Hotspot[] = [
    {
      id: 'bushing',
      name: 'High-Voltage 230kV Bushing A',
      x: 36,
      y: 24,
      status: 'nominal',
      metric: 'PD: 3.8 pC',
      detail: 'Dielectric dissipation factor tan δ = 0.0034. Partial discharge sensor within IEC limits.',
    },
    {
      id: 'oltc',
      name: 'On-Load Tap Changer (OLTC)',
      x: 64,
      y: 44,
      status: 'nominal',
      metric: 'Position: Step 10 (+1.25%)',
      detail: 'Vacuum interrupter contacts wear index: 12.4%. Motor drive operational.',
    },
    {
      id: 'breaker',
      name: 'SF6 High-Speed Circuit Breaker',
      x: 26,
      y: 56,
      status: 'warning',
      metric: 'Pressure: 5.82 bar',
      detail: 'Slight gas pressure decline. Moisture level: 42 ppm. Trip coil 1 & 2 continuity verified.',
    },
    {
      id: 'cooling',
      name: 'Radiator Fin Bank & Dual Fans',
      x: 74,
      y: 62,
      status: 'nominal',
      metric: 'Flow: 140 m³/h',
      detail: 'Forced air banks 1 & 2 operational. Top oil temperature 58.4°C.',
    },
    {
      id: 'rtu',
      name: 'Substation Micro-RTU / Merging Unit',
      x: 48,
      y: 68,
      status: 'nominal',
      metric: 'Link: 1 Gbps Fiber',
      detail: 'IEC 61850-9-2 Sampled Values stream synced with IEEE 1588 PTP master clock.',
    },
  ];

  const selectedHotspot = hotspots.find((h) => h.id === selectedHotspotId) || hotspots[0];

  return (
    <div className="p-4 lg:p-6 grid grid-cols-1 lg:grid-cols-12 gap-5 min-h-[calc(100vh-80px)]">
      {/* LEFT & CENTER: Holographic 3D CAD Viewport (8 cols) */}
      <div className="lg:col-span-8 flex flex-col gap-4">
        <div className="hud-card p-4 flex-1 flex flex-col relative overflow-hidden bg-[#070B14]">
          {/* Top Viewport Header */}
          <div className="flex items-center justify-between mb-3 border-b border-[rgba(72,165,255,0.1)] pb-2 z-10">
            <div>
              <span className="text-[10px] font-command font-bold uppercase tracking-widest text-[#48A5FF]">
                DIGITAL TWIN CAD HOLOGRAPH
              </span>
              <h2 className="text-sm sm:text-base font-command font-bold text-[#dfe2f0]">
                SUBSTATION TX-04 // 230kV / 34.5kV 120MVA AUTOTRANSFORMER
              </h2>
            </div>

            {/* View Layer Toggles */}
            <div className="flex items-center gap-1.5 bg-[#0D1422] p-1 rounded border border-[rgba(72,165,255,0.15)] text-[11px] font-command">
              <button
                onClick={() => {
                  playClick();
                  setWireframeMode(!wireframeMode);
                }}
                className={`px-2.5 py-1 rounded transition-all ${
                  wireframeMode ? 'bg-[#18263D] text-[#48A5FF] font-bold' : 'text-[#8a919d]'
                }`}
              >
                WIREFRAME
              </button>
              <button
                onClick={() => {
                  playClick();
                  setThermalMode(!thermalMode);
                }}
                className={`px-2.5 py-1 rounded transition-all ${
                  thermalMode ? 'bg-[#FF405D]/20 text-[#FF405D] font-bold' : 'text-[#8a919d]'
                }`}
              >
                THERMAL IR
              </button>
              <button
                onClick={() => {
                  playClick();
                  setEmFluxActive(!emFluxActive);
                }}
                className={`px-2.5 py-1 rounded transition-all ${
                  emFluxActive ? 'bg-[#35E6A1]/20 text-[#35E6A1] font-bold' : 'text-[#8a919d]'
                }`}
              >
                FLUX LINES
              </button>
            </div>
          </div>

          {/* Interactive Holographic Canvas / SVG Area */}
          <div className="relative flex-1 min-h-[460px] bg-tactical-grid rounded border border-[rgba(72,165,255,0.12)] flex items-center justify-center overflow-hidden select-none">
            {/* Ambient Depth Grid */}
            <div className="absolute inset-0 bg-tactical-dots opacity-40 pointer-events-none"></div>

            {/* Rotating 3D Transformer Isometric Model */}
            <div
              className="relative w-80 h-80 sm:w-96 sm:h-96 transition-transform duration-500 ease-out flex items-center justify-center"
              style={{ transform: `rotateY(${rotationAngle}deg)` }}
            >
              <svg viewBox="0 0 400 400" className="w-full h-full drop-shadow-[0_0_25px_rgba(72,165,255,0.3)]">
                {/* Electromagnetic Flux Field rings if enabled */}
                {emFluxActive && (
                  <g className="animate-pulse" opacity="0.4">
                    <ellipse cx="200" cy="200" rx="160" ry="80" fill="none" stroke="#35E6A1" strokeWidth="1" strokeDasharray="4 8" />
                    <ellipse cx="200" cy="200" rx="130" ry="65" fill="none" stroke="#48A5FF" strokeWidth="1" strokeDasharray="3 6" />
                    <ellipse cx="200" cy="200" rx="100" ry="50" fill="none" stroke="#48A5FF" strokeWidth="1.5" />
                  </g>
                )}

                {/* Base Isometric Plinth */}
                <polygon
                  points="200,320 340,250 200,180 60,250"
                  fill={thermalMode ? '#261214' : wireframeMode ? 'none' : '#0D1422'}
                  stroke={wireframeMode ? '#48A5FF' : '#48A5FF'}
                  strokeWidth="1.5"
                  strokeOpacity="0.8"
                />

                {/* Transformer Main Tank Body (Isometric Box) */}
                <g>
                  {/* Left Face */}
                  <polygon
                    points="110,240 200,285 200,170 110,125"
                    fill={thermalMode ? '#8a2b38' : wireframeMode ? 'none' : '#111C2D'}
                    stroke={wireframeMode ? '#48A5FF' : '#48A5FF'}
                    strokeWidth="1.5"
                    strokeOpacity="0.9"
                  />
                  {/* Right Face */}
                  <polygon
                    points="200,285 290,240 290,125 200,170"
                    fill={thermalMode ? '#bd3a42' : wireframeMode ? 'none' : '#18263D'}
                    stroke={wireframeMode ? '#48A5FF' : '#48A5FF'}
                    strokeWidth="1.5"
                    strokeOpacity="0.9"
                  />
                  {/* Top Tank Cover */}
                  <polygon
                    points="200,170 290,125 200,80 110,125"
                    fill={thermalMode ? '#ff5252' : wireframeMode ? 'none' : '#1f2e47'}
                    stroke={wireframeMode ? '#48A5FF' : '#48A5FF'}
                    strokeWidth="1.5"
                    strokeOpacity="1"
                  />
                </g>

                {/* Radiator Cooling Fins (Right side) */}
                <g stroke="#48A5FF" strokeWidth="1" opacity="0.7">
                  <line x1="295" y1="140" x2="330" y2="125" />
                  <line x1="295" y1="160" x2="330" y2="145" />
                  <line x1="295" y1="180" x2="330" y2="165" />
                  <line x1="295" y1="200" x2="330" y2="185" />
                  <line x1="295" y1="220" x2="330" y2="205" />
                  <line x1="330" y1="125" x2="330" y2="205" />
                </g>

                {/* 3 High-Voltage 230kV Bushings on Top */}
                <g stroke="#35E6A1" strokeWidth="2">
                  {/* Bushing 1 */}
                  <line x1="145" y1="110" x2="145" y2="40" />
                  <circle cx="145" cy="40" r="4" fill="#35E6A1" />
                  <ellipse cx="145" cy="60" rx="8" ry="3" fill="none" />
                  <ellipse cx="145" cy="75" rx="10" ry="3.5" fill="none" />

                  {/* Bushing 2 (Center) */}
                  <line x1="200" y1="125" x2="200" y2="30" />
                  <circle cx="200" cy="30" r="5" fill="#48A5FF" stroke="#48A5FF" />
                  <ellipse cx="200" cy="55" rx="9" ry="3" fill="none" stroke="#48A5FF" />
                  <ellipse cx="200" cy="75" rx="11" ry="4" fill="none" stroke="#48A5FF" />

                  {/* Bushing 3 */}
                  <line x1="255" y1="110" x2="255" y2="40" />
                  <circle cx="255" cy="40" r="4" fill="#35E6A1" />
                  <ellipse cx="255" cy="60" rx="8" ry="3" fill="none" />
                  <ellipse cx="255" cy="75" rx="10" ry="3.5" fill="none" />
                </g>

                {/* Oil Conservator Tank (Cylinder above) */}
                <ellipse cx="150" cy="85" rx="20" ry="8" fill="#18263D" stroke="#48A5FF" strokeWidth="1.2" />
                <line x1="130" y1="85" x2="130" y2="105" stroke="#48A5FF" strokeWidth="1.2" />
                <line x1="170" y1="85" x2="170" y2="105" stroke="#48A5FF" strokeWidth="1.2" />
                <ellipse cx="150" cy="105" rx="20" ry="8" fill="#111C2D" stroke="#48A5FF" strokeWidth="1.2" />
              </svg>
            </div>

            {/* Interactive Component Hotspots */}
            {hotspots.map((h) => {
              const isSelected = h.id === selectedHotspotId;
              const isWarning = h.status === 'warning';

              return (
                <div
                  key={h.id}
                  onClick={() => {
                    playNodeSelect();
                    setSelectedHotspotId(h.id);
                  }}
                  onMouseEnter={playHover}
                  style={{ left: `${h.x}%`, top: `${h.y}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-30 group"
                >
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center border transition-all ${
                      isSelected
                        ? 'bg-[#48A5FF] border-white shadow-[0_0_16px_#48A5FF] scale-125'
                        : isWarning
                        ? 'bg-[#F4C95D] border-white shadow-[0_0_12px_#F4C95D] animate-bounce'
                        : 'bg-[#111C2D] border-[#35E6A1] text-[#35E6A1] hover:scale-110'
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full bg-[#070B14]"></span>
                  </div>

                  <span
                    className={`mt-1 px-1.5 py-0.5 rounded text-[9px] font-command font-bold whitespace-nowrap block border backdrop-blur-md ${
                      isSelected
                        ? 'bg-[#18263D] text-[#48A5FF] border-[#48A5FF]'
                        : 'bg-[#0D1422]/90 text-[#dfe2f0] border-[rgba(72,165,255,0.2)]'
                    }`}
                  >
                    {h.name.split(' ')[0]}
                  </span>
                </div>
              );
            })}

            {/* Rotation Slider & Reset Controls */}
            <div className="absolute bottom-3 left-3 flex items-center gap-2 bg-[#0D1422]/90 backdrop-blur-sm p-2 rounded border border-[rgba(72,165,255,0.15)] text-xs font-mono-code z-20">
              <span className="text-[#8a919d]">AZIMUTH:</span>
              <input
                type="range"
                min="-60"
                max="60"
                value={rotationAngle}
                onChange={(e) => setRotationAngle(parseInt(e.target.value))}
                className="w-24 accent-[#48A5FF] cursor-pointer"
              />
              <span className="text-[#dfe2f0] font-bold">{rotationAngle}°</span>
              <button
                onClick={() => {
                  playClick();
                  setRotationAngle(15);
                }}
                className="p-1 rounded hover:bg-[#18263D] text-[#48A5FF]"
                title="Reset Rotation"
              >
                <RotateCw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT: Component Diagnostics & DGA Analysis (4 cols) */}
      <div className="lg:col-span-4 flex flex-col gap-4">
        {/* Selected Component Diagnostics Card */}
        <div className="hud-card p-4">
          <div className="flex items-center justify-between mb-3 border-b border-[rgba(72,165,255,0.1)] pb-2">
            <div>
              <span className="text-[10px] font-command font-bold uppercase tracking-widest text-[#48A5FF]">
                HOTSPOT DIAGNOSTICS
              </span>
              <h3 className="font-command font-bold text-sm text-[#dfe2f0]">{selectedHotspot.name}</h3>
            </div>
            <span
              className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                selectedHotspot.status === 'warning'
                  ? 'bg-[#F4C95D]/20 text-[#F4C95D] border border-[#F4C95D]/40'
                  : 'bg-[#35E6A1]/20 text-[#35E6A1] border border-[#35E6A1]/40'
              }`}
            >
              {selectedHotspot.status.toUpperCase()}
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-2.5 rounded bg-[#0D1422] border border-[rgba(72,165,255,0.1)] font-mono-code">
              <span className="text-[10px] text-[#8a919d] block">CURRENT TELEMETRY READING</span>
              <span className="text-base font-bold text-[#48A5FF]">{selectedHotspot.metric}</span>
            </div>

            <p className="text-xs text-[#c0c7d4] leading-relaxed bg-[#0D1422] p-2.5 rounded border border-[rgba(72,165,255,0.08)]">
              {selectedHotspot.detail}
            </p>

            <button
              onClick={() => {
                playSuccess();
              }}
              onMouseEnter={playHover}
              className="w-full py-2 px-3 rounded bg-[#18263D] hover:bg-[#263753] border border-[#48A5FF]/40 text-[#48A5FF] font-command font-bold text-xs flex items-center justify-center gap-1.5 transition-all"
            >
              <Activity className="w-3.5 h-3.5" />
              <span>TRIGGER HIGH-SPEED MERGING UNIT SELF-TEST</span>
            </button>
          </div>
        </div>

        {/* Transformer Oil Dissolved Gas Analysis (DGA) */}
        <div className="hud-card p-4 flex-1">
          <div className="flex items-center justify-between mb-3 border-b border-[rgba(72,165,255,0.1)] pb-2">
            <div>
              <span className="text-[10px] font-command font-bold uppercase tracking-widest text-[#48A5FF]">
                DIELECTRIC CHEMICAL SENSORS
              </span>
              <h4 className="font-command font-bold text-xs text-[#dfe2f0]">
                DISSOLVED GAS ANALYSIS (IEEE C57.104)
              </h4>
            </div>
            <span className="text-[10px] font-mono-code text-[#35E6A1]">GAS CHROMATOGRAPH</span>
          </div>

          <div className="space-y-2 text-xs font-mono-code">
            {[
              { gas: 'Hydrogen (H2)', value: '18 ppm', normal: '< 100 ppm', status: 'OK' },
              { gas: 'Methane (CH4)', value: '12 ppm', normal: '< 120 ppm', status: 'OK' },
              { gas: 'Acetylene (C2H2)', value: '0 ppm', normal: '< 1 ppm (Arcing)', status: 'OK' },
              { gas: 'Ethylene (C2H4)', value: '24 ppm', normal: '< 50 ppm', status: 'OK' },
              { gas: 'Carbon Monoxide (CO)', value: '280 ppm', normal: '< 350 ppm', status: 'OK' },
            ].map((d) => (
              <div
                key={d.gas}
                className="p-2 rounded bg-[#0D1422] border border-[rgba(72,165,255,0.08)] flex items-center justify-between"
              >
                <div>
                  <span className="text-[#dfe2f0] font-bold block">{d.gas}</span>
                  <span className="text-[10px] text-[#8a919d]">Threshold: {d.normal}</span>
                </div>
                <div className="text-right">
                  <span className="text-[#35E6A1] font-bold text-sm block">{d.value}</span>
                  <span className="text-[9px] text-[#8a919d]">PASSED</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
