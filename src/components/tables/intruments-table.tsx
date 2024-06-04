import { useState } from "react";
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
import { ErrorMessage, OrderModal, Spinner } from "@/components/shared";
import { Instruments } from "@/api";
import { Icon } from "../icon";

export const InstrumentsTable = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInstrument, setSelectedInstrument] =
    useState<Instruments | null>(null);
  const { data: instruments, isLoading, isError } = useInstruments();

  if (isLoading) return <Spinner />;
  if (isError) return <ErrorMessage />;

  const handleRowClick = (instrument: Instruments) => {
    setSelectedInstrument(instrument);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedInstrument(null);
  };

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
                onClick={() => handleRowClick(item)}
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
                    <Icon
                      className="inline ml-1 text-gray-500"
                      size={18}
                      name="trending-down"
                    />
                  ) : (
                    <Icon
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
        onClose={handleModalClose}
        instrument={selectedInstrument}
      />
    </>
  );
};
