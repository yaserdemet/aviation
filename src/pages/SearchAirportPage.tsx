import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Map, MapTileLayer, MapMarker } from "@/components/ui/map";
import type { LatLngExpression } from "leaflet";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { getNearAirport } from "@/api/api";
import { Polyline } from "react-leaflet";
import { useForm } from "react-hook-form";

interface FormInputs {
  from: string;
  to: string;
}

interface AirportData {
  name?: string;
  location?: {
    lat?: number;
    lon?: number;
  };
}

interface NearAirportResponse {
  from?: AirportData;
  to?: AirportData;
}

export default function SearchAirportPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormInputs>({
    defaultValues: {
      from: "ltac",
      to: "ltaj",
    },
  });

  const formValues = watch();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["nearAirports", formValues?.from, formValues?.to],
    queryFn: async () => {
      if (!formValues?.from?.trim() || !formValues?.to?.trim()) {
        return null;
      }

      const fromCode = formValues.from.trim().toUpperCase();
      const toCode = formValues.to.trim().toUpperCase();

      // ICAO kod validasyonu - 4 karakter ve alfanümerik
      if (!/^[A-Z0-9]{4}$/.test(fromCode) || !/^[A-Z0-9]{4}$/.test(toCode)) {
        throw new Error(
          "Geçersiz havaalanı kodu. ICAO kodları 4 karakter olmalıdır."
        );
      }

      try {
        const result = await getNearAirport("icao", fromCode, toCode);
        return result as NearAirportResponse;
      } catch (err) {
        console.error("API Error:", err);
        throw err;
      }
    },
    enabled:
      formValues?.from?.length === 4 && formValues?.to?.length === 4,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });

  // Koordinatları güvenli şekilde al
  const locationFrom = data?.from?.location;
  const locationTo = data?.to?.location;

  // Koordinatların valid olup olmadığını kontrol et
  const isValidCoordinate = (
    lat: unknown,
    lon: unknown
  ): boolean => {
    return (
      typeof lat === "number" &&
      typeof lon === "number" &&
      !isNaN(lat) &&
      !isNaN(lon) &&
      isFinite(lat) &&
      isFinite(lon) &&
      lat >= -90 &&
      lat <= 90 &&
      lon >= -180 &&
      lon <= 180
    );
  };

  const hasValidLocations =
    locationFrom &&
    locationTo &&
    isValidCoordinate(locationFrom.lat, locationFrom.lon) &&
    isValidCoordinate(locationTo.lat, locationTo.lon);

  // CRASH FIX: Boş array kontrol - CITIES[1] crash'i engelle
  const CITIES: Array<{
    name: string;
    coordinates: LatLngExpression;
  }> =
    hasValidLocations && locationFrom && locationTo
      ? [
          {
            name: data?.from?.name || "Kalkış Noktası",
            coordinates: [
              locationFrom.lat as number,
              locationFrom.lon as number,
            ] as LatLngExpression,
          },
          {
            name: data?.to?.name || "Varış Noktası",
            coordinates: [
              locationTo.lat as number,
              locationTo.lon as number,
            ] as LatLngExpression,
          },
        ]
      : [];

  // CRASH FIX: Default map center - Turkey center
  const mapCenter: LatLngExpression =
    CITIES.length === 2 ? CITIES[1].coordinates : [39.9, 32.8];

  const onSubmit = (formData: FormInputs) => {
    console.log("Form gönderildi:", formData);
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>Havaalanı Ara</CardTitle>
          <CardDescription>
            İki havaalanı arasındaki mesafe ve saati görmek için ICAO kodlarını
            girin (örn: LTAC)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Search Input Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="flex gap-2">
              <div className="flex-1">
                <Input
                  {...register("from", {
                    maxLength: { value: 4, message: "Max 4 karakter" },
                    minLength: { value: 4, message: "Tam 4 karakter gerekli" },
                    required: "Kalkış havaalanı gerekli",
                    pattern: {
                      value: /^[A-Z0-9]*$/,
                      message: "Sadece büyük harfler ve rakamlar",
                    },
                  })}
                  placeholder="Kalkış ICAO (örn: LTAC)"
                  disabled={isLoading}
                  maxLength={4}
                />
              </div>
              <div className="flex-1">
                <Input
                  {...register("to", {
                    maxLength: { value: 4, message: "Max 4 karakter" },
                    minLength: { value: 4, message: "Tam 4 karakter gerekli" },
                    required: "Varış havaalanı gerekli",
                    pattern: {
                      value: /^[A-Z0-9]*$/,
                      message: "Sadece büyük harfler ve rakamlar",
                    },
                  })}
                  placeholder="Varış ICAO (örn: LTAJ)"
                  disabled={isLoading}
                  maxLength={4}
                />
              </div>
              <Button type="submit" disabled={isLoading || Object.keys(errors).length > 0}>
                {isLoading ? "Aranıyor..." : "ARA"}
              </Button>
            </form>

            {/* Error Messages */}
            {Object.keys(errors).length > 0 && (
              <div className="text-red-500 text-sm space-y-1 bg-red-50 p-3 rounded">
                {errors.from && <p>• {errors.from.message}</p>}
                {errors.to && <p>• {errors.to.message}</p>}
              </div>
            )}

            {/* API Error State */}
            {isError && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
                <p className="font-semibold mb-1">❌ Hata oluştu</p>
                <p className="text-sm">
                  {error instanceof Error
                    ? error.message
                    : typeof error === "object" &&
                      error !== null &&
                      "message" in error
                    ? ((error as any).message || "Bilinmeyen bir hata oluştu")
                    : "Havaalanları yüklenirken bir hata oluştu"}
                </p>
              </div>
            )}

            {/* Loading State */}
            {isLoading && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-blue-700">
                <p className="flex items-center gap-2">
                  <span className="inline-block animate-spin">⟳</span>
                  Havaalanları yükleniyor...
                </p>
              </div>
            )}

            {/* Map - Sadece geçerli koordinatlarla render et */}
            {hasValidLocations && data && CITIES.length === 2 && (
              <div className="rounded-lg overflow-hidden border border-gray-200 h-96 bg-gray-100">
                <Map center={mapCenter} zoom={6}>
                  <MapTileLayer />
                  {CITIES.map((city, idx) => (
                    <MapMarker
                      key={`${city.name}-${idx}`}
                      position={city.coordinates}
                    />
                  ))}
                  <Polyline
                    positions={[CITIES[0].coordinates, CITIES[1].coordinates]}
                    color="blue"
                    weight={3}
                    opacity={0.7}
                    dashArray="10, 5"
                  />
                </Map>
              </div>
            )}

            {/* Airport Details - Sadece geçerli data varsa göster */}
            {hasValidLocations && data && CITIES.length === 2 && (
              <div className="grid grid-cols-2 gap-4">
                <Card className="p-4">
                  <p className="text-sm text-gray-500">Kalkış Havaalanı</p>
                  <p className="font-bold">{data?.from?.name || "Bilinmiyor"}</p>
                  <p className="text-xs text-gray-400 mt-2">
                    Enlem: {locationFrom?.lat?.toFixed(4)}
                  </p>
                  <p className="text-xs text-gray-400">
                    Boylam: {locationFrom?.lon?.toFixed(4)}
                  </p>
                </Card>
                <Card className="p-4">
                  <p className="text-sm text-gray-500">Varış Havaalanı</p>
                  <p className="font-bold">{data?.to?.name || "Bilinmiyor"}</p>
                  <p className="text-xs text-gray-400 mt-2">
                    Enlem: {locationTo?.lat?.toFixed(4)}
                  </p>
                  <p className="text-xs text-gray-400">
                    Boylam: {locationTo?.lon?.toFixed(4)}
                  </p>
                </Card>
              </div>
            )}

            {/* No Results State */}
            {!isLoading &&
              !isError &&
              data &&
              !hasValidLocations && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-yellow-700">
                  <p className="font-semibold">⚠️ Koordinat bilgisi alınamadı</p>
                  <p className="text-sm">
                    Girdiğiniz havaalanlarının konum bilgileri bulunamadı. Lütfen ICAO kodlarını kontrol edin.
                  </p>
                </div>
              )}

            {/* Initial State */}
            {!isLoading && !data && (
              <div className="text-center py-8 text-gray-500">
                <p>Havaalanı araması için ICAO kodlarını girin</p>
                <p className="text-sm text-gray-400 mt-2">
                  Örn: LTAC (Ankara) → LTAJ (İzmir)
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
