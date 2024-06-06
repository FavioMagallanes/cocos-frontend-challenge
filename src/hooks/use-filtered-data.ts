import { useState, useMemo } from "react";

type Stringable = string | number | boolean | null | undefined;

export const useFilteredData = <T, K extends keyof T>(data: T[], key: K) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = useMemo(() => {
    return data?.filter(item => {
      const value = item[key];
      return (value as Stringable)
        ?.toString()
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    });
  }, [data, searchTerm, key]);

  return { searchTerm, setSearchTerm, filteredData };
};
