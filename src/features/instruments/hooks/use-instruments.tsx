import { getInstruments } from "@/api/instruments";
import { useQuery } from "@tanstack/react-query";

export const useInstruments = () => {
  const query = useQuery({
    queryKey: ["instruments"],
    queryFn: getInstruments,
    staleTime: 60000,
  });
  return query;
};
