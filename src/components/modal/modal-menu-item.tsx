import { FC } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDownIcon } from "lucide-react";
import { Button } from "../ui/button";

type ModalMenuItemProps = {
  value: string;
  options: string[];
  onChange: (value: string) => void;
};

export const ModalMenuItem: FC<ModalMenuItemProps> = ({
  value,
  options,
  onChange,
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="col-span-4 h-10 rounded-md bg-white dark:bg-gray-800 dark:text-gray-300 dark:border-gray-800"
        >
          <p>{value}</p>
          <ChevronDownIcon className="w-4 h-4 ml-auto" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {options.map((option, index) => (
          <DropdownMenuItem key={index} onClick={() => onChange(option)}>
            {option}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
