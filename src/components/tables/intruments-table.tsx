import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

export const IntrumentsTable = () => {
  const stocks = [
    {
      ticker: "AAPL",
      name: "Apple Inc.",
      price: "$132.45",
      return: "+2.5%",
    },
    {
      ticker: "MSFT",
      name: "Microsoft Corporation",
      price: "$285.67",
      return: "-1.2%",
    },
    {
      ticker: "AMZN",
      name: "Amazon.com, Inc.",
      price: "$3,245.89",
      return: "+4.8%",
    },
    {
      ticker: "GOOG",
      name: "Alphabet Inc. (Google)",
      price: "$2,567.34",
      return: "-0.7%",
    },
    {
      ticker: "TSLA",
      name: "Tesla, Inc.",
      price: "$675.12",
      return: "+6.3%",
    },
  ];
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-gray-700 dark:text-gray-300">
            Ticker
          </TableHead>
          <TableHead className="text-gray-700 dark:text-gray-300">
            Nombre
          </TableHead>
          <TableHead className="text-gray-700 dark:text-gray-300">
            Último precio
          </TableHead>
          <TableHead className="text-gray-700 dark:text-gray-300">
            Retorno
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {stocks.map(stock => (
          <TableRow
            key={stock.ticker}
            // onClick={() => onRowClick(stock)}
            className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <TableCell className="text-gray-700 dark:text-gray-300">
              {stock.ticker}
            </TableCell>
            <TableCell className="text-gray-700 dark:text-gray-300">
              {stock.name}
            </TableCell>
            <TableCell className="text-gray-700 dark:text-gray-300">
              {stock.price}
            </TableCell>
            <TableCell className="text-gray-700 dark:text-gray-300">
              {stock.return}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
