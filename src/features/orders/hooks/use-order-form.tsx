import { OrderData, OrderItem, OrderResponse } from "@/api";
import { useSubmitOrder } from "@/features/orders/hooks/use-submit-order";
import { toast } from "sonner";

export const useOrderForm = (
  instrument: OrderData | null,
  onClose: () => void
) => {
  const submitOrderMutation = useSubmitOrder();

  const handleSubmit = async (data: {
    operation: "BUY" | "SELL";
    type: "MARKET" | "LIMIT";
    price?: number;
    quantity: number;
  }) => {
    if (!instrument) return;

    const orderItem: OrderItem = {
      instrument_id: instrument?.id || 0,
      side: data.operation,
      type: data.type,
      quantity: data.quantity,
      ...(data.type === "LIMIT" && { price: data.price }),
    };

    try {
      const response = await submitOrderMutation.mutateAsync(orderItem);
      const toastMessage = `
      🎉 Orden ${response.id} ${
        response.status === "FILLED" ? "ejecutada" : "enviada"
      } con éxito.
      ${instrument?.ticker} ${
        data.operation === "BUY" ? "compradas" : "vendidas"
      }: ${orderItem.quantity}
      ${
        data.type === "LIMIT"
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
      onClose();
    } catch (error) {
      toast.error(`Error al enviar la orden: ${(error as Error).message}`, {
        duration: 5000,
      });
    }
  };

  const showDetailToast = (response: OrderResponse, orderItem: OrderItem) => {
    const content = `
    📋 Detalles de Orden #${response.id}
    📊 Estado: ${response.status}
    🏷️ ${instrument?.name || ""} (${instrument?.ticker || ""})
    ${orderItem.side === "BUY" ? "🛒 Compra" : "💰 Venta"}
    ${orderItem.type === "MARKET" ? "🌍 Mercado" : "🎯 Límite"}
    🔢 Cantidad: ${orderItem.quantity}
    💵 Precio: ${orderItem.price ? `ARS ${orderItem.price}` : "Mercado"}
  `;
    toast.info(content, { duration: 7000 });
  };

  return {
    handleSubmit,
  };
};
