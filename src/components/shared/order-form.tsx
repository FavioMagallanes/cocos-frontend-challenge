import { FC } from "react";
import { useForm, Controller } from "react-hook-form";
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

type OrderFormData = {
  operation: "BUY" | "SELL";
  type: "MARKET" | "LIMIT";
  price?: number;
  quantity: number;
};

export const OrderForm: FC<OrderFormProps> = ({ instrument, onClose }) => {
  const {
    handleSubmit: handleFormSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<OrderFormData>({
    defaultValues: {
      operation: "BUY",
      type: "MARKET",
      price: undefined,
      quantity: 0,
    },
  });

  const { handleSubmit } = useOrderForm(instrument, onClose);

  const type = watch("type");

  return (
    <form onSubmit={handleFormSubmit(handleSubmit)}>
      <div className="grid gap-4 py-4">
        <div className="grid items-center grid-cols-4 gap-4">
          <Controller
            name="operation"
            control={control}
            render={({ field }) => (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="col-span-4 h-10 rounded-md bg-white dark:bg-gray-800 dark:text-gray-300 dark:border-gray-800"
                  >
                    <p>{field.value}</p>
                    <ChevronDownIcon className="w-4 h-4 ml-auto" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => field.onChange("BUY")}>
                    Compra
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => field.onChange("SELL")}>
                    Venta
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          />

          <Controller
            name="type"
            control={control}
            render={({ field }) => (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="col-span-4 h-10 rounded-md bg-white dark:bg-gray-800 dark:text-gray-300 dark:border-gray-800"
                  >
                    <p>{field.value}</p>
                    <ChevronDownIcon className="w-4 h-4 ml-auto" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => field.onChange("MARKET")}>
                    Mercado
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => field.onChange("LIMIT")}>
                    Límite
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          />
        </div>
        {type === "LIMIT" && (
          <div className="grid items-center grid-cols-4 gap-4">
            <Controller
              name="price"
              control={control}
              rules={{ required: "El precio es requerido para órdenes límite" }}
              render={({ field }) => (
                <div className="flex flex-col col-span-4">
                  <Input
                    id="price"
                    type="number"
                    {...field}
                    placeholder="ARS 0.00"
                    className="h-10 rounded-md bg-white dark:bg-gray-800 dark:text-gray-300 outline-none"
                  />
                  {errors.price && (
                    <span className="text-red-500 text-xs mt-1 font-medium">
                      {errors.price.message}
                    </span>
                  )}
                </div>
              )}
            />
          </div>
        )}
        <div className="grid items-center grid-cols-4 gap-4">
          <Controller
            name="quantity"
            control={control}
            rules={{
              required: "Cantidad es requerida",
              min: { value: 1, message: "La cantidad debe ser al menos 1" },
            }}
            render={({ field }) => (
              <div className="flex flex-col col-span-4">
                <Input
                  id="quantity"
                  type="number"
                  {...field}
                  placeholder="Cantidad de acciones"
                  className="h-10 rounded-md bg-white dark:bg-gray-800 dark:text-gray-300"
                />
                {errors.quantity && (
                  <span className="text-red-500 text-xs mt-1 font-medium">
                    {errors.quantity.message}
                  </span>
                )}
              </div>
            )}
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
