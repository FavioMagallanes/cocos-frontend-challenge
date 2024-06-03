import { Icon } from "../icon";
import { Input } from "../ui/input";

export const SearchInput = () => {
  return (
    <div className="relative flex items-center max-w-md bg-white dark:bg-gray-800 dark:text-gray-300 rounded-md">
      <Input
        type="search"
        placeholder="Filtrar por ticker..."
        className="flex-1 bg-transparent border focus:ring-0 focus:outline-none pl-4 pr-10"
      />
      <div className="absolute right-3">
        <Icon
          name="search"
          size={18}
          className="text-gray-500 dark:text-gray-400"
        />
      </div>
    </div>
  );
};
