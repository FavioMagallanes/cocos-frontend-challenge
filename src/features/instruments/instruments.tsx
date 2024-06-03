import { SearchInput } from "@/components/shared";
import { InstrumentsTable } from "@/components/tables";

export const Instruments = () => {
  return (
    <>
      <div>
        <SearchInput />
      </div>
      <div className="mt-12">
        <InstrumentsTable />
      </div>
    </>
  );
};
