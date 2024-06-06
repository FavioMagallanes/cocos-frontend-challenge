import { useMutation, useQueryClient } from "@tanstack/react-query";
import { submitOrder } from "@/api/orders";
import { OrderItem, OrderResponse } from "@/api/types";
import { toast } from "sonner";

/**
 * Hook `useSubmitOrder` para gestionar el envío de órdenes y manejar efectos secundarios.
 * Utiliza `useMutation` de React Query para manejar el estado de la mutación y `useQueryClient`
 * para invalidar consultas después de enviar una orden con éxito.
 *
 * @returns Un objeto de mutación que se puede usar para enviar órdenes, junto con el estado de la mutación y métodos.
 */
export const useSubmitOrder = () => {
  const queryClient = useQueryClient();

  return useMutation<OrderResponse, Error, OrderItem>({
    // Función para realizar el envío de la orden.
    mutationFn: (orderItem: OrderItem) => submitOrder(orderItem),

    onSuccess: () => {
      // Invalidar consultas para volver a obtener los datos de la cartera y los instrumentos.
      queryClient.invalidateQueries({ queryKey: ["portfolio"] });
      queryClient.invalidateQueries({ queryKey: ["instruments"] });
    },

    onError: error => {
      console.error("Error al enviar la orden:", error);
      toast.error(
        "Hubo un error al enviar la orden. Por favor, inténtalo de nuevo."
      );
    },
  });
};
