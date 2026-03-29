import React, { useState, useMemo } from "react";
import { useEmergencyFlights, type EmergencyFlight, type Severity } from "@/hooks/useEmergency";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  ShieldAlert, 
  AlertCircle, 
  Radio, 
  Activity, 
  Info, 
  Plane,
  ChevronLeft,
  ChevronRight,
  ChevronFirst,
  ChevronLast,
  Search,
  PlaneTakeoff, 
  PlaneLanding
} from "lucide-react";
import { cn } from "@/lib/utils";

const SEVERITY_CONFIG: Record<Severity, { 
  variant: "destructive" | "default" | "secondary" | "outline"; 
  color: string; 
  icon: React.ElementType;
  className: string;
}> = {
  critical: { variant: "destructive", color: "text-red-500", icon: ShieldAlert, className: "bg-red-50/30" },
  high: { variant: "destructive", color: "text-orange-500", icon: AlertCircle, className: "bg-orange-50/30" },
  medium: { variant: "secondary", color: "text-yellow-600", icon: Radio, className: "bg-yellow-50/30" },
  low: { variant: "outline", color: "text-blue-500", icon: Activity, className: "bg-blue-50/30" },
  info: { variant: "outline", color: "text-gray-500", icon: Info, className: "bg-gray-50/30" },
};

