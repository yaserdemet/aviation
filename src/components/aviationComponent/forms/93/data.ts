export type Flight = {
  callSign: string;
  aircraftType: string;
  squawk: string;
  departure: string;
  arrival: string;
  inAir: boolean;
  flightPurpose: string;
  flightType: string;
  id: number;
}

export const dataFlight: Flight[] = [
  { id: 1, callSign: "TC001", aircraftType: "Cessna 172", squawk: "7000", departure: "LTBA", arrival: "LTAC", inAir: true, flightPurpose: "training", flightType: "VFR" },
  { id: 2, callSign: "TC002", aircraftType: "Boeing 737", squawk: "7500", departure: "LTBA", arrival: "LTFE", inAir: false, flightPurpose: "experience", flightType: "IFR" },
  { id: 3, callSign: "TC003", aircraftType: "Airbus A320", squawk: "7600", departure: "LTFE", arrival: "LTBA", inAir: true, flightPurpose: "test", flightType: "IFR" },
  { id: 4, callSign: "TC004", aircraftType: "Cessna 182", squawk: "7010", departure: "LTAC", arrival: "LTBA", inAir: true, flightPurpose: "training", flightType: "VFR" },
  { id: 5, callSign: "TC005", aircraftType: "Piper PA-28", squawk: "7020", departure: "LTBA", arrival: "LTFE", inAir: false, flightPurpose: "training", flightType: "VFR" },
  { id: 6, callSign: "TC006", aircraftType: "Embraer E190", squawk: "7030", departure: "LTFE", arrival: "LTBA", inAir: true, flightPurpose: "experience", flightType: "IFR" },
  { id: 7, callSign: "TC007", aircraftType: "Cessna 172", squawk: "7040", departure: "LTAC", arrival: "LTFE", inAir: false, flightPurpose: "training", flightType: "VFR" },
  { id: 8, callSign: "TC008", aircraftType: "Boeing 777", squawk: "7050", departure: "LTBA", arrival: "LTAC", inAir: true, flightPurpose: "experience", flightType: "IFR" },
  { id: 9, callSign: "TC009", aircraftType: "Cessna 152", squawk: "7060", departure: "LTAC", arrival: "LTBA", inAir: true, flightPurpose: "training", flightType: "VFR" },
  { id: 10, callSign: "TC010", aircraftType: "Airbus A321", squawk: "7070", departure: "LTFE", arrival: "LTBA", inAir: false, flightPurpose: "test", flightType: "IFR" },
  { id: 11, callSign: "TC011", aircraftType: "Piper PA-28", squawk: "7080", departure: "LTBA", arrival: "LTAC", inAir: true, flightPurpose: "training", flightType: "VFR" },
  { id: 12, callSign: "TC012", aircraftType: "Embraer E195", squawk: "7090", departure: "LTFE", arrival: "LTAC", inAir: false, flightPurpose: "experience", flightType: "IFR" },
  { id: 13, callSign: "TC013", aircraftType: "Cessna 172", squawk: "7100", departure: "LTBA", arrival: "LTFE", inAir: true, flightPurpose: "training", flightType: "VFR" },
  { id: 14, callSign: "TC014", aircraftType: "Boeing 737", squawk: "7110", departure: "LTFE", arrival: "LTBA", inAir: false, flightPurpose: "experience", flightType: "IFR" },
  { id: 15, callSign: "TC015", aircraftType: "Airbus A320", squawk: "7120", departure: "LTAC", arrival: "LTFE", inAir: true, flightPurpose: "test", flightType: "IFR" },
  { id: 16, callSign: "TC016", aircraftType: "Cessna 182", squawk: "7130", departure: "LTBA", arrival: "LTAC", inAir: false, flightPurpose: "training", flightType: "VFR" },
  { id: 17, callSign: "TC017", aircraftType: "Piper PA-28", squawk: "7140", departure: "LTFE", arrival: "LTBA", inAir: true, flightPurpose: "training", flightType: "VFR" },
  { id: 18, callSign: "TC018", aircraftType: "Embraer E190", squawk: "7150", departure: "LTAC", arrival: "LTFE", inAir: false, flightPurpose: "experience", flightType: "IFR" },
  { id: 19, callSign: "TC019", aircraftType: "Cessna 172", squawk: "7160", departure: "LTBA", arrival: "LTAC", inAir: true, flightPurpose: "training", flightType: "VFR" },
  { id: 20, callSign: "TC020", aircraftType: "Boeing 777", squawk: "7170", departure: "LTFE", arrival: "LTBA", inAir: false, flightPurpose: "experience", flightType: "IFR" }
];