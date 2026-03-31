import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PencilIcon, TrashIcon } from "lucide-react";
import type { Flight } from "./data";

export function UpdateFlight({flights, setFlights, id}: {flights: Flight[], setFlights: React.Dispatch<React.SetStateAction<Flight[]>>, id: number}) {

    const deleteFlight = (id:number) => {
        const filterFlight = flights.filter((item) => item.id !== id )
        setFlights(filterFlight)
    }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Open</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align="start">
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => deleteFlight(id)} className="text-red-500 hover:cursor-pointer">
            <TrashIcon className="w-4 h-4" /> Sil {id}
          </DropdownMenuItem>
          <DropdownMenuItem className="text-blue-500 hover:cursor-pointer">
            <PencilIcon className="w-4 h-4" /> Düzenle {id}
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
