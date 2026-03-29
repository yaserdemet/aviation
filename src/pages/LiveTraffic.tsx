import React, { useState, useMemo } from "react";
import { useFlight } from "@/hooks/useFlight";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { 
  ChevronLeft, 
  ChevronRight, 
  ChevronFirst, 
  ChevronLast, 
  Search, 
  History, 
  PlaneTakeoff, 
  PlaneLanding,
  ArrowUpDown,
  AlertCircle
} from "lucide-react"
import { cn } from "@/lib/utils"

function mapState(state: any[]) {
  return {
    icao24: state[0],
    callsign: state[1]?.trim(),
    originCountry: state[2],
    timePosition: state[3],
    lastContact: state[4],
    longitude: state[5],
    latitude: state[6],
    baroAltitude: state[7],
    onGround: state[8],
    velocity: state[9],
    trueTrack: state[10],
    verticalRate: state[11],
    geoAltitude: state[13],
    squawk: state[14],
  };
}

export default function HistoryPage() {
  const { data: flights, isLoading, isError, error } = useFlight({
    select: (data) => data.states?.map(mapState) ?? [],
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [sortBy, setSortBy] = useState<"baroAltitude" | "velocity" | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | null>(null);

  // Filter and Sort Logic
  const filteredFlights = useMemo(() => {
    if (!flights) return [];
    
    let result = [...flights];

    // Search
    if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase();
      result = result.filter((flight: any) => 
        flight.callsign?.toLowerCase().includes(lowerSearch) ||
        flight.originCountry?.toLowerCase().includes(lowerSearch) ||
        flight.icao24?.toLowerCase().includes(lowerSearch)
      );
    }

    // Sort
    if (sortBy && sortOrder) {
      result.sort((a, b) => {
        const valA = a[sortBy] ?? 0;
        const valB = b[sortBy] ?? 0;
        return sortOrder === "asc" ? valA - valB : valB - valA;
      });
    }

    return result;
  }, [flights, searchTerm, sortBy, sortOrder]);

  // Pagination Logic
  const totalItems = filteredFlights.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedFlights = filteredFlights.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(Math.min(Math.max(1, page), totalPages));
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleItemsPerPageChange = (value: string) => {
    setItemsPerPage(Number(value));
    setCurrentPage(1);
  };

  const toggleSort = (key: "baroAltitude" | "velocity") => {
    if (sortBy === key) {
      if (sortOrder === "asc") setSortOrder("desc");
      else if (sortOrder === "desc") {
        setSortOrder(null);
        setSortBy(null);
      }
    } else {
      setSortBy(key);
      setSortOrder("asc");
    }
    setCurrentPage(1);
  };
  return (
    <div className="p-4 sm:p-8 space-y-6 max-w-400 mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 px-1">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
              <History className="w-5 h-5 text-blue-400/80" />
            </div>
            <h1 className="text-3xl font-semibold tracking-tight uppercase text-foreground/80">Canlı Hava Trafiği</h1>
          </div>
          <p className="text-muted-foreground/70 text-sm italic font-light">OpenSky Network üzerinden alınan anlık uçuş verileri.</p>
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative w-full md:w-64 lg:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50" />
            <Input 
              placeholder="Çağrı kodu veya ülke ara..." 
              value={searchTerm}
              onChange={handleSearch}
              className="pl-9 h-10 rounded-xl bg-muted/20 border-none focus-visible:ring-1 text-sm text-foreground/80"
            />
          </div>
          <Badge variant="secondary" className="h-10 px-4 rounded-xl font-medium text-xs hidden sm:flex bg-blue-50 text-blue-500 border-blue-100/50 hover:bg-blue-100/30">
            {flights?.length || 0} AKTİF
          </Badge>
        </div>
      </div>
      
      {isLoading && (
        <div className="flex flex-col items-center justify-center py-24 bg-muted/5 rounded-3xl border border-dashed border-slate-200/50">
          <div className="animate-spin h-8 w-8 border-2 border-blue-400/50 border-t-transparent rounded-full mb-4" />
          <p className="text-muted-foreground/60 text-sm font-medium italic">Küresel uçuş verileri senkronize ediliyor...</p>
        </div>
      )}
      
      {isError && (
        <div className="p-8 bg-red-50/30 text-red-500 rounded-3xl border border-red-100/50 flex flex-col items-center gap-3">
          <AlertCircle className="w-10 h-10 opacity-30" />
          <p className="font-semibold text-lg italic">Veri akışında bir aksaklık oluştu.</p>
          <p className="text-xs opacity-70">{error?.message}</p>
        </div>
      )}
      
      {flights && (
        <div className="border border-slate-100/50 bg-card/40 backdrop-blur-md shadow-sm rounded-2xl overflow-hidden transition-all">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-muted/10 border-b border-slate-100/50">
                <TableRow className="hover:bg-transparent">
                  <TableHead className="w-35 font-semibold text-xs uppercase tracking-wider text-muted-foreground/80">Çağrı Kodu</TableHead>
                  <TableHead className="min-w-37.5 font-semibold text-xs uppercase tracking-wider text-muted-foreground/80">Ülke</TableHead>
                  <TableHead className="text-right font-semibold text-xs uppercase tracking-wider text-muted-foreground/80">
                    <div 
                      onClick={() => toggleSort("baroAltitude")} 
                      className={cn(
                        "flex items-center justify-end gap-1 cursor-pointer select-none transition-colors hover:text-blue-400",
                        sortBy === "baroAltitude" && "text-blue-500/80"
                      )}
                    >
                      İrtifa
                      <ArrowUpDown className={cn(
                        "w-3 h-3 transition-transform",
                        sortBy === "baroAltitude" && sortOrder === "asc" && "rotate-180",
                        sortBy !== "baroAltitude" && "text-muted-foreground/30"
                      )} />
                    </div>
                  </TableHead>
                  <TableHead className="text-right font-semibold text-xs uppercase tracking-wider text-muted-foreground/80">
                    <div 
                      onClick={() => toggleSort("velocity")} 
                      className={cn(
                        "flex items-center justify-end gap-1 cursor-pointer select-none transition-colors hover:text-blue-400",
                        sortBy === "velocity" && "text-blue-500/80"
                      )}
                    >
                      Hız
                      <ArrowUpDown className={cn(
                        "w-3 h-3 transition-transform",
                        sortBy === "velocity" && sortOrder === "asc" && "rotate-180",
                        sortBy !== "velocity" && "text-muted-foreground/30"
                      )} />
                    </div>
                  </TableHead>
                  <TableHead className="font-semibold text-xs uppercase tracking-wider text-muted-foreground/80">Durum</TableHead>
                  <TableHead className="font-semibold text-xs uppercase tracking-wider text-muted-foreground/80">Özellikler</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedFlights.map((flight: any) => (
                  <TableRow key={flight.icao24} className="hover:bg-muted/10 transition-colors border-b border-slate-50/50">
                    <TableCell className="font-mono">
                      <div className="flex flex-col">
                        <span className="font-semibold text-blue-500/90 text-lg tracking-tighter">
                          {flight.callsign || "——"}
                        </span>
                        <span className="text-[9px] text-muted-foreground/50 font-medium uppercase italic">
                           {flight.icao24}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium text-[13px] text-foreground/70">
                      {flight.originCountry}
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      {flight.baroAltitude ? (
                        <div className="flex flex-col items-end">
                          <span className="text-sm text-foreground/80">{Math.round(flight.baroAltitude).toLocaleString()} m</span>
                          <span className="text-[9px] text-muted-foreground/40 uppercase font-light">baro</span>
                        </div>
                      ) : (
                        <Badge variant="outline" className="text-[10px] font-normal border-slate-200/50 text-muted-foreground/60 italic lowercase">yerde</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex flex-col items-end">
                        <span className="text-sm font-semibold text-foreground/80">{flight.velocity ? Math.round(flight.velocity) : "0"} <span className="text-[10px] font-normal opacity-50 lowercase tracking-tighter">m/s</span></span>
                        <span className="text-[9px] text-muted-foreground/40 font-light">{Math.round((flight.velocity || 0) * 3.6)} km/h</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {flight.onGround ? (
                        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-green-50/50 text-green-600/80 border border-green-100/50 w-fit">
                          <PlaneLanding className="w-3.5 h-3.5 opacity-60" />
                          <span className="text-[10px] font-semibold uppercase tracking-tight">YERDE</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-blue-50/50 text-blue-500/80 border border-blue-100/50 w-fit">
                          <PlaneTakeoff className="w-3.5 h-3.5 opacity-60" />
                          <span className="text-[10px] font-semibold uppercase tracking-tight">HAVADA</span>
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1.5">
                        {flight.squawk && (
                          <Badge variant="outline" className="font-mono bg-blue-50/30 border-blue-200/30 text-blue-500/70 text-[10px] font-medium">
                            S: {flight.squawk}
                          </Badge>
                        )}
                        {flight.geoAltitude && (
                          <Badge variant="secondary" className="text-[9px] font-medium opacity-60 bg-slate-100/50">
                            G: {Math.round(flight.geoAltitude)}m
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            
            {filteredFlights.length === 0 && !isLoading && (
              <div className="p-20 text-center text-muted-foreground/40 bg-muted/5 italic">
                <p className="text-lg font-medium">Arama kriterlerine uygun sonuç bulunamadı.</p>
                <p className="text-sm font-light mt-1">Lütfen farklı bir anahtar kelime deneyin.</p>
              </div>
            )}
          </div>
          
          <div className="px-6 py-4 bg-slate-50/30 border-t border-slate-100/50 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4 text-xs font-medium text-muted-foreground/60">
              <div className="flex items-center gap-2">
                <span>Satır:</span>
                <Select value={String(itemsPerPage)} onValueChange={handleItemsPerPageChange}>
                  <SelectTrigger className="h-8 w-18 rounded-lg border border-slate-200/50 bg-card px-2 py-1 text-xs focus:ring-1 focus:ring-blue-400/50 shadow-sm font-semibold text-foreground/70">
                    <SelectValue placeholder={itemsPerPage} />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-slate-200/50">
                    {[10, 20, 50, 100].map(n => (
                      <SelectItem key={n} value={String(n)} className="text-xs font-medium rounded-lg cursor-pointer">
                        {n}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <span className="hidden sm:inline italic text-[10px] tracking-wide opacity-80">
                TOPLAM {totalItems.toLocaleString()} KAYIT
              </span>
            </div>
            
            <div className="flex items-center gap-1.5">
              <Button variant="outline" size="icon" className="h-9 w-9 rounded-xl border-slate-200/50 shadow-sm" onClick={() => handlePageChange(1)} disabled={currentPage === 1}>
                <ChevronFirst className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="icon" className="h-9 w-9 rounded-xl border-slate-200/50 shadow-sm" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <div className="px-3 min-w-25 text-center">
                <span className="text-xs font-semibold text-blue-500/70 uppercase tracking-[0.2em]">
                  {currentPage} / {totalPages}
                </span>
              </div>
              <Button variant="outline" size="icon" className="h-9 w-9 rounded-xl border-slate-200/50 shadow-sm" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages || totalPages === 0}>
                <ChevronRight className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="icon" className="h-9 w-9 rounded-xl border-slate-200/50 shadow-sm" onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages || totalPages === 0}>
                <ChevronLast className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
