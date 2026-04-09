import React, { memo } from "react";
import FlightTable from "./FlightTable";
import type { FlightsOfAerodomeProps } from "./flights.types";

const FlightsOfAerodome = memo(({ arrivals, departures }: FlightsOfAerodomeProps) => {
  return (
    <div className="col-span-full space-y-4">
      <FlightTable flights={arrivals ?? []} type="arrival" />
      <FlightTable flights={departures ?? []} type="departure" />
    </div>
  );
});

FlightsOfAerodome.displayName = "FlightsOfAerodome";

export default FlightsOfAerodome;