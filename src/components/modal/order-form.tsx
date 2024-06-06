import { FC } from "react";
import { useForm, Controller } from "react-hook-form";
import { useOrderForm } from "@/features/orders/hooks/use-order-form";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { OrderData } from "@/api";
import { ModalMenuItem } from "./modal-menu-item";

type OrderFormProps = {
  instrument: OrderData | null;
  onClose: () => void;
  isPortfolio: boolean;
  showOnlyBuy?: boolean;
};

type OrderFormData = {
  operation: "BUY" | "SELL";
  type: "MARKET" | "LIMIT";
  price?: number;
  quantity: number;
};

export const OrderForm: FC<OrderFormProps> = ({
  instrument,
  onClose,
  showOnlyBuy = false,
}) => {
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
              <ModalMenuItem
                value={field.value}
                options={showOnlyBuy ? ["BUY"] : ["BUY", "SELL"]}
                onChange={value => field.onChange(value)}
              />
            )}
          />

          <Controller
            name="type"
            control={control}
            render={({ field }) => (
              <ModalMenuItem
                value={field.value}
                options={["MARKET", "LIMIT"]}
                onChange={value => field.onChange(value)}
              />
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
          className="h-10 rounded-md bg-[#0062E1] text-gray-50 hover:bg-[#002C65] dark:bg-[#0062E1] dark:text-gray-50 dark:hover:bg-[#002C65]"
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
