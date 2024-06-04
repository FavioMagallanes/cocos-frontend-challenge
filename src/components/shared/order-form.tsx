import { FC } from "react";
import { ChevronDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Instruments } from "@/api";
import { useOrderForm } from "@/features/orders/hooks/use-order-form";

type OrderFormProps = {
  instrument: Instruments | null;
  onClose: () => void;
};

export const OrderForm: FC<OrderFormProps> = ({ instrument, onClose }) => {
  const {
    operation,
    setOperation,
    type,
    setType,
    price,
    setPrice,
    quantity,
    setQuantity,
    handleSubmit,
  } = useOrderForm(instrument, onClose);

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-4 py-4">
        <div className="grid items-center grid-cols-4 gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="col-span-4 h-10 rounded-md bg-white dark:bg-gray-800 dark:text-gray-300 dark:border-gray-800"
              >
                <p>{operation}</p>
                <ChevronDownIcon className="w-4 h-4 ml-auto" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setOperation("BUY")}>
                Compra
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setOperation("SELL")}>
                Venta
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="col-span-4 h-10 rounded-md bg-white dark:bg-gray-800 dark:text-gray-300 dark:border-gray-800"
              >
                <p>{type}</p>
                <ChevronDownIcon className="w-4 h-4 ml-auto" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setType("MARKET")}>
                Mercado
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setType("LIMIT")}>
                Límite
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        {type === "LIMIT" && (
          <div className="grid items-center grid-cols-4 gap-4">
            <Input
              id="price"
              type="number"
              value={price}
              onChange={e => setPrice(e.target.value)}
              placeholder="ARS 0.00"
              className="col-span-4 h-10 rounded-md bg-white dark:bg-gray-800 dark:text-gray-300"
            />
          </div>
        )}
        <div className="grid items-center grid-cols-4 gap-4">
          <Input
            id="quantity"
            type="number"
            value={quantity}
            onChange={e => setQuantity(e.target.value)}
            placeholder="Cantidad de acciones"
            className="col-span-4 h-10 rounded-md bg-white dark:bg-gray-800 dark:text-gray-300"
          />
        </div>
      </div>
      <DialogFooter className="flex justify-end gap-2">
        <Button
          type="submit"
          className="h-10 rounded-md bg-gray-900 text-gray-50 hover:bg-gray-900/90 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90"
        >
          Enviar orden
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={onClose}
          className="h-10 rounded-md bg-white text-gray-900 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
        >
          Cancelar
        </Button>
      </DialogFooter>
    </form>
  );
};
