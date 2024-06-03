import { SearchInput } from "@/components/shared";
import { IntrumentsTable } from "@/components/tables";

export const Instruments = () => {
  return (
    <>
      <div>
        <SearchInput />
      </div>
      <div className="mt-12">
        <IntrumentsTable />
      </div>
    </>
  );
};
