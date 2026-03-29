import { useFlight, type OpenSkyResponse, type OpenSkyState } from "./useFlight";

export type Severity = "critical" | "high" | "medium" | "low" | "info";

export interface EmergencySquawkInfo {
  label: string;
  severity: Severity;
}

export interface EmergencyFlight {
  icao24: string;
  callsign: string;
  country: string;
  latitude: number | null;
  longitude: number | null;
  altitude: number | null;
  squawk: string | null;
  velocity: number | null;
  onGround: boolean;
  emergencyLabel: EmergencySquawkInfo;
}

export const EMERGENCY_SQUAWKS: Record<string, EmergencySquawkInfo> = {
  // 🚨 Kritik Acil Durumlar
  "7500": { label: "Uçak Kaçırma",         severity: "critical" },
  "7600": { label: "Radyo Arızası",         severity: "high" },
  "7700": { label: "Genel Acil Durum",      severity: "critical" },

  // ⚠️ Özel Durumlar
  "7400": { label: "Drone - Kontrol Kaybı", severity: "medium" },
  "0000": { label: "Transponder Arızası",   severity: "medium" },
  "1200": { label: "VFR - Görsel Uçuş",    severity: "info" },
  "1202": { label: "VFR - Planörsüz Uçuş", severity: "info" },
  "2000": { label: "Radar Takibi Yok",      severity: "low" },

  // 🪖 Askeri / Özel
  "7777": { label: "Askeri Tatbikat",       severity: "medium" },
  "0010": { label: "SAR - Arama Kurtarma",  severity: "high" },
  "0020": { label: "SAR - Arama Kurtarma",  severity: "high" },
  "0030": { label: "SAR - Arama Kurtarma",  severity: "high" },
};

export const useEmergencyFlights = () => {
  return useFlight({
    select: (data: OpenSkyResponse) =>
      data.states
        ?.filter((s: OpenSkyState) => s[14] && EMERGENCY_SQUAWKS[s[14]])
        .map((s: OpenSkyState): EmergencyFlight => ({
          icao24: s[0],
          callsign: s[1]?.trim() || "—",
          country: s[2],
          latitude: s[6],
          longitude: s[5],
          altitude: s[7],
          velocity: s[9],
          onGround: s[8],
          squawk: s[14],
          emergencyLabel: EMERGENCY_SQUAWKS[s[14]!],
        })) || [],
  });
};