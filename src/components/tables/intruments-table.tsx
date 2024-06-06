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
import { ErrorMessage, Spinner } from "@/components/shared";
import { TrendingDownIcon, TrendingUpIcon } from "lucide-react";
import { OrderModal, useModalState } from "../modal";

export const InstrumentsTable = () => {
  const { isModalOpen, selectedItem, openModal, closeModal } = useModalState();
  const { data: instruments, isLoading, isError } = useInstruments();

  if (isLoading) return <Spinner />;
  if (isError) return <ErrorMessage />;

  return (
    <>
      <Table>
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
          {instruments?.map(item => {
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
