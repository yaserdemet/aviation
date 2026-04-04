import api from "@/lib/axios";

// OpenSky API responses typically follow this structure:
// states: [icao24, callsign, origin_country, time_position, last_contact, longitude, latitude, baro_altitude, on_ground, velocity, true_track, vertical_rate, sensors, geo_altitude, squawk, spi, position_source]

export interface SkyState {
  icao24: string;
  callsign: string;
  originCountry: string;
  timePosition: number | null;
  lastContact: number;
  longitude: number | null;
  latitude: number | null;
  baroAltitude: number | null;
  onGround: boolean;
  velocity: number | null;
  trueTrack: number | null;
  verticalRate: number | null;
  geoAltitude: number | null;
  squawk: string | null;
}

export const skyApi = {
  /**
   * Fetches state vectors for a specific aircraft by its ICAO 24-bit address.
   */
  getStateByIcao: async (icao24: string): Promise<any[][] | null> => {
    const res = await api.get("/states/all", { params: { icao24 } });
    console.log(res?.data)
    return res.data.states;
  },

  /**
   * Fetches all active state vectors.
   */
  getOwnState: async (): Promise<any[][] | null> => {
    const res = await api.get("/states/all");
    return res.data.states;
  },

  /**
   * Fetches the trajectory for a specific aircraft.
   */
  getLiveTrack: async (icao24: string): Promise<any> => {
    const res = await api.get("/tracks/all", { 
      params: { 
        icao24, 
        time: 0 
      } 
    });
    return res.data;
  },
};

import airportApi from "@/lib/axiosAirport";

export const getAirportByCode = async (codeType: "iata" | "icao" | "local", code: string) => {
  try {
    const res = await airportApi.get(`/airports/${codeType}/${code}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching airport data:", error);
    throw error;
  }
};
