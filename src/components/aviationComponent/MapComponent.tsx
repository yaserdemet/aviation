import React from "react";
import {
  Map,
  MapPopup,
  MapZoomControl,
  MapFeatureGroup,
  MapLayers,
  MapLayersControl,
  MapMarker,
  MapTileLayer,
} from "@/components/ui/map";
import { PawPrintIcon } from "lucide-react"
import type { LatLngExpression } from "leaflet"
import { useFlight } from "@/hooks/useFlight";
import { Plane } from "lucide-react";
import LoadingPage from "@/pages/LoadingPage";
import { mapUrlForBlackEditon } from "@/api/mapUrl";

const DEFAULT_CENTER: [number, number] = [39.9255, 32.8663]; // Türkiye merkezli varsayılan konum

const MapComponent = () => {
  const { data, isLoading, isError } = useFlight(5000);

  if (isLoading) return <LoadingPage />;
  if (isError)
    return (
      <div className="flex h-[400px] items-center justify-center text-destructive">
        Veriler yüklenirken bir hata oluştu.
      </div>
    );

  const flights =
    data?.states?.filter((state) => state[5] !== null && state[6] !== null) ||
    [];
  const emergencySquawk = [
    "0000",
    "7700",
    "7600",
    "7500",
    "0010",
    "0020",
    "0030",
    "7777",
    "2000",
    "1200",
    "1202",
    "7400",
  ];
  const PLACES = [
    {
      name: "On The Ground",
      coordinates: [-18.7852, 16.2638] satisfies LatLngExpression,
      icon: <PawPrintIcon />,
    },
    {
      name: "On The Air",
      coordinates: [-2.3333, 34.8333] satisfies LatLngExpression,
      icon: <PawPrintIcon />,
    },
    {
      name: "Emergency",
      coordinates: [-23.9884, 31.5547] satisfies LatLngExpression,
      icon: <PawPrintIcon />,
    },
  ];
  return (
    <div className="relative w-full h-[600px] border rounded-xl overflow-hidden shadow-sm">
      <Map center={DEFAULT_CENTER} zoom={5}>
        <MapTileLayer
          url={mapUrlForBlackEditon.url}
          attribution={mapUrlForBlackEditon.attribution}
        />
        <MapLayers defaultLayerGroups={PLACES.map((place) => place.name)}>
          <MapLayersControl layerGroupsLabel="Safari" />
          {PLACES.map((place) => (
            <MapFeatureGroup
              key={place.name}
              name={place.name}
              // eventHandlers={{
              //   click: () => console.log(place.name)
              // }}
            >
              <MapMarker
                key={place.name}
                position={place.coordinates}
                icon={place.icon}
              />
            </MapFeatureGroup>
          ))}
        </MapLayers>
        <MapZoomControl />

        {flights?.slice(0, 500).map((flight) => {
          const [
            icao24,
            callsign,
            originCountry,
            ,
            ,
            lng,
            lat,
            baroAltitude,
            onGround,
            velocity,
            trueTrack,
            ,
            ,
            ,
            squawk,
          ] = flight;

          return (
            <MapMarker
              key={icao24}
              position={[lat as number, lng as number]}
              icon={
                <Plane
                  className={`w-4 h-4  ${emergencySquawk.includes(squawk || "") ? "text-red-500" : onGround ? "text-green-500" : "text-blue-500"}`}
                  style={{
                    transform: `rotate(${(trueTrack || 0) - 90}deg)`,
                  }}
                />
              }
            >
              <MapPopup className="min-w-[200px]">
                <div className="p-2 space-y-2">
                  <div className="flex items-center justify-between border-b pb-1">
                    <span className="font-bold text-primary">
                      {callsign || "N/A"}
                    </span>
                    <span className="text-[10px] text-muted-foreground uppercase">
                      {originCountry}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <p className="text-muted-foreground">İrtifa</p>
                      <p className="font-medium">
                        {Math.round(baroAltitude || 0)} m
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Hız</p>
                      <p className="font-medium">
                        {Math.round((velocity || 0) * 3.6)} km/s
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">ICAO24</p>
                      <p className="font-medium">{icao24}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Durum</p>
                      <p
                        className="font-medium transition-colors duration-300"
                        style={{ color: onGround ? "#99E5A2" : "#97A9F6" }}
                      >
                        {onGround ? "Yerde" : "Havada"}
                      </p>
                    </div>
                  </div>

                  <div className="pt-1 flex items-center gap-1 text-[10px] text-muted-foreground">
                    <Plane
                      className="w-3 h-3 transition-all duration-500"
                      style={{
                        transform: `rotate(${(trueTrack || 0) - 90}deg)`,
                        color: onGround ? "#99E5A2" : "#97A9F6",
                      }}
                    />
                    <div className="flex  justify-between w-full">
                      <div>Rota: {Math.round(trueTrack || 0)}°</div>
                      <div
                        className={`${emergencySquawk.includes(squawk || "") ? "text-red-500" : "text-blue-500"}`}
                      >
                        Squawk: {squawk}
                      </div>
                    </div>
                  </div>
                </div>
              </MapPopup>
            </MapMarker>
          );
        })}
      </Map>
    </div>
  );
};

export default MapComponent;
