import { SearchInput } from "@/components/shared";
import { PortfolioTable } from "@/components/tables";

export const Portfolio = () => {
  return (
    <>
      <div>
        <SearchInput />
      </div>
      <div className="mt-12">
        <PortfolioTable />
      </div>
    </>
  );
};
