import type { LatLngExpression } from "leaflet";

export interface AirportData {
  name?: string;
  iata?: string;
  icao?: string;
  municipalityName?: string;
  countryCode?: string;
  timeZone?: string;
  location?: {
    lat?: number;
    lon?: number;
  };
}

export interface NearAirportResponse {
  from?: AirportData;
  to?: AirportData;
  greatCircleDistance?: {
    feet: number;
    km: number;
    meter: number;
    mile: number;
    nm: number;
  };
  approxFlightTime?: string;
}

export interface FormInputs {
  from: string;
  to: string;
}

export interface CityMarker {
  name: string;
  coordinates: LatLngExpression;
  airportData?: any;
}
