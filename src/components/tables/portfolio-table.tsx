import { usePortfolio } from "@/features/portfolio/hooks/use-portfolio";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { calculateGain, calculateMarketValue, calculateReturn } from "@/utils";
import { ErrorMessage, Spinner } from "@/components/shared";
import { TrendingDownIcon, TrendingUpIcon } from "lucide-react";

export const PortfolioTable = () => {
  const { data: portfolio, isLoading, isError } = usePortfolio();

  if (isLoading) return <Spinner />;
  if (isError) return <ErrorMessage />;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-gray-700 font-semibold dark:text-gray-300">
            Ticker
          </TableHead>
          <TableHead className="text-gray-700 font-semibold dark:text-gray-300">
            Cantidad
          </TableHead>
          <TableHead className="text-gray-700 font-semibold dark:text-gray-300">
            Valor de Mercado
          </TableHead>
          <TableHead className="text-gray-700 font-semibold dark:text-gray-300">
            Ganancia ($)
          </TableHead>
          <TableHead className="text-gray-700 font-semibold dark:text-gray-300">
            Rendimiento (%)
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {portfolio?.map((item, index) => {
          const marketValue = calculateMarketValue(
            item.quantity,
            item.last_price
          );
          const gain = calculateGain(
            item.quantity,
            item.last_price,
            item.avg_cost_price
          );
          const returnPercentage = calculateReturn(
            marketValue,
            item.avg_cost_price * item.quantity
          );
          const isNegative = gain < 0;
          return (
            <TableRow
              key={`${item.ticker}-${index}`}
              className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <TableCell className="text-gray-500 font-medium">
                {item.ticker}
              </TableCell>
              <TableCell className="text-gray-600 font-normal dark:text-gray-300">
                {item.quantity}
              </TableCell>
              <TableCell className="text-gray-500 font-normal dark:text-gray-200">
                ARS {marketValue.toFixed(2)}
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
                ARS {gain.toFixed(2)}
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
              <TableCell
                className={`
                  text-gray-700 dark:text-gray-300
                  ${
                    returnPercentage < 0
                      ? "text-red-500 font-normal dark:text-red-300"
                      : "text-green-500 font-normal dark:text-green-300"
                  }`}
              >
                {returnPercentage.toFixed(2)}%
                {returnPercentage < 0 ? (
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
  );
};
