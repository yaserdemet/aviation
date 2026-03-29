import api from "@/lib/axios";
import { useQuery, type UseQueryOptions } from "@tanstack/react-query";

/**
 * OpenSky State Vector Index Reference:
 * [0] icao24: string
 * [1] callsign: string | null
 * [2] origin_country: string
 * [3] time_position: number | null
 * [4] last_contact: number
 * [5] longitude: number | null
 * [6] latitude: number | null
 * [7] baro_altitude: number | null
 * [8] on_ground: boolean
 * [9] velocity: number | null
 * [10] true_track: number | null
 * [11] vertical_rate: number | null
 * [12] sensors: number[] | null
 * [13] geo_altitude: number | null
 * [14] squawk: string | null
 * [15] spi: boolean
 * [16] position_source: number
 */
export type OpenSkyState = [
  string,       // 0: icao24
  string | null,// 1: callsign
  string,       // 2: origin_country
  number | null,// 3: time_position
  number,       // 4: last_contact
  number | null,// 5: longitude
  number | null,// 6: latitude
  number | null,// 7: baro_altitude
  boolean,      // 8: on_ground
  number | null,// 9: velocity
  number | null,// 10: true_track
  number | null,// 11: vertical_rate
  number[] | null,// 12: sensors
  number | null,// 13: geo_altitude
  string | null,// 14: squawk
  boolean,      // 15: spi
  number        // 16: position_source
];

export interface OpenSkyResponse {
  time: number;
  states: OpenSkyState[] | null;
}

export const useFlight = <TData = OpenSkyResponse>(
  options?: Partial<UseQueryOptions<OpenSkyResponse, Error, TData>>
) => {
  return useQuery({
    queryKey: ["getFlights"],
    queryFn: async () => {
      try {
        const response = await api.get<OpenSkyResponse>("/states/all");
        if (response.status !== 200) {
          throw new Error("Error fetching flights");
        }
        return response.data;
      } catch (error) {
        console.error("Error fetching flights:", error);
        throw error;
      }
    },
    staleTime: 60000,
    ...options
  });
};
