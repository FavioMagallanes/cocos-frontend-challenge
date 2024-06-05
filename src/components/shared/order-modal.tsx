import { FC } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Instruments } from "@/api";
import { OrderForm } from "../forms/order-form";

type OrderModalProps = {
  isOpen: boolean;
  onClose: () => void;
  instrument: Instruments | null;
};

export const OrderModal: FC<OrderModalProps> = ({
  isOpen,
  onClose,
  instrument,
}) => (
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
      <OrderForm instrument={instrument} onClose={onClose} />
    </DialogContent>
  </Dialog>
);
