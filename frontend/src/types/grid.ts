export type NodeStatus = 'nominal' | 'warning' | 'alert' | 'isolated';

export interface GridNode {
  id: string;
  name: string;
  code: string;
  type: 'generation' | 'substation' | 'storage' | 'feeder' | 'renewable';
  x: number; // percentage in viewport 0-100
  y: number; // percentage in viewport 0-100
  voltageKv: number;
  frequencyHz: number;
  activePowerMw: number;
  maxPowerMw: number;
  status: NodeStatus;
  scadaProtocol: 'IEC 61850' | 'DNP3 Secure' | 'Modbus TCP' | 'OPC UA';
  ipAddress: string;
  temperatureC: number;
  threatDetails?: {
    vector: string;
    cve: string;
    mitreId: string;
    payloadSnippet: string;
    detectedAt: string;
    packetCount: number;
  };
}

export interface GridConnection {
  fromId: string;
  toId: string;
  capacityMw: number;
  currentMw: number;
  status: 'active' | 'degraded' | 'severed';
}

export interface SIEMAlert {
  id: string;
  timestamp: string;
  sourceIp: string;
  targetNodeId: string;
  threatType: string;
  severity: 'CRITICAL' | 'WARNING' | 'INFO';
  protocol: string;
  mitreTechnique: string;
  description: string;
  status: 'ACTIVE' | 'CONTAINED' | 'QUARANTINED';
  rawHex: string;
}

export interface PlaybookStep {
  id: string;
  title: string;
  description: string;
  actionCode: string;
  completed: boolean;
  requiredRole: string;
}

export interface IncidentPlaybook {
  id: string;
  title: string;
  category: string;
  mitreCode: string;
  severity: 'HIGH' | 'CRITICAL';
  estimatedContainmentMin: number;
  steps: PlaybookStep[];
}
