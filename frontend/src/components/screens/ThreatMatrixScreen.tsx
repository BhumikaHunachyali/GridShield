import React, { useState } from 'react';
import { 
  ShieldAlert, 
  ShieldCheck, 
  Terminal, 
  Filter, 
  Lock, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight, 
  Bug, 
  FileText, 
  RefreshCw, 
  Binary 
} from 'lucide-react';
import { SIEMAlert } from '../../types/grid';
import { useSound } from '../../hooks/useSound';

interface ThreatMatrixScreenProps {
  alerts: SIEMAlert[];
  onQuarantineAlert: (id: string) => void;
  onContainAlert: (id: string) => void;
}

export const ThreatMatrixScreen: React.FC<ThreatMatrixScreenProps> = ({
  alerts,
  onQuarantineAlert,
  onContainAlert,
}) => {
  const { playClick, playAlert, playSuccess, playHover, playKeypress } = useSound();
  const [selectedAlertId, setSelectedAlertId] = useState<string>(alerts[0]?.id || '');
  const [filterSeverity, setFilterSeverity] = useState<string>('ALL');
  const [activeTab, setActiveTab] = useState<'hex' | 'mitre' | 'forensics'>('hex');
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    '[INIT] ICS-Snort & Zeek Engine v4.8 active on eth0/scada',
    '[ANALYSIS] Deep Packet Inspection (DPI) enabled for IEC 61850 & DNP3',
    '[ALARM] Packet injection signature detected on TCP port 20000 (DNP3 Outstation)',
  ]);

  const selectedAlert = alerts.find((a) => a.id === selectedAlertId) || alerts[0];

  const filteredAlerts = alerts.filter((a) => {
    if (filterSeverity === 'ALL') return true;
    return a.severity === filterSeverity;
  });

  const handleInjectRule = () => {
    playKeypress();
    setTimeout(() => {
      playSuccess();
      setTerminalLogs((prev) => [
        `[FIREWALL] Injected DROP rule for src: ${selectedAlert.sourceIp} on port 20000`,
        `[HASH] Rule signed by Operator ID: SEC-OP-8491`,
        ...prev,
      ]);
      onContainAlert(selectedAlert.id);
    }, 300);
  };

  const handleQuarantineSubnet = () => {
    playClick();
    onQuarantineAlert(selectedAlert.id);
    setTerminalLogs((prev) => [
      `[QUARANTINE] Subnet isolated. ARP poison mitigation engaged.`,
      ...prev,
    ]);
  };

  // MITRE ICS Techniques Heatmap
  const mitreTechniques = [
    { code: 'T0855', name: 'Unauthorized Command', category: 'Impair Process Control', active: true, count: 4 },
    { code: 'T0813', name: 'Denial of Control', category: 'Inhibit Response Function', active: false, count: 0 },
    { code: 'T0831', name: 'Manipulation of Control', category: 'Impair Process Control', active: true, count: 2 },
    { code: 'T0882', name: 'Theft of Operational Data', category: 'Collection', active: false, count: 0 },
    { code: 'T0814', name: 'Denial of Service (GOOSE)', category: 'Network Effects', active: true, count: 1 },
    { code: 'T0800', name: 'Activate Firmware Flash', category: 'Impact', active: false, count: 0 },
  ];

  return (
    <div className="p-4 lg:p-6 grid grid-cols-1 lg:grid-cols-12 gap-5 min-h-[calc(100vh-80px)]">
      {/* LEFT: SIEM Alert Incident Queue (4 cols) */}
      <div className="lg:col-span-4 flex flex-col gap-4">
        <div className="hud-card p-4 flex-1 flex flex-col">
          <div className="flex items-center justify-between mb-3">
            <div>
              <span className="text-[10px] font-command font-bold uppercase tracking-widest text-[#48A5FF]">
                SIEM INTRUSION ENGINE
              </span>
              <h2 className="text-sm font-command font-bold text-[#dfe2f0]">ACTIVE INCIDENT QUEUE</h2>
            </div>
            <button
              onClick={() => {
                playClick();
                playAlert();
              }}
              onMouseEnter={playHover}
              className="p-1 rounded bg-[#0D1422] border border-[rgba(72,165,255,0.2)] text-[#48A5FF] hover:bg-[#18263D]"
              title="Rescan Intrusion Signatures"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Severity Filter Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-[#0D1422] rounded border border-[rgba(72,165,255,0.1)] text-[10px] font-command font-semibold mb-3">
            {['ALL', 'CRITICAL', 'WARNING', 'INFO'].map((sev) => (
              <button
                key={sev}
                onClick={() => {
                  playClick();
                  setFilterSeverity(sev);
                }}
                onMouseEnter={playHover}
                className={`flex-1 py-1 rounded text-center transition-all ${
                  filterSeverity === sev
                    ? 'bg-[#18263D] text-[#48A5FF] border border-[#48A5FF]/40'
                    : 'text-[#8a919d] hover:text-[#dfe2f0]'
                }`}
              >
                {sev}
              </button>
            ))}
          </div>

          {/* Alert Item Feed */}
          <div className="space-y-2 flex-1 overflow-y-auto pr-1 max-h-[500px]">
            {filteredAlerts.map((alert) => {
              const isSelected = alert.id === selectedAlert.id;
              const isCritical = alert.severity === 'CRITICAL';
              const isWarning = alert.severity === 'WARNING';

              return (
                <div
                  key={alert.id}
                  onClick={() => {
                    playClick();
                    setSelectedAlertId(alert.id);
                  }}
                  onMouseEnter={playHover}
                  className={`p-3 rounded border transition-all cursor-pointer relative ${
                    isSelected
                      ? 'bg-[#18263D] border-[#48A5FF] shadow-[0_0_14px_rgba(72,165,255,0.25)]'
                      : isCritical
                      ? 'bg-[#111C2D] border-[rgba(255,64,93,0.4)] hover:border-[#FF405D]'
                      : 'bg-[#111C2D]/80 border-[rgba(72,165,255,0.12)] hover:border-[rgba(72,165,255,0.35)]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-command font-bold text-xs text-[#dfe2f0]">
                      {alert.threatType}
                    </span>
                    <span
                      className={`text-[9px] font-command font-bold px-1.5 py-0.5 rounded ${
                        isCritical
                          ? 'bg-[#FF405D]/20 text-[#FF405D] border border-[#FF405D]/40'
                          : isWarning
                          ? 'bg-[#F4C95D]/20 text-[#F4C95D] border border-[#F4C95D]/40'
                          : 'bg-[#35E6A1]/20 text-[#35E6A1] border border-[#35E6A1]/40'
                      }`}
                    >
                      {alert.severity}
                    </span>
                  </div>

                  <p className="text-[11px] text-[#c0c7d4] line-clamp-2 mb-2">{alert.description}</p>

                  <div className="flex items-center justify-between text-[10px] font-mono-code text-[#8a919d]">
                    <span>SRC: {alert.sourceIp}</span>
                    <span
                      className={`font-semibold ${
                        alert.status === 'CONTAINED'
                          ? 'text-[#35E6A1]'
                          : alert.status === 'QUARANTINED'
                          ? 'text-[#F4C95D]'
                          : 'text-[#FF405D]'
                      }`}
                    >
                      {alert.status}
                    </span>
                    <span>{alert.timestamp}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* CENTER: Deep Packet Dissector & MITRE ATT&CK Matrix (5 cols) */}
      <div className="lg:col-span-5 flex flex-col gap-4">
        {/* Inspection Header */}
        <div className="hud-card p-4 flex-1 flex flex-col">
          <div className="flex items-center justify-between border-b border-[rgba(72,165,255,0.1)] pb-3 mb-3">
            <div>
              <span className="text-[10px] font-command font-bold uppercase tracking-widest text-[#48A5FF]">
                FORENSIC DEEP-DIVE
              </span>
              <h3 className="font-command font-bold text-base text-[#dfe2f0]">
                {selectedAlert.threatType}
              </h3>
            </div>
            <div className="flex items-center gap-1 bg-[#0D1422] p-1 rounded border border-[rgba(72,165,255,0.15)] text-[11px] font-command">
              <button
                onClick={() => {
                  playClick();
                  setActiveTab('hex');
                }}
                className={`px-2.5 py-1 rounded transition-all ${
                  activeTab === 'hex'
                    ? 'bg-[#18263D] text-[#48A5FF] font-bold'
                    : 'text-[#8a919d] hover:text-[#dfe2f0]'
                }`}
              >
                HEX DISSECTOR
              </button>
              <button
                onClick={() => {
                  playClick();
                  setActiveTab('mitre');
                }}
                className={`px-2.5 py-1 rounded transition-all ${
                  activeTab === 'mitre'
                    ? 'bg-[#18263D] text-[#48A5FF] font-bold'
                    : 'text-[#8a919d] hover:text-[#dfe2f0]'
                }`}
              >
                MITRE ICS
              </button>
            </div>
          </div>

          {activeTab === 'hex' && (
            <div className="space-y-4 flex-1">
              {/* Meta information row */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-mono-code">
                <div className="p-2 bg-[#0D1422] rounded border border-[rgba(72,165,255,0.1)]">
                  <span className="text-[10px] text-[#8a919d] block">TARGET NODE</span>
                  <span className="text-[#dfe2f0] font-bold uppercase">{selectedAlert.targetNodeId}</span>
                </div>
                <div className="p-2 bg-[#0D1422] rounded border border-[rgba(72,165,255,0.1)]">
                  <span className="text-[10px] text-[#8a919d] block">PROTOCOL / PORT</span>
                  <span className="text-[#48A5FF] font-bold">{selectedAlert.protocol}</span>
                </div>
                <div className="p-2 bg-[#0D1422] rounded border border-[rgba(72,165,255,0.1)]">
                  <span className="text-[10px] text-[#8a919d] block">ATTACK TECHNIQUE</span>
                  <span className="text-[#FF405D] font-bold">{selectedAlert.mitreTechnique.split(':')[0]}</span>
                </div>
              </div>

              {/* Raw Hex Packet Inspector */}
              <div>
                <div className="flex items-center justify-between text-[11px] font-mono-code text-[#8a919d] mb-1.5">
                  <span className="flex items-center gap-1.5">
                    <Binary className="w-3.5 h-3.5 text-[#48A5FF]" />
                    RAW PCAP PAYLOAD STREAM (OFFSET 0x00)
                  </span>
                  <span className="text-[#35E6A1]">CRC VALID</span>
                </div>

                <div className="p-3 rounded bg-[#070B14] border border-[rgba(72,165,255,0.18)] font-mono-code text-xs leading-relaxed overflow-x-auto">
                  <div className="text-[#8a919d] mb-1 select-none">
                    0000: 05 64 12 44  80 01 02 03  FF FF FE 00  C4 90 B1 2A
                  </div>
                  <div className="text-[#dfe2f0] space-x-1">
                    <span className="text-[#35E6A1] bg-[#35E6A1]/10 px-1 rounded" title="DNP3 Start Octets (0x05 0x64)">
                      05 64
                    </span>
                    <span className="text-[#48A5FF] bg-[#48A5FF]/10 px-1 rounded" title="Length: 18 octets">
                      12
                    </span>
                    <span className="text-[#F4C95D] bg-[#F4C95D]/10 px-1 rounded" title="Control Octet: PRM=1, FCB=0">
                      44
                    </span>
                    <span className="text-[#dfe2f0]">80 01</span>
                    <span className="text-[#FF405D] bg-[#FF405D]/20 px-1 rounded font-bold" title="MALICIOUS: Direct Operate Trip (0x05)">
                      02 03 FF FF
                    </span>
                    <span className="text-[#c0c7d4]">FE 00 C4</span>
                    <span className="text-[#8a919d]">90 B1 2A</span>
                  </div>
                  <div className="mt-2 pt-2 border-t border-[rgba(72,165,255,0.1)] text-[10px] text-[#8a919d]">
                    Payload Decode: <span className="text-[#FF405D]">Function 0x05 (Direct Operate Breaker-Open) to Outstation Addr 0x01</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  onClick={handleInjectRule}
                  onMouseEnter={playHover}
                  className="py-2.5 px-3 rounded bg-[#48A5FF] hover:bg-[#3594ea] text-[#070B14] font-command font-bold text-xs flex items-center justify-center gap-1.5 shadow-[0_0_16px_rgba(72,165,255,0.4)] transition-all"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>INJECT DROP FIREWALL RULE</span>
                </button>

                <button
                  onClick={handleQuarantineSubnet}
                  onMouseEnter={playHover}
                  className="py-2.5 px-3 rounded bg-[#FF405D] hover:bg-[#ff2647] text-white font-command font-bold text-xs flex items-center justify-center gap-1.5 shadow-[0_0_16px_rgba(255,64,93,0.4)] transition-all"
                >
                  <Lock className="w-4 h-4" />
                  <span>QUARANTINE SOURCE IP</span>
                </button>
              </div>
            </div>
          )}

          {activeTab === 'mitre' && (
            <div className="space-y-3 flex-1">
              <span className="text-xs text-[#8a919d] font-mono-code block">
                MITRE ATT&CK for Industrial Control Systems (ICS) Threat Coverage:
              </span>

              <div className="grid grid-cols-2 gap-2">
                {mitreTechniques.map((tech) => (
                  <div
                    key={tech.code}
                    className={`p-3 rounded border text-xs font-mono-code ${
                      tech.active
                        ? 'bg-[rgba(255,64,93,0.12)] border-[rgba(255,64,93,0.4)]'
                        : 'bg-[#0D1422] border-[rgba(72,165,255,0.1)]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-command font-bold text-[#dfe2f0]">{tech.code}</span>
                      {tech.active && (
                        <span className="px-1.5 py-0.2 rounded text-[9px] bg-[#FF405D] text-white font-bold">
                          {tech.count} DETECTIONS
                        </span>
                      )}
                    </div>
                    <div className="text-[#dfe2f0] font-semibold text-[11px]">{tech.name}</div>
                    <div className="text-[10px] text-[#8a919d]">{tech.category}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* RIGHT: Live Defense Terminal & Countermeasures (3 cols) */}
      <div className="lg:col-span-3 flex flex-col gap-4">
        <div className="hud-card p-4 flex-1 flex flex-col bg-[#070B14]">
          <div className="flex items-center justify-between mb-2 border-b border-[rgba(72,165,255,0.1)] pb-2">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-[#48A5FF]" />
              <span className="font-command font-bold text-xs uppercase text-[#48A5FF]">
                DEFENSIVE TERMINAL
              </span>
            </div>
            <span className="w-2 h-2 rounded-full bg-[#35E6A1] animate-ping"></span>
          </div>

          {/* Terminal Console Output */}
          <div className="flex-1 bg-[#0a0e17] p-3 rounded border border-[rgba(72,165,255,0.15)] font-mono-code text-[11px] text-[#35E6A1] overflow-y-auto space-y-1.5 min-h-[260px] max-h-[380px]">
            {terminalLogs.map((log, idx) => (
              <div key={idx} className="leading-tight">
                {log.startsWith('[FIREWALL]') ? (
                  <span className="text-[#48A5FF]">{log}</span>
                ) : log.startsWith('[ALARM]') ? (
                  <span className="text-[#FF405D] font-bold">{log}</span>
                ) : (
                  <span>{log}</span>
                )}
              </div>
            ))}
            <div className="flex items-center gap-1 text-[#48A5FF]">
              <span>scada-defense@gridshield:~$</span>
              <span className="w-2 h-3.5 bg-[#48A5FF] animate-pulse"></span>
            </div>
          </div>

          {/* Quick Terminal Command Buttons */}
          <div className="mt-3 space-y-2">
            <button
              onClick={() => {
                playKeypress();
                setTerminalLogs((prev) => [
                  `[CMD] FLUSHING ARP CACHE ON SUBSTATION ROUTERS...`,
                  `[OK] 14 switches flushed. Re-ARPing gateway.`,
                  ...prev,
                ]);
              }}
              onMouseEnter={playHover}
              className="w-full py-2 px-2.5 rounded bg-[#0D1422] hover:bg-[#18263D] border border-[rgba(72,165,255,0.2)] text-[11px] font-command font-semibold text-[#dfe2f0] flex items-center justify-between transition-all"
            >
              <span>FLUSH ARP & SESSION BUFFERS</span>
              <ArrowRight className="w-3 h-3 text-[#48A5FF]" />
            </button>

            <button
              onClick={() => {
                playKeypress();
                setTerminalLogs((prev) => [
                  `[DUMP] Generating PCAP trace for incident #${selectedAlert.id}...`,
                  `[DOWNLOAD] /var/log/gridshield/forensics_${selectedAlert.id}.pcap (4.2 MB)`,
                  ...prev,
                ]);
                playSuccess();
              }}
              onMouseEnter={playHover}
              className="w-full py-2 px-2.5 rounded bg-[#0D1422] hover:bg-[#18263D] border border-[rgba(72,165,255,0.2)] text-[11px] font-command font-semibold text-[#dfe2f0] flex items-center justify-between transition-all"
            >
              <span>EXPORT FORENSIC PCAP STREAM</span>
              <FileText className="w-3 h-3 text-[#35E6A1]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
