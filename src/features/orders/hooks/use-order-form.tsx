/**
 * El hook useOrderForm gestiona el envío de órdenes de compra o venta de instrumentos financieros,
 * mostrando mensajes con los detalles de la orden y gestionando los errores.
 * @param {OrderData | null} instrument - El parámetro `instrument` en el hook `useOrderForm
 * representa los datos del instrumento financiero para el que se está realizando la orden. Es del tipo
 * `OrderData | null`, donde `OrderData` es un tipo que probablemente contiene información sobre el
 * instrumento como su ID, nombre,
 * @param onClose - El parámetro `onClose` de la función `useOrderForm` es una función a la que se llama
 * cuando el formulario de pedido se cierra o se envía. Se utiliza normalmente para cerrar o descartar el formulario de pedido
 * modal o diálogo.
 * @returns El hook devuelve un objeto con una única propiedad
 * `handleSubmit`, que es una función utilizada para manejar el envío de un pedido.
 */
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
