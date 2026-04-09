export interface FlightAirport {
  icao: string;
  iata: string;
  name: string;
  countryCode: string;
  timeZone: string;
}

export interface FlightTime {
  utc: string;
  local: string;
}

export interface FlightMovement {
  airport: FlightAirport;
  checkInDesk?: string;
  gate?: string;
  quality: string[];
  revisedTime?: FlightTime;
  scheduledTime?: FlightTime;
  runway?: string;
  runwayTime?: FlightTime;
}

export interface FlightAircraft {
  reg: string;
  modeS: string;
  model: string;
}

export interface FlightAirline {
  name: string;
  iata: string;
  icao: string;
}

export interface Flight {
  aircraft: FlightAircraft;
  airline: FlightAirline;
  callSign: string;
  codeshareStatus: string;
  isCargo: boolean;
  movement: FlightMovement;
  status : string;
  number : string;
}

export interface FlightsOfAerodomeProps {
  arrivals: Flight[];
  departures: Flight[];
}
