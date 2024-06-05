import { getPortfolio } from "@/api";
import { useQuery } from "@tanstack/react-query";

export const usePortfolio = () => {
  const query = useQuery({
    queryKey: ["portfolio"],
    queryFn: getPortfolio,
    staleTime: 60000,
  });
  return query;
};
