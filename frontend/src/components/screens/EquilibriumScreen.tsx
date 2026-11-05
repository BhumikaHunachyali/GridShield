import React, { useState, useEffect, useRef } from 'react';
import { 
  Activity, 
  Zap, 
  Gauge, 
  RotateCw, 
  Sliders, 
  Compass, 
  Thermometer, 
  ShieldCheck, 
  AlertCircle 
} from 'lucide-react';
import { useSound } from '../../hooks/useSound';

export const EquilibriumScreen: React.FC = () => {
  const { playClick, playHover, playSuccess, playAlert } = useSound();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [frequency, setFrequency] = useState<number>(60.012);
  const [rocof, setRocof] = useState<number>(0.008);
  const [droopSetting, setDroopSetting] = useState<number>(4.0);
  const [syntheticInertiaActive, setSyntheticInertiaActive] = useState<boolean>(true);
  const [phasorAngle, setPhasorAngle] = useState<number>(14.2);

  // Live Canvas Waveform Oscillator
  useEffect(() => {
    let animationFrameId: number;
    let t = 0;

    const renderWave = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const width = canvas.width;
      const height = canvas.height;
      const midY = height / 2;

      ctx.clearRect(0, 0, width, height);

      // Draw faint grid lines
      ctx.strokeStyle = 'rgba(72, 165, 255, 0.08)';
      ctx.lineWidth = 1;
      for (let y = 0; y < height; y += 20) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
      for (let x = 0; x < width; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      // Draw Center Baseline
      ctx.strokeStyle = 'rgba(72, 165, 255, 0.2)';
      ctx.beginPath();
      ctx.moveTo(0, midY);
      ctx.lineTo(width, midY);
      ctx.stroke();

      // Sine Waveform 1 (Voltage)
      ctx.beginPath();
      ctx.strokeStyle = '#48A5FF';
      ctx.lineWidth = 1.5;

      const freqMultiplier = (frequency / 60) * 0.04;
      for (let x = 0; x < width; x++) {
        const y = midY + Math.sin(x * freqMultiplier + t) * (height * 0.32) + (Math.random() - 0.5) * 1.2;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Sine Waveform 2 (Current with phase shift)
      ctx.beginPath();
      ctx.strokeStyle = '#35E6A1';
      ctx.lineWidth = 1.5;
      const shiftRad = (phasorAngle * Math.PI) / 180;
      for (let x = 0; x < width; x++) {
        const y = midY + Math.sin(x * freqMultiplier + t - shiftRad) * (height * 0.24) + (Math.random() - 0.5) * 0.8;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      t += 0.05;
      animationFrameId = requestAnimationFrame(renderWave);
    };

    renderWave();

    // Natural minor fluctuation
    const interval = setInterval(() => {
      setFrequency(59.98 + Math.random() * 0.05);
      setRocof((Math.random() - 0.5) * 0.02);
      setPhasorAngle(12 + Math.random() * 4);
    }, 1800);

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearInterval(interval);
    };
  }, [frequency, phasorAngle]);

  return (
    <div className="p-4 lg:p-6 grid grid-cols-1 lg:grid-cols-12 gap-5 min-h-[calc(100vh-80px)]">
      {/* TOP & LEFT: Waveform Monitor & Frequency Telemetry (8 cols) */}
      <div className="lg:col-span-8 flex flex-col gap-4">
        {/* Main Oscilloscope HUD Card */}
        <div className="hud-card p-4">
          <div className="flex items-center justify-between mb-3 border-b border-[rgba(72,165,255,0.1)] pb-2">
            <div>
              <span className="text-[10px] font-command font-bold uppercase tracking-widest text-[#48A5FF]">
                CONTINUOUS SCADA TELEMETRY
              </span>
              <h2 className="text-base font-command font-bold text-[#dfe2f0]">
                60.00 Hz SYNCHRONOUS OSCILLOSCOPE & PHASE ANGLE
              </h2>
            </div>
            <div className="flex items-center gap-3 text-xs font-mono-code">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-1 bg-[#48A5FF]"></span>
                <span className="text-[#48A5FF]">V-BUS (230kV)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-1 bg-[#35E6A1]"></span>
                <span className="text-[#35E6A1]">I-BUS (CURRENT)</span>
              </div>
            </div>
          </div>

          {/* Oscilloscope Canvas */}
          <div className="relative w-full h-56 bg-[#070B14] rounded border border-[rgba(72,165,255,0.18)] overflow-hidden">
            <canvas
              ref={canvasRef}
              width={800}
              height={220}
              className="w-full h-full block"
            />
            {/* Overlay Telemetry HUD stats */}
            <div className="absolute top-2 left-3 bg-[#0D1422]/80 backdrop-blur-sm px-2.5 py-1 rounded border border-[rgba(72,165,255,0.15)] text-xs font-mono-code">
              <span className="text-[#8a919d]">SYSTEM FREQ: </span>
              <span className="text-[#35E6A1] font-bold text-sm">{frequency.toFixed(3)} Hz</span>
            </div>
            <div className="absolute top-2 right-3 bg-[#0D1422]/80 backdrop-blur-sm px-2.5 py-1 rounded border border-[rgba(72,165,255,0.15)] text-xs font-mono-code">
              <span className="text-[#8a919d]">RoCoF: </span>
              <span className="text-[#48A5FF] font-bold">{rocof > 0 ? `+${rocof.toFixed(3)}` : rocof.toFixed(3)} Hz/s</span>
            </div>
          </div>

          {/* Real-Time Parameter Readouts (Tabular nums) */}
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono-code">
            <div className="p-2.5 bg-[#0D1422] rounded border border-[rgba(72,165,255,0.1)]">
              <span className="text-[10px] text-[#8a919d] block">PHASE JITTER (δ)</span>
              <span className="text-sm font-bold text-[#dfe2f0] tabular-nums">+{phasorAngle.toFixed(1)}°</span>
            </div>
            <div className="p-2.5 bg-[#0D1422] rounded border border-[rgba(72,165,255,0.1)]">
              <span className="text-[10px] text-[#8a919d] block">TOTAL HARMONIC DIST (THD)</span>
              <span className="text-sm font-bold text-[#35E6A1] tabular-nums">1.12%</span>
            </div>
            <div className="p-2.5 bg-[#0D1422] rounded border border-[rgba(72,165,255,0.1)]">
              <span className="text-[10px] text-[#8a919d] block">REACTIVE POWER (MVAR)</span>
              <span className="text-sm font-bold text-[#48A5FF] tabular-nums">18.4 MVAR</span>
            </div>
            <div className="p-2.5 bg-[#0D1422] rounded border border-[rgba(72,165,255,0.1)]">
              <span className="text-[10px] text-[#8a919d] block">POWER FACTOR (cos φ)</span>
              <span className="text-sm font-bold text-[#35E6A1] tabular-nums">0.98 LAG</span>
            </div>
          </div>
        </div>

        {/* Synchrophasor PMU Vectors & Generation Balancing */}
        <div className="hud-card p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-command font-bold uppercase tracking-widest text-[#48A5FF]">
              SYNCHROPHASOR PMU VECTOR SCOPE (IEEE C37.118)
            </span>
            <span className="text-[10px] font-mono-code text-[#35E6A1]">P-CLASS 60 SPS</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Polar Diagram Scope */}
            <div className="p-4 bg-[#070B14] rounded border border-[rgba(72,165,255,0.15)] flex flex-col items-center justify-center relative min-h-[220px]">
              <div className="w-40 h-40 rounded-full border border-[rgba(72,165,255,0.2)] relative flex items-center justify-center">
                <div className="w-24 h-24 rounded-full border border-dashed border-[rgba(72,165,255,0.15)]"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full h-[1px] bg-[rgba(72,165,255,0.15)]"></div>
                  <div className="h-full w-[1px] bg-[rgba(72,165,255,0.15)] absolute"></div>
                </div>

                {/* Phasor Vector 1 (Substation Alpha: 230kV angle 0) */}
                <div
                  className="absolute w-16 h-[2px] bg-[#48A5FF] origin-left shadow-[0_0_8px_#48A5FF]"
                  style={{ transform: `rotate(-${phasorAngle}deg)` }}
                >
                  <span className="absolute right-0 -top-1 w-2 h-2 rounded-full bg-[#48A5FF]"></span>
                </div>

                {/* Phasor Vector 2 (BESS-01: Synthetic Inertia angle +18) */}
                <div
                  className="absolute w-14 h-[2px] bg-[#35E6A1] origin-left shadow-[0_0_8px_#35E6A1]"
                  style={{ transform: `rotate(-${phasorAngle + 18}deg)` }}
                >
                  <span className="absolute right-0 -top-1 w-2 h-2 rounded-full bg-[#35E6A1]"></span>
                </div>
              </div>

              <div className="mt-3 flex items-center gap-4 text-[10px] font-mono-code">
                <span className="text-[#48A5FF]">SUB-A (0.0° ref)</span>
                <span className="text-[#35E6A1]">BESS-1 (+18.4° lead)</span>
              </div>
            </div>

            {/* Droop Response & Synthetic Inertia Controller */}
            <div className="space-y-3 bg-[#0D1422] p-3 rounded border border-[rgba(72,165,255,0.12)]">
              <span className="text-xs font-command font-bold text-[#dfe2f0] block">
                TURBINE GOVERNOR DROOP & BESS SYNTHETIC INERTIA
              </span>

              <div>
                <div className="flex items-center justify-between text-xs font-mono-code mb-1">
                  <span className="text-[#8a919d]">SPEED DROOP RATE</span>
                  <span className="text-[#48A5FF] font-bold">{droopSetting}%</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="6"
                  step="0.5"
                  value={droopSetting}
                  onChange={(e) => {
                    playClick();
                    setDroopSetting(parseFloat(e.target.value));
                  }}
                  className="w-full accent-[#48A5FF] cursor-pointer"
                />
              </div>

              <div className="pt-2 border-t border-[rgba(72,165,255,0.1)] flex items-center justify-between">
                <div>
                  <span className="text-xs font-command font-semibold text-[#dfe2f0] block">
                    BESS SYNTHETIC INERTIA
                  </span>
                  <span className="text-[10px] text-[#8a919d] font-mono-code">
                    Fast frequency response in &lt;18ms
                  </span>
                </div>
                <button
                  onClick={() => {
                    playClick();
                    setSyntheticInertiaActive(!syntheticInertiaActive);
                    playSuccess();
                  }}
                  onMouseEnter={playHover}
                  className={`px-3 py-1.5 rounded text-xs font-command font-bold border transition-all ${
                    syntheticInertiaActive
                      ? 'bg-[rgba(53,230,161,0.15)] text-[#35E6A1] border-[rgba(53,230,161,0.4)] shadow-[0_0_10px_rgba(53,230,161,0.2)]'
                      : 'bg-[#171c25] text-[#8a919d] border-[#404752]'
                  }`}
                >
                  {syntheticInertiaActive ? 'ACTIVE (LOCKED)' : 'DISENGAGED'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT: Transformer Thermal & Load Shedding Switchboard (4 cols) */}
      <div className="lg:col-span-4 flex flex-col gap-4">
        {/* Transformer Telemetry Table */}
        <div className="hud-card p-4">
          <div className="flex items-center justify-between mb-3 border-b border-[rgba(72,165,255,0.1)] pb-2">
            <span className="text-[10px] font-command font-bold uppercase tracking-widest text-[#48A5FF]">
              MAIN TRANSFORMER FLEET STATUS
            </span>
            <span className="text-[10px] font-mono-code text-[#dfe2f0]">TX-01 // TX-04</span>
          </div>

          <div className="space-y-2 text-xs font-mono-code">
            {[
              { id: 'TX-01 (Sub Alpha)', oilTemp: '54.2°C', windingTemp: '68.1°C', gasPressure: '6.2 bar', status: 'NOMINAL' },
              { id: 'TX-02 (Sub Beta)', oilTemp: '78.9°C', windingTemp: '94.2°C', gasPressure: '5.8 bar', status: 'WARNING' },
              { id: 'TX-03 (BESS Step)', oilTemp: '38.4°C', windingTemp: '42.0°C', gasPressure: '6.4 bar', status: 'NOMINAL' },
            ].map((tx) => (
              <div
                key={tx.id}
                className="p-2.5 rounded bg-[#0D1422] border border-[rgba(72,165,255,0.08)] flex items-center justify-between"
              >
                <div>
                  <span className="font-bold text-[#dfe2f0] block">{tx.id}</span>
                  <span className="text-[10px] text-[#8a919d]">
                    Oil: {tx.oilTemp} | Wind: {tx.windingTemp}
                  </span>
                </div>
                <div className="text-right">
                  <span
                    className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                      tx.status === 'WARNING'
                        ? 'bg-[#F4C95D]/20 text-[#F4C95D] border border-[#F4C95D]/40'
                        : 'bg-[#35E6A1]/20 text-[#35E6A1] border border-[#35E6A1]/40'
                    }`}
                  >
                    {tx.status}
                  </span>
                  <span className="block text-[10px] text-[#8a919d] mt-1">{tx.gasPressure}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Automated Under-Frequency Load Shedding (UFLS) Matrix */}
        <div className="hud-card p-4 flex-1">
          <div className="flex items-center justify-between mb-3 border-b border-[rgba(72,165,255,0.1)] pb-2">
            <div>
              <span className="text-[10px] font-command font-bold uppercase tracking-widest text-[#48A5FF]">
                DEFENSIVE AUTOMATION
              </span>
              <h3 className="font-command font-bold text-sm text-[#dfe2f0]">
                UNDER-FREQUENCY LOAD SHEDDING (UFLS)
              </h3>
            </div>
            <ShieldCheck className="w-4 h-4 text-[#35E6A1]" />
          </div>

          <p className="text-xs text-[#c0c7d4] mb-3">
            Automatic tiered breaker shedding triggered if regional bulk frequency decays below critical thresholds:
          </p>

          <div className="space-y-2 text-xs font-mono-code">
            <div className="p-2 rounded bg-[#0D1422] border border-[rgba(72,165,255,0.1)] flex items-center justify-between">
              <div>
                <span className="text-[#dfe2f0] font-bold">STAGE 1: 59.50 Hz</span>
                <span className="block text-[10px] text-[#8a919d]">Non-essential industrial pump feeder (12 MW)</span>
              </div>
              <span className="text-[#35E6A1] font-bold text-[10px] px-2 py-0.5 rounded bg-[#35E6A1]/10">ARMED</span>
            </div>

            <div className="p-2 rounded bg-[#0D1422] border border-[rgba(72,165,255,0.1)] flex items-center justify-between">
              <div>
                <span className="text-[#dfe2f0] font-bold">STAGE 2: 59.20 Hz</span>
                <span className="block text-[10px] text-[#8a919d]">Substation Gamma Commercial Bus (18 MW)</span>
              </div>
              <span className="text-[#35E6A1] font-bold text-[10px] px-2 py-0.5 rounded bg-[#35E6A1]/10">ARMED</span>
            </div>

            <div className="p-2 rounded bg-[#0D1422] border border-[rgba(72,165,255,0.1)] flex items-center justify-between">
              <div>
                <span className="text-[#dfe2f0] font-bold">STAGE 3: 58.80 Hz</span>
                <span className="block text-[10px] text-[#8a919d]">TOTAL MICROGRID ISLAND SEPARATION</span>
              </div>
              <span className="text-[#FF405D] font-bold text-[10px] px-2 py-0.5 rounded bg-[#FF405D]/10">CRITICAL</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
