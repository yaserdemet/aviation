import Emergency from "@/components/aviationComponent/Emergency";
import { useEmergencyFlights } from "@/hooks/useEmergency";

export default function StarredPage() {
   const { data } = useEmergencyFlights();
    console.log(data);
  return (
    <div className="p-8">
      <Emergency />
    </div>
  )
}
