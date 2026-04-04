import React from "react";
import {
  Map,
  MapCircle,
  MapFullscreenControl,
  MapTileLayer,
} from "@/components/ui/map";
import type { LatLngExpression } from "leaflet";
import { mapUrlForBlackEditon } from "@/api/mapUrl";
const AerodomeMap = ({ lat, lon }: { lat: any; lon: any }) => {
  const TORONTO_COORDINATES = [lat, lon] satisfies LatLngExpression;
  return (
    <>
      <Map center={TORONTO_COORDINATES}>
        <MapTileLayer
          url={mapUrlForBlackEditon.url}
          attribution={mapUrlForBlackEditon.attribution}
        />
        <MapFullscreenControl />
        <MapCircle
        className="fill-yellow-600 stroke-yellow-600 stroke-1"
        center={TORONTO_COORDINATES} radius={200} />
      </Map>
    </>
  );
};

export default AerodomeMap;
