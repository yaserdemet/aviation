import React from "react";
import { PlaneTakeoff, PlaneLanding, Pencil } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { dataFlight } from "./data";
import AddNewFlight from "./AddNewFlight";
import { Button } from "@/components/ui/button";
import { UpdateFlight } from "./UpdateFligh";
const Form93Component = () => {
  const [flights, setFlights] = React.useState(dataFlight);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  return (
    <>
      <div className="p-4 sm:p-8 space-y-8">
        <>
          <div className="border border-slate-100/50 bg-card/40 backdrop-blur-md shadow-sm rounded-2xl overflow-hidden transition-all">
            <AddNewFlight
              flights={flights}
              setFlights={setFlights}
              open={isModalOpen}
              onOpenChange={setIsModalOpen}
            />
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-muted/10 border-b border-slate-100/50">
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="w-35 font-semibold text-xs uppercase tracking-wider text-muted-foreground/80">
                      Çağrı Kodu
                    </TableHead>
                    <TableHead className="min-w-37.5 font-semibold text-xs uppercase tracking-wider text-muted-foreground/80">
                      Uçak Tipi
                    </TableHead>
                    <TableHead className=" font-semibold text-xs uppercase tracking-wider text-muted-foreground/80">
                      Squawk
                    </TableHead>
                    <TableHead className="font-semibold text-xs uppercase tracking-wider text-muted-foreground/80">
                      Kalkış
                    </TableHead>
                    <TableHead className="font-semibold text-xs uppercase tracking-wider text-muted-foreground/80">
                      Varış
                    </TableHead>
                    <TableHead className="font-semibold text-xs uppercase tracking-wider text-muted-foreground/80">
                      Havada Mı ?
                    </TableHead>
                    <TableHead className="font-semibold text-xs uppercase tracking-wider text-muted-foreground/80">
                      Uçuş Amacı
                    </TableHead>
                    <TableHead className="font-semibold text-xs uppercase tracking-wider text-muted-foreground/80">
                      Uçuş Tipi
                    </TableHead>
                    <TableHead className="font-semibold text-xs uppercase tracking-wider text-muted-foreground/80">
                      İşlemler
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {flights.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={9} className="text-center font-bold text-gray-700">
                        Henüz uçuş eklenmemiş.
                      </TableCell>
                    </TableRow>
                  )}
                  {flights.map((flight) => (
                    <TableRow
                      className="hover:bg-blue-50 hover:cursor-pointer"
                      key={flight.id}
                    >
                      <TableCell>{flight.callSign}</TableCell>
                      <TableCell>{flight.aircraftType}</TableCell>
                      <TableCell>{flight.squawk}</TableCell>
                      <TableCell>{flight.departure}</TableCell>
                      <TableCell>{flight.arrival}</TableCell>

                      <TableCell>
                        {flight.inAir ? (
                          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-blue-50/50 text-blue-500/80 border border-blue-100/50 w-fit">
                            <PlaneTakeoff className="w-3.5 h-3.5 opacity-60" />
                            <span className="text-[10px] font-semibold uppercase tracking-tight">
                              HAVADA
                            </span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-green-50/50 text-green-600/80 border border-green-100/50 w-fit">
                            <PlaneLanding className="w-3.5 h-3.5 opacity-60" />
                            <span className="text-[10px] font-semibold uppercase tracking-tight">
                              YERDE
                            </span>
                          </div>
                        )}
                      </TableCell>
                      <TableCell>{flight.flightPurpose}</TableCell>
                      <TableCell>
                        {flight.flightType === "IFR" ? (
                          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-indigo-50/50 text-indigo-500/80 border border-indigo-100/50 w-fit uppercase font-semibold text-[10px] tracking-wider">
                            IFR
                          </div>
                        ) : (
                          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-amber-50/50 text-amber-500/80 border border-amber-100/50 w-fit uppercase font-semibold text-[10px] tracking-wider">
                            VFR
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        <UpdateFlight
                          flights={flights}
                          setFlights={setFlights}
                          id={flight.id}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </>
      </div>
    </>
  );
};

export default Form93Component;
