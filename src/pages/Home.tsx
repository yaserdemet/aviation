import { useEmergencyFlights } from "@/hooks/useEmergency";

export default function Page() {
  const { data } = useEmergencyFlights();
  console.log(data);
  return (
  <>
  
    
  </>
  )
}
