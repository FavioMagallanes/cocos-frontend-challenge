import { FC } from "react";
import { Input } from "../ui/input";
import { SearchIcon } from "lucide-react";

type SearchInputProps = {
  onSearch: (value: string) => void;
  searchTerm: string;
};

export const SearchInput: FC<SearchInputProps> = ({ onSearch, searchTerm }) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };

  return (
    <div className="relative flex items-center max-w-md bg-white dark:bg-gray-800 dark:text-gray-300 rounded-md">
      <Input
        type="search"
        id="searchInput"
        placeholder="Filtrar por ticker..."
        value={searchTerm}
        className="flex-1 bg-transparent border focus:ring-0 focus:outline-none pl-4 pr-10"
        onChange={handleSearchChange}
      />

      <div className="absolute right-3">
        <SearchIcon
          name="search"
          size={18}
          className="text-gray-500 dark:text-gray-400"
        />
      </div>
    </div>
  );
};