const Emergency = () => {
  const { data: flights, isLoading, isError } = useEmergencyFlights();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const filteredFlights = useMemo(() => {
    if (!flights) return [];
    if (!searchTerm) return flights;
    
    const lowerSearch = searchTerm.toLowerCase();
    return flights.filter(flight => 
      flight.callsign?.toLowerCase().includes(lowerSearch) ||
      flight?.country?.toLowerCase().includes(lowerSearch) ||
      flight.icao24?.toLowerCase().includes(lowerSearch) ||
      flight.emergencyLabel.label.toLowerCase().includes(lowerSearch)
    );
  }, [flights, searchTerm]);

  const totalItems = filteredFlights.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedFlights = filteredFlights.slice(startIndex, startIndex + itemsPerPage);

  if (isLoading) {
    return (
      <div className="w-full space-y-4">
        <div className="h-12 bg-muted/20 animate-pulse rounded-xl w-64" />
        <div className="rounded-2xl border border-slate-100/50 overflow-hidden">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-16 border-b border-slate-50/50 bg-muted/5 animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-10 text-center border border-dashed rounded-3xl border-red-100 bg-red-50/30 text-red-500">
        <AlertCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
        <p className="font-semibold text-lg">Veri yüklenemedi</p>
        <p className="text-sm opacity-60">Sistem bağlantısını kontrol edip tekrar deneyin.</p>
      </div>
    );
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(Math.min(Math.max(1, page), totalPages));
  };

  const handleItemsPerPageChange = (value: string) => {
    setItemsPerPage(Number(value));
    setCurrentPage(1);
  };

  return (
    <div className="w-full space-y-6 max-w-400 mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 px-1">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-red-50 dark:bg-red-950/20 rounded-lg">
              <ShieldAlert className="w-5 h-5 text-red-500/80" />
            </div>
            <h2 className="text-2xl font-semibold tracking-tight uppercase text-foreground/80">Kritik Squawk Takibi</h2>
          </div>
          <p className="text-muted-foreground/70 text-sm italic font-light">Özel squawk kodu bildiren uçuşlar için canlı izleme ekranı.</p>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative w-full md:w-64 lg:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50" />
            <Input 
              placeholder="Uçuş veya sebep ara..." 
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
              className="pl-9 h-10 rounded-xl bg-muted/20 border-none focus-visible:ring-1 text-sm text-foreground/80"
            />
          </div>
          <Badge variant="destructive" className="h-10 px-4 rounded-xl font-medium text-xs hidden sm:flex items-center gap-2 bg-red-400/10 text-red-500 border-red-200/50 hover:bg-red-400/20">
            <div className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
            {flights?.length || 0} AKTİF DURUM
          </Badge>
        </div>
      </div>

      <div className="rounded-2xl border-none shadow-sm bg-card/40 backdrop-blur-md overflow-hidden transition-all">
        {totalItems === 0 ? (
          <div className="p-20 text-center text-muted-foreground/50">
            <Plane className="w-16 h-16 mx-auto mb-4 opacity-10 rotate-45" />
            <h3 className="text-lg font-semibold text-foreground/60">Aktif Kayıt Bulunamadı</h3>
            <p className="text-sm italic font-light">Şu anda kriterlerinize uyan bir acil durum bildirimi bulunmuyor.</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-muted/10">
                  <TableRow className="hover:bg-transparent border-b border-slate-100/50">
                    <TableHead className="w-45 font-semibold text-xs uppercase tracking-wider text-muted-foreground/80">Durum / Sebep</TableHead>
                    <TableHead className="font-semibold text-xs uppercase tracking-wider text-muted-foreground/80">Uçuş Bilgisi</TableHead>
                    <TableHead className="font-semibold text-xs uppercase tracking-wider text-muted-foreground/80">Hız / İrtifa</TableHead>
                    <TableHead className="font-semibold text-xs uppercase tracking-wider text-muted-foreground/80">Durum</TableHead>
                    <TableHead className="text-center w-30 font-semibold text-xs uppercase tracking-wider text-muted-foreground/80">Squawk</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedFlights.map((flight: EmergencyFlight) => {
                    const config = SEVERITY_CONFIG[flight.emergencyLabel.severity];
                    const Icon = config.icon;

                    return (
                      <TableRow key={flight.icao24} className={cn("group transition-colors border-b border-slate-50/50", config.className)}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className={cn("p-2 rounded-lg shrink-0", config.color.replace('text-', 'bg-').concat('/10'))}>
                              <Icon className={cn("w-5 h-5 opacity-80", config.color)} />
                            </div>
                            <div className="min-w-0">
                              <p className="text-sm font-semibold leading-none mb-1 truncate uppercase tracking-tight text-foreground/80">
                                {flight.emergencyLabel.label}
                              </p>
                              <Badge variant={config.variant} className="text-[9px] h-3.5 px-1 absolute -mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity font-medium lowercase">
                                {flight.emergencyLabel.severity}
                              </Badge>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <span className="font-semibold text-lg tracking-tighter leading-none mb-1 text-foreground/90">{flight.callsign}</span>
                            <span className="text-[10px] font-medium text-muted-foreground/60 uppercase italic tracking-wide">{flight.country} / {flight.icao24}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-semibold text-foreground/70">{flight.altitude ? `${Math.round(flight.altitude).toLocaleString()} m` : "—"}</span>
                              <span className="text-[9px] text-muted-foreground/50 uppercase font-medium">ALT</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-semibold text-foreground/70">{flight.velocity ? `${Math.round(flight.velocity * 3.6)} km/h` : "—"}</span>
                              <span className="text-[9px] text-muted-foreground/40 font-light ml-1 uppercase">G-SPEED</span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                           {flight.onGround ? (
                            <div className="flex items-center gap-1.5 text-green-500/70">
                              <PlaneLanding className="w-4 h-4 opacity-60" />
                              <span className="text-[10px] font-semibold uppercase tracking-tight">YERDE</span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-1.5 text-blue-500/70">
                              <PlaneTakeoff className="w-4 h-4 opacity-60" />
                              <span className="text-[10px] font-semibold uppercase tracking-tight">HAVADA</span>
                            </div>
                          )}
                        </TableCell>
                        <TableCell className="text-center">
                          <span className="inline-flex items-center justify-center px-3 py-1 rounded-lg bg-slate-100/80 text-foreground/70 font-mono font-bold text-base shadow-sm border border-slate-200/50">
                            {flight.squawk}
                          </span>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-between px-6 py-4 bg-slate-50/30 border-t border-slate-100/50 gap-4">
              <div className="flex items-center gap-4 text-xs font-medium text-muted-foreground/70">
                <div className="flex items-center gap-2">
                  <span>Satır:</span>
                  <Select value={String(itemsPerPage)} onValueChange={handleItemsPerPageChange}>
                    <SelectTrigger className="h-8 w-18 rounded-lg border border-slate-200/50 bg-card px-2 py-1 text-xs focus:ring-1 focus:ring-blue-400/50 shadow-sm font-semibold text-foreground/70">
                      <SelectValue placeholder={itemsPerPage} />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl border-slate-200/50">
                      {[5, 10, 20, 50].map(n => (
                        <SelectItem key={n} value={String(n)} className="text-xs font-medium rounded-lg cursor-pointer">
                          {n}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <span className="hidden sm:inline bg-slate-100/50 px-2 py-1 rounded-md text-[10px] tracking-wider font-semibold">
                   {totalItems.toLocaleString()} KAYIT
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <Button variant="ghost" size="icon" className="h-9 w-9 opacity-50 hover:opacity-100" onClick={() => handlePageChange(1)} disabled={currentPage === 1}>
                  <ChevronFirst className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="h-9 w-9 rounded-xl shadow-sm border-slate-200/50" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                
                <div className="px-4 min-w-25 text-center">
                  <span className="text-xs font-semibold uppercase tracking-widest text-blue-500/70">
                    {currentPage} / {totalPages}
                  </span>
                </div>

                <Button variant="outline" size="icon" className="h-9 w-9 rounded-xl shadow-sm border-slate-200/50" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-9 w-9 opacity-50 hover:opacity-100" onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages}>
                  <ChevronLast className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
      <p className="text-[10px] text-muted-foreground/50 px-1 italic text-center sm:text-left font-light">
        * Kritik squawk bildirimleri uluslararası havacılık standartlarına (ICAO) göre anlık olarak listelenir.
      </p>
    </div>
  );
};

export default Emergency;
