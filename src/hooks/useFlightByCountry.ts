import { useFlight, type OpenSkyResponse, type OpenSkyState } from "./useFlight";

export const useFlightsByCountry = () => {
  return useFlight({
    select: (data: OpenSkyResponse) => {
      const counts: Record<string, number> = {};
      data.states?.forEach((s: OpenSkyState) => {
        const country = s[2];
        counts[country] = (counts[country] || 0) + 1;
      });

      return Object.entries(counts)
        .map(([country, count]) => ({ country, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 10); // top 10
    },
  });
};