import React from "react";
import {
  Map,
  MapCircle,
  MapFullscreenControl,
  MapTileLayer,
  MapPopup,
} from "@/components/ui/map";
import type { LatLngExpression } from "leaflet";
import { mapUrlForBlackEditon } from "@/api/mapUrl";
import { useQuery } from "@tanstack/react-query";
import { getRunwayInfo } from "@/api/api";
const AerodomeMap = ({ lat, lon, code }: { lat: number; lon: number, code: string }) => {
  const TORONTO_COORDINATES = [lat, lon] satisfies LatLngExpression;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["runway"],
    queryFn: () => getRunwayInfo("icao", code),
    enabled: !!lat && !!lon, 
  });

  const [runway1, runway2] = data || [];

  if (lat === undefined || lon === undefined) {
    return null;
  }
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
          center={TORONTO_COORDINATES}
          radius={200}
        >
          <MapPopup className="w-56 p-4">
            <h3 className="font-bold text-[15px] border-b pb-2 mb-3 text-foreground">
              Pist (Runway) Bilgileri
            </h3>

            {isLoading && (
              <div className="flex justify-center items-center py-4">
                <span className="text-sm text-muted-foreground animate-pulse">
                  Veriler yükleniyor...
                </span>
              </div>
            )}

            {isError && (
              <div className="text-red-600 text-sm p-3 rounded-md border border-red-100">
                Pist bilgileri alınırken bir hata oluştu.
              </div>
            )}

            {!isLoading && !isError && data && (
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Yönler:</span>
                  <span className="font-medium">
                    {runway1?.name || "-"} / {runway2?.name || "-"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Zemin:</span>
                  <span className="font-medium capitalize">
                    {runway1?.surface?.toLowerCase() || "-"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Aydınlatma:</span>
                  <span
                    className={`font-medium ${runway1?.hasLighting ? "text-emerald-600" : "text-amber-500"}`}
                  >
                    {runway1?.hasLighting ? "Var" : "Yok"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Uzunluk:</span>
                  <span className="font-medium">
                    {runway1?.length?.feet ? `${runway1.length.feet} ft` : "-"}
                  </span>
                </div>
              </div>
            )}
          </MapPopup>
        </MapCircle>
      </Map>
    </>
  );
};

export default AerodomeMap;
