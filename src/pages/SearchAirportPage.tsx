import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { getNearAirport } from "@/api/api";
import { useForm } from "react-hook-form";
import type { LatLngExpression } from "leaflet";
import { SearchForm, FlightMap, FlightDetails } from "@/components/searchAirportRoute";
import type { FormInputs, NearAirportResponse, CityMarker } from "@/components/searchAirportRoute/types";

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

      if (!/^[A-Z0-9]{4}$/.test(fromCode) || !/^[A-Z0-9]{4}$/.test(toCode)) {
        throw new Error("Geçersiz havaalanı kodu. ICAO kodları 4 karakter olmalıdır.");
      }

      try {
        const result = await getNearAirport("icao", fromCode, toCode);
        return result as NearAirportResponse;
      } catch (err) {
        console.error("API Error:", err);
        throw err;
      }
    },
    enabled: formValues?.from?.length === 4 && formValues?.to?.length === 4,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });

  const locationFrom = data?.from?.location;
  const locationTo = data?.to?.location;

  const isValidCoordinate = (lat: unknown, lon: unknown): boolean => {
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

  const CITIES: CityMarker[] =
    hasValidLocations && locationFrom && locationTo
      ? [
          {
            name: data?.from?.name || "Kalkış Noktası",
            coordinates: [locationFrom.lat as number, locationFrom.lon as number],
            airportData: data?.from,
          },
          {
            name: data?.to?.name || "Varış Noktası",
            coordinates: [locationTo.lat as number, locationTo.lon as number],
            airportData: data?.to,
          },
        ]
      : [];

  const mapCenter: LatLngExpression = CITIES.length === 2 ? CITIES[1].coordinates : [39.9, 32.8];

  const onSubmit = (formData: FormInputs) => {
    console.log("Form gönderildi:", formData);
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>Havaalanı Ara</CardTitle>
          <CardDescription>
            İki havaalanı arasındaki mesafe ve saati görmek için ICAO kodlarını girin (örn: LTAC)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <SearchForm
              isLoading={isLoading}
              register={register}
              errors={errors}
              onSubmit={handleSubmit(onSubmit)}
            />

            {isError && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
                <p className="font-semibold mb-1">❌ Hata oluştu</p>
                <p className="text-sm">
                  {error instanceof Error
                    ? error.message
                    : typeof error === "object" && error !== null && "message" in error
                      ? (error as any).message || "Bilinmeyen bir hata oluştu"
                      : "Havaalanları yüklenirken bir hata oluştu"}
                </p>
              </div>
            )}

            {isLoading && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-blue-700">
                <p className="flex items-center gap-2">
                  <span className="inline-block animate-spin">⟳</span>
                  Havaalanları yükleniyor...
                </p>
              </div>
            )}

            {hasValidLocations && data && CITIES.length === 2 && (
              <>
                <FlightMap mapCenter={mapCenter} cities={CITIES} />
                <FlightDetails data={data} locationFrom={locationFrom} locationTo={locationTo} />
              </>
            )}

            {!isLoading && !isError && data && !hasValidLocations && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-yellow-700">
                <p className="font-semibold">⚠️ Koordinat bilgisi alınamadı</p>
                <p className="text-sm">
                  Girdiğiniz havaalanlarının konum bilgileri bulunamadı. Lütfen ICAO kodlarını kontrol edin.
                </p>
              </div>
            )}

            {!isLoading && !data && (
              <div className="text-center py-8 text-gray-500">
                <p>Havaalanı araması için ICAO kodlarını girin</p>
                <p className="text-sm text-gray-400 mt-2">Örn: LTAC (Ankara) → LTAJ (İzmir)</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
