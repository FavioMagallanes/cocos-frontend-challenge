import { useState } from "react";
import { Instruments } from "@/api";
import { OrderItem, OrderResponse } from "@/api/types";
import { useSubmitOrder } from "@/features/orders/hooks/use-submit-order";
import { toast } from "sonner";

export const useOrderForm = (
  instrument: Instruments | null,
  onClose: () => void
) => {
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
        ${type === "LIMIT" ? `a ARS ${orderItem.price}` : "a precio de mercado"}
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

  return {
    operation,
    setOperation,
    type,
    setType,
    price,
    setPrice,
    quantity,
    setQuantity,
    handleSubmit,
  };
};
