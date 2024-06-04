import { useMutation, useQueryClient } from "@tanstack/react-query";
import { submitOrder } from "@/api/orders";
import { OrderItem, OrderResponse } from "@/api/types";
import { toast } from "sonner";

export const useSubmitOrder = () => {
  const queryClient = useQueryClient();

  return useMutation<OrderResponse, Error, OrderItem>({
    mutationFn: (orderItem: OrderItem) => submitOrder(orderItem),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["portfolio"] });
      queryClient.invalidateQueries({ queryKey: ["instruments"] });
    },
    onError: error => {
      console.error("Error posting order:", error);
      toast.error(
        "Hubo un error al enviar la orden. Por favor, inténtalo de nuevo."
      );
    },
  });
};
