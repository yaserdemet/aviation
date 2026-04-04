import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Search,
  MapPin,
  Globe,
  Hash,
  Loader2,
  AlertCircle,
  Phone,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getAirportByCode } from "@/api/api";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import AerodomeMap from "@/components/aviationComponent/aerodome.tsx/AerodomeMap";

export default function AirportsPage() {
  const [codeType, setCodeType] = useState<"iata" | "icao" | "local">("icao");
  const [code, setCode] = useState("LTAC");
  const [searchTriggerCode, setSearchTriggerCode] = useState({
    type: codeType,
    val: code,
  });

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["airport", searchTriggerCode],
    queryFn: () =>
      getAirportByCode(searchTriggerCode.type, searchTriggerCode.val),
  });
  console.log(data);
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code) return;
    setSearchTriggerCode({ type: codeType, val: code });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Havaalanı Arama</h1>
        <p className="text-muted-foreground">
          ICAO, IATA veya Yerel kod kullanarak dünya çapındaki havaalanı
          detaylarını görüntüleyin.
        </p>
      </div>

      <Card className="border-blue-100 shadow-sm bg-blue-50/30">
        <CardContent className="p-6">
          <form
            onSubmit={handleSearch}
            className="flex flex-col md:flex-row gap-4 items-end"
          >
            <div className="space-y-2 flex-grow">
              <label className="text-sm font-medium">Kod Tipi</label>
              <Select
                value={codeType}
                onValueChange={(v: any) => setCodeType(v)}
              >
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Kod Tipi" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="icao">ICAO (örn: LTAC)</SelectItem>
                  <SelectItem value="iata">IATA (örn: ESB)</SelectItem>
                  <SelectItem value="local">Yerel (Local)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 flex-grow-[2]">
              <label className="text-sm font-medium">Havaalanı Kodu</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  value={code}
                  onChange={(e) => setCode(e.target.value.toUpperCase())}
                  placeholder="Havaalanı kodu girin..."
                  className="pl-9 bg-white uppercase"
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full md:w-auto"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Search className="h-4 w-4 mr-2" />
              )}
              Havaalanı Bul
            </Button>
          </form>
        </CardContent>
      </Card>

      {isError && (
        <Card className="border-red-200 bg-red-50 mt-6">
          <CardContent className="p-6 flex gap-3">
            <AlertCircle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-red-900">Hata Oluştu</h3>
              <p className="text-sm text-red-700">
                API sınırına ulaştınız veya havaalanı bulunamadı. Hata:{" "}
                {(error as Error).message}
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {data && !isLoading && !isError && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <Card className="shadow-sm border-slate-200">
            <CardHeader className="bg-slate-50 border-b pb-4">
              <div className="flex flex-col gap-2">
                <CardTitle className="text-2xl flex items-center gap-2">
                  {data.name}
                </CardTitle>
                <CardDescription className="flex flex-col sm:flex-row sm:items-center gap-2 mt-1 text-base">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-slate-500" />
                    {data.municipalityName}, {data.countryCode}
                  </span>

                  <span className="hidden sm:inline text-slate-300">•</span>

                  <div className="flex gap-2">
                    {data.icao && (
                      <Badge
                        variant="outline"
                        className="bg-blue-50 text-blue-700 border-blue-200"
                      >
                        ICAO: {data.icao}
                      </Badge>
                    )}
                    {data.iata && (
                      <Badge
                        variant="outline"
                        className="bg-emerald-50 text-emerald-700 border-emerald-200"
                      >
                        IATA: {data.iata}
                      </Badge>
                    )}
                  </div>
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="p-6 flex flex-col gap-6">
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                  <Globe className="w-4 h-4" /> Konum Bilgileri
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-50 rounded-lg p-3 border border-slate-100">
                    <p className="text-xs text-slate-500 mb-1">Enlem (Lat)</p>
                    <p className="font-medium text-slate-900">
                      {data.location?.lat?.toFixed(4) || "N/A"}
                    </p>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-3 border border-slate-100">
                    <p className="text-xs text-slate-500 mb-1">Boylam (Lon)</p>
                    <p className="font-medium text-slate-900">
                      {data.location?.lon?.toFixed(4) || "N/A"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                  <Hash className="w-4 h-4" /> Detaylar
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-slate-100">
                    <span className="text-sm text-slate-600">
                      Rakım (Elevation)
                    </span>
                    <span className="font-medium">
                      {data.elevation?.meter
                        ? `${data.elevation.meter} m`
                        : "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-slate-100">
                    <span className="text-sm text-slate-600">Saat Dilimi</span>
                    <span className="font-medium text-right text-sm">
                      {data.timeZone || "N/A"}{" "}
                      {data.utcOffset ? `(UTC ${data.utcOffset})` : ""}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-slate-100">
                    <span className="text-sm text-slate-600">Web Sitesi</span>
                    <span className="font-medium text-right text-sm">
                      {data.urls?.webSite ? (
                        <a
                          href={data.urls.webSite}
                          target="_blank"
                          className="text-blue-600 underline"
                        >
                          Siteye Git
                        </a>
                      ) : (
                        "Veri Yok"
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-slate-100">
                    <span className="text-sm text-slate-600">Flight Radar</span>
                    <span className="font-medium text-right text-sm flex items-center gap-1">
                      <Link to={data?.urls?.flightRadar}>
                        {data?.urls?.flightRadar}
                      </Link>
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <AerodomeMap lat={data?.location?.lat} lon={data?.location?.lon} />
        </div>
      )}
    </div>
  );
}
