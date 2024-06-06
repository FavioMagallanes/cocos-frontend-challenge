import { useFilteredData } from "@/hooks/use-filtered-data"; // Importa el custom hook
import { useInstruments } from "@/features/instruments/hooks/use-instruments";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { calculateReturn } from "@/utils";
import { ErrorMessage, Spinner, SearchInput } from "@/components/shared";
import { TrendingDownIcon, TrendingUpIcon } from "lucide-react";
import { OrderModal, useModalState } from "../modal";
import { Instruments } from "@/api";

export const InstrumentsTable = () => {
  const { isModalOpen, selectedItem, openModal, closeModal } = useModalState();
  const { data: instruments, isLoading, isError } = useInstruments();
  const {
    searchTerm,
    setSearchTerm,
    filteredData: filteredInstruments,
  } = useFilteredData<Instruments, "ticker">(instruments || [], "ticker");

  if (isLoading) return <Spinner />;
  if (isError) return <ErrorMessage />;

  return (
    <>
      <SearchInput searchTerm={searchTerm} onSearch={setSearchTerm} />
      <Table className="mt-12">
        <TableHeader>
          <TableRow>
            <TableHead className="text-gray-700 font-semibold dark:text-gray-300">
              Ticker
            </TableHead>
            <TableHead className="text-gray-700 font-semibold dark:text-gray-300">
              Nombre
            </TableHead>
            <TableHead className="text-gray-700 font-semibold dark:text-gray-300">
              Último precio
            </TableHead>
            <TableHead className="text-gray-700 font-semibold dark:text-gray-300">
              Retorno
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredInstruments?.map((item: Instruments) => {
            const returnValue = calculateReturn(
              item.last_price,
              item.close_price
            );
            const isNegative = returnValue < 0;
            return (
              <TableRow
                key={item.ticker}
                className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={() => openModal(item, "instruments")}
              >
                <TableCell className="text-gray-500 font-medium">
                  {item.ticker}
                </TableCell>
                <TableCell className="text-gray-600 font-normal dark:text-gray-300">
                  {item.name}
                </TableCell>
                <TableCell className="text-gray-500 font-normal dark:text-gray-200">
                  ARS {item.last_price.toFixed(2)}
                </TableCell>
                <TableCell
                  className={`
                    text-gray-700 dark:text-gray-300
                    ${
                      isNegative
                        ? "text-red-500 font-normal dark:text-red-300"
                        : "text-green-500 font-normal dark:text-green-300"
                    }`}
                >
                  {returnValue.toFixed(2)}%
                  {isNegative ? (
                    <TrendingDownIcon
                      className="inline ml-1 text-gray-500"
                      size={18}
                      name="trending-down"
                    />
                  ) : (
                    <TrendingUpIcon
                      className="inline ml-1 text-gray-500"
                      size={18}
                      name="trending-up"
                    />
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <OrderModal
        isOpen={isModalOpen}
        onClose={closeModal}
        orderData={selectedItem}
        isFromInstrumentsTable
      />
    </>
  );
};
