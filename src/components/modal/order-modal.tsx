import { FC } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { OrderData } from "@/api";
import { OrderForm } from "../modal/order-form";

type OrderModalProps = {
  isOpen: boolean;
  onClose: () => void;
  orderData: OrderData | null;
  isFromInstrumentsTable?: boolean;
};

export const OrderModal: FC<OrderModalProps> = ({
  isOpen,
  onClose,
  orderData,
  isFromInstrumentsTable = false,
}) => (
  <Dialog open={isOpen} onOpenChange={onClose}>
    <DialogContent className="sm:max-w-[425px] p-6 rounded-lg shadow-lg bg-white dark:bg-gray-900">
      <DialogHeader>
        <DialogTitle className="text-gray-900 dark:text-gray-100">
          {orderData?.name} ({orderData?.ticker})
        </DialogTitle>
        <DialogDescription className="text-gray-600 dark:text-gray-400">
          Realice una orden de compra o venta de {orderData?.name}
        </DialogDescription>
      </DialogHeader>
      <OrderForm
        instrument={orderData}
        onClose={onClose}
        isPortfolio={!isFromInstrumentsTable}
        showOnlyBuy={isFromInstrumentsTable}
      />
    </DialogContent>
  </Dialog>
);
