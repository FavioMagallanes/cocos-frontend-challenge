import { FC } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { OrderData } from "@/api";
import { OrderForm } from "./order-form";

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
        <DialogTitle className="text-[#002C65] mb-2 dark:text-gray-100">
          {orderData?.name} ({orderData?.ticker})
        </DialogTitle>
        {orderData?.name && (
          <DialogDescription className="text-gray-600 text-xs dark:text-gray-400">
            Realice una orden de compra o venta de:{" "}
            <span className="text-[#0062E1] font-semibold">
              {" "}
              {orderData?.name}
            </span>
          </DialogDescription>
        )}
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
