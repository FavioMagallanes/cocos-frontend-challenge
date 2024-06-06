import { useState, useMemo, useEffect } from "react";

type Stringable = string | number | boolean | null | undefined;

export const useFilteredData = <T, K extends keyof T>(
  data: T[],
  key: K,
  debounceTime: number = 300
) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, debounceTime);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm, debounceTime]);

  const filteredData = useMemo(() => {
    return data?.filter(item => {
      const value = item[key];
      return (value as Stringable)
        ?.toString()
        .toLowerCase()
        .includes(debouncedSearchTerm.toLowerCase());
    });
  }, [data, debouncedSearchTerm, key]);

  return { searchTerm, setSearchTerm, filteredData };
};
