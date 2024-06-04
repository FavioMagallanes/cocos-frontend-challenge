import { FC, useState } from "react";
import { ChevronDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Instruments } from "@/api";
import { OrderItem, OrderResponse } from "@/api/types";
import { useSubmitOrder } from "@/features/orders/hooks/use-submit-order";
import { toast } from "sonner";

type OrderModalProps = {
  isOpen: boolean;
  onClose: () => void;
  instrument: Instruments | null;
};

export const OrderModal: FC<OrderModalProps> = ({
  isOpen,
  onClose,
  instrument,
}) => {
  const [operation, setOperation] = useState<"BUY" | "SELL">("BUY");
  const [type, setType] = useState<"MARKET" | "LIMIT">("MARKET");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");

  const submitOrderMutation = useSubmitOrder();

  const resetForm = () => {
    setOperation("BUY");
    setType("MARKET");
    setPrice("");
    setQuantity("");
  };

  const showDetailToast = (response: OrderResponse, orderItem: OrderItem) => {
    const content = `
        📋 Detalles de Orden #${response.id}
        📊 Estado: ${response.status}
        🏷️ ${instrument?.name} (${instrument?.ticker})
        ${operation === "BUY" ? "🛒 Compra" : "💰 Venta"}
        ${type === "MARKET" ? "🌍 Mercado" : "🎯 Límite"}
        🔢 Cantidad: ${orderItem.quantity}
        💵 Precio: ${orderItem.price ? `ARS ${orderItem.price}` : "Mercado"}
      `;
    toast.info(content, { duration: 7000 });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!instrument) return;

    const orderItem: OrderItem = {
      instrument_id: instrument.id,
      side: operation,
      type,
      quantity: parseInt(quantity),
      ...(type === "LIMIT" && { price: parseFloat(price) }),
    };

    try {
      const response = await submitOrderMutation.mutateAsync(orderItem);
      const toastMessage = `
          🎉 Orden ${response.id} ${
        response.status === "FILLED" ? "ejecutada" : "enviada"
      } con éxito.
          ${instrument.ticker} ${
        operation === "BUY" ? "compradas" : "vendidas"
      }: ${orderItem.quantity}
          ${
            type === "LIMIT"
              ? `a ARS ${orderItem.price}`
              : "a precio de mercado"
          }
        `;
      toast.success(toastMessage, {
        duration: 5000,
        action: {
          label: "Ver detalles",
          onClick: () => showDetailToast(response, orderItem),
        },
      });
      resetForm();
      onClose();
    } catch (error) {
      toast.error(`Error al enviar la orden: ${(error as Error).message}`, {
        duration: 5000,
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] p-6 rounded-lg shadow-lg bg-white dark:bg-gray-900">
        <DialogHeader>
          <DialogTitle className="text-gray-900 dark:text-gray-100">
            {instrument?.name} ({instrument?.ticker})
          </DialogTitle>
          <DialogDescription className="text-gray-600 dark:text-gray-400">
            Realice una orden de compra o venta de {instrument?.name}
          </DialogDescription>
        </DialogHeader>
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
        {/* {errorMessage && <p className="mt-4 text-red-500">{errorMessage}</p>} */}
      </DialogContent>
    </Dialog>
  );
};
