import React from "react";
import { Map, MapTileLayer, MapMarker, MapTooltip, MapPopup, MapCircle } from "@/components/ui/map";
import { MapPinIcon } from "lucide-react";
import { Polyline } from "react-leaflet";
import type { LatLngExpression } from "leaflet";
import type { CityMarker } from "./types";
import { mapUrlForBlackEditon } from "@/api/mapUrl";

interface FlightMapProps {
  mapCenter: LatLngExpression;
  cities: CityMarker[];
}

export function FlightMap({ mapCenter, cities }: FlightMapProps) {
  if (cities.length !== 2) return null;

  return (
    <div className="rounded-lg overflow-hidden border border-zinc-700 h-96 bg-zinc-900">
      <Map center={mapCenter} zoom={6}>
        <MapTileLayer
          url={mapUrlForBlackEditon.url}
          attribution={mapUrlForBlackEditon.attribution}
        />
        {cities.map((city, idx) => (
          <React.Fragment key={`${city.name}-${idx}`}>
            <MapMarker
              position={city.coordinates}
              icon={<MapPinIcon className="size-6 fill-white" />}
            >
              {city.airportData && (
                <>
                  <MapTooltip>
                    <span className="font-semibold">{city.airportData.name || city.name}</span>
                  </MapTooltip>
                  <MapPopup>
                    <div className="flex flex-col gap-1.5 p-1 min-w-50">
                      <span className="font-bold text-sm border-b pb-1">
                        {city.airportData.name || city.name} ({city.airportData.icao})
                      </span>
                      <span className="text-gray-600 text-xs mt-1">
                        {[city.airportData.municipalityName, city.airportData.countryCode].filter(Boolean).join(", ")}
                      </span>
                      <div className="flex gap-2 mt-2">
                        {city.airportData.iata && (
                          <span className="text-[10px] font-medium bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
                            IATA: {city.airportData.iata}
                          </span>
                        )}
                        {city.airportData.timeZone && (
                          <span className="text-[10px] font-medium bg-gray-100 text-gray-800 px-2 py-0.5 rounded">
                            Saat: {city.airportData.timeZone.split('/').pop()}
                          </span>
                        )}
                      </div>
                    </div>
                  </MapPopup>
                </>
              )}
            </MapMarker>
            <MapCircle
              className="fill-yellow-600 stroke-yellow-600 stroke-1"
              center={city.coordinates}
              radius={200}
            />
          </React.Fragment>
        ))}
        <Polyline
          positions={[cities[0].coordinates, cities[1].coordinates]}
          color="yellow"
          weight={3}
          opacity={0.7}
          dashArray="10, 5"
        />
      </Map>
    </div>
  );
}
