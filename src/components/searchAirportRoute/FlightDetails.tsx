import { Card } from "@/components/ui/card";
import type { NearAirportResponse } from "./types";

interface FlightDetailsProps {
  data: NearAirportResponse;
  locationFrom?: { lat?: number; lon?: number };
  locationTo?: { lat?: number; lon?: number };
}

export function FlightDetails({ data, locationFrom, locationTo }: FlightDetailsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card className="p-4 flex flex-col justify-between">
        <div>
          <p className="text-sm text-gray-500">Kalkış Havaalanı</p>
          <p className="font-bold">
            {data?.from?.name || "Bilinmiyor"}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-400 mt-2">
            Enlem: {locationFrom?.lat?.toFixed(4)}
          </p>
          <p className="text-xs text-gray-400">
            Boylam: {locationFrom?.lon?.toFixed(4)}
          </p>
        </div>
      </Card>

      <Card className="p-4 flex flex-col items-center justify-center bg-blue-50/50 border-blue-100">
        <p className="text-sm text-gray-500 mb-1 font-medium">Uçuş Mesafe & Süre</p>
        <div className="flex items-baseline gap-1">
          <p className="text-2xl font-bold text-blue-700">
            {data?.greatCircleDistance?.km ? Math.round(data.greatCircleDistance.km) : "-"}
          </p>
          <span className="text-sm text-blue-600 font-semibold">km</span>
        </div>
        {data?.greatCircleDistance?.nm && (
          <p className="text-xs text-gray-400 font-medium">{Math.round(data.greatCircleDistance.nm)} nm</p>
        )}
        {data?.approxFlightTime && (
          <p className="text-sm bg-white border border-gray-100 shadow-sm px-2 py-1 rounded-md text-gray-600 mt-2 font-medium">
            ⏱ {data.approxFlightTime}
          </p>
        )}
      </Card>

      <Card className="p-4 flex flex-col justify-between">
        <div>
          <p className="text-sm text-gray-500">Varış Havaalanı</p>
          <p className="font-bold">{data?.to?.name || "Bilinmiyor"}</p>
        </div>
        <div>
          <p className="text-xs text-gray-400 mt-2">
            Enlem: {locationTo?.lat?.toFixed(4)}
          </p>
          <p className="text-xs text-gray-400">
            Boylam: {locationTo?.lon?.toFixed(4)}
          </p>
        </div>
      </Card>
    </div>
  );
}
