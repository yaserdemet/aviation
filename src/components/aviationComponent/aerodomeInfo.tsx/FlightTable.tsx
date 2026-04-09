import React, { memo } from "react";
import { PlaneLanding, PlaneTakeoff, Info } from "lucide-react";
import type { Flight } from "./flights.types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface FlightTableProps {
  flights: Flight[];
  type: "arrival" | "departure";
}

const formatLocalTime = (local?: string) => {
  if (!local) return "—";
  const match = local.match(/\d{2}:\d{2}/);
  return match ? match[0] : local;
};

const FlightRow = memo(({ flight }: { flight: Flight }) => {
  const { aircraft, airline, callSign, movement, status, number } = flight;
  const scheduled = formatLocalTime(movement.scheduledTime?.local);
  const revised = formatLocalTime(movement.revisedTime?.local);
  const isDelayed =
    movement.scheduledTime?.utc !== movement.revisedTime?.utc && !!movement.revisedTime;

  return (
    <TableRow className="hover:bg-blue-50/50 transition-colors cursor-pointer group border-b border-border/80 h-16">
      <TableCell className="font-bold text-primary tracking-tight py-4">
        {callSign}
      </TableCell>
      <TableCell className="py-4">
        <div className="flex flex-col">
          <span className="font-semibold text-foreground text-sm">{airline?.name || "Bilinmiyor"}</span>
          <span className="text-muted-foreground text-[10px] font-medium tracking-tight">({airline?.iata || "—"})</span>
        </div>
      </TableCell>
      <TableCell className="py-4">
        <div className="flex flex-col">
          <span className="font-semibold text-foreground text-sm">{movement.airport?.name || "Bilinmiyor"}</span>
          <span className="text-muted-foreground text-[10px] font-medium tracking-tight">{movement.airport?.iata || "—"}</span>
        </div>
      </TableCell>
      <TableCell className="py-4">
        <div className="flex flex-col">
          <span className={`font-semibold ${isDelayed ? "line-through text-muted-foreground/60 text-xs" : "text-foreground text-sm"}`}>
            {scheduled}
          </span>
          {isDelayed && (
            <span className="text-orange-600 font-bold text-xs tabular-nums">
              {revised}
            </span>
          )}
        </div>
      </TableCell>
      <TableCell className="hidden lg:table-cell text-muted-foreground/80 font-mono text-xs font-medium py-4">
        {aircraft?.model || "—"}
      </TableCell>
      <TableCell className="hidden md:table-cell text-muted-foreground/80 font-mono text-xs font-medium py-4">
        {number || "—"}
      </TableCell>
      <TableCell className="text-center py-4">
        {status === "Live" || status === "Arrived" || status === "Departed" ? (
             <div className="flex items-center justify-center gap-1.5 px-2 py-0.5 rounded-full bg-blue-50/50 text-blue-500/80 border border-blue-100/50 w-fit mx-auto">
                <span className="text-[10px] font-bold uppercase tracking-wider">
                    {status}
                </span>
             </div>
        ) : (
            <div className="flex items-center justify-center gap-1.5 px-2 py-0.5 rounded-full bg-slate-50/50 text-slate-500/80 border border-slate-100/50 w-fit mx-auto">
                <span className="text-[10px] font-bold uppercase tracking-wider">
                    {status || "Scheduled"}
                </span>
            </div>
        )}
      </TableCell>
    </TableRow>
  );
});
FlightRow.displayName = "FlightRow";

const FlightTable = memo(({ flights, type }: FlightTableProps) => {
  const isArrival = type === "arrival";
  const Icon = isArrival ? PlaneLanding : PlaneTakeoff;
  const colorClass = isArrival ? "text-blue-500" : "text-emerald-500";
  const label = isArrival ? "HAVAALANI VARIŞLARI" : "HAVAALANI KALKIŞLARI";

  return (
    <div className="border border-slate-100/50 bg-card/40 backdrop-blur-md shadow-sm rounded-2xl overflow-hidden transition-all h-full">
      <div className="flex items-center gap-3 px-6 py-4 border-b border-slate-100/50 bg-slate-50/20">
        <div className={`p-2 rounded-lg bg-white shadow-sm border border-slate-100 ${colorClass}`}>
            <Icon className="w-4 h-4" />
        </div>
        <div>
            <h3 className="font-bold text-xs uppercase tracking-[0.1em] text-foreground/80">{label}</h3>
            <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">{flights?.length || 0} AKTİF UÇUŞ</p>
        </div>
      </div>

      {!flights || flights.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-muted-foreground/60 gap-3">
            <Info className="w-8 h-8 opacity-20" />
            <p className="text-xs font-semibold uppercase tracking-widest">Uçuş verisi bulunamadı</p>
        </div>
      ) : (
        <div className="relative w-full overflow-auto max-h-[500px] no-scrollbar">
          <Table>
            <TableHeader className="bg-muted/5 sticky top-0 z-10 backdrop-blur-sm border-b border-slate-100/50">
              <TableRow className="hover:bg-transparent border-none">
                <TableHead className="font-bold text-xs uppercase tracking-wider text-muted-foreground/80 h-11">Sefer</TableHead>
                <TableHead className="font-bold text-xs uppercase tracking-wider text-muted-foreground/80 h-11">Havayolu</TableHead>
                <TableHead className="font-bold text-xs uppercase tracking-wider text-muted-foreground/80 h-11">{isArrival ? "Nereden" : "Nereye"}</TableHead>
                <TableHead className="font-bold text-xs uppercase tracking-wider text-muted-foreground/80 h-11">Saat</TableHead>
                <TableHead className="hidden lg:table-cell font-bold text-xs uppercase tracking-wider text-muted-foreground/80 h-11">Uçak</TableHead>
                <TableHead className="hidden md:table-cell font-bold text-xs uppercase tracking-wider text-muted-foreground/80 h-11">Kuyruk</TableHead>
                <TableHead className="font-bold text-xs uppercase tracking-wider text-muted-foreground/80 h-11 text-center">Durum</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {flights.map((f, i) => (
                <FlightRow key={f.callSign + i} flight={f} />
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
});
FlightTable.displayName = "FlightTable";

export default FlightTable;
