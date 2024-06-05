import { LoaderIcon } from "lucide-react";

export const Spinner = () => {
  return (
    <div className="flex items-center justify-center">
      <LoaderIcon
        name="loader"
        className="animate-spin h-10 w-10 text-gray-500"
      />
    </div>
  );
};
