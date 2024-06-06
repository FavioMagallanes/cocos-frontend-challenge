import { useState, useMemo, useEffect } from "react";

type Stringable = string | number | boolean | null | undefined;

/**
 * Hook personalizado `useFilteredData` para filtrar datos basados en un término de búsqueda con debounce.
 *
 * @template T - Tipo de los elementos en el array de datos.
 * @template K - Clave de los elementos en el array de datos que se utilizará para filtrar.
 *
 * @param {T[]} data - Array de datos que se van a filtrar.
 * @param {K} key - Clave del objeto para filtrar.
 * @param {number} [debounceTime=300] - Tiempo de debounce en milisegundos.
 *
 * @returns Un objeto que contiene:
 * - `searchTerm`: Término de búsqueda actual.
 * - `setSearchTerm`: Función para actualizar el término de búsqueda.
 * - `filteredData`: Datos filtrados basados en el término de búsqueda.
 */
export const useFilteredData = <T, K extends keyof T>(
  data: T[],
  key: K,
  debounceTime: number = 300
) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  // Efecto para manejar el debounce del término de búsqueda.
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, debounceTime);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm, debounceTime]);

  // Memoización del resultado de los datos filtrados.
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
