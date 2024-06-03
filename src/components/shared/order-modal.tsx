// src/components/modals/OrderModal.jsx
import { FC, useState } from "react";
import { ChevronDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
  DialogFooter,
} from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Instruments } from "@/api";

type OrderModalProps = {
  isOpen: boolean;
  onClose: () => void;
  instrument: Instruments | null;
};

export const OrderModal: FC<OrderModalProps> = ({
  isOpen,
  onClose,
  instrument,
}) => {
  const [operation, setOperation] = useState("buy");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Aquí iría la lógica para enviar la orden
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] p-6 rounded-lg shadow-lg bg-white dark:bg-gray-900">
        <DialogHeader>
          <DialogTitle className="text-gray-900 dark:text-gray-100">
            {instrument?.name} ({instrument?.ticker})
          </DialogTitle>
          <DialogDescription className="text-gray-600 dark:text-gray-400">
            Place your order for {instrument?.name}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid items-center grid-cols-4 gap-4">
              <Label
                htmlFor="operation"
                className="text-right font-medium text-gray-900 dark:text-gray-100"
              >
                Operation
              </Label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="col-span-3 h-10 rounded-md bg-white dark:bg-gray-800 dark:text-gray-300 dark:border-gray-800"
                  >
                    <div>{operation}</div>
                    <ChevronDownIcon className="w-4 h-4 ml-auto" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setOperation("buy")}>
                    Buy
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setOperation("sell")}>
                    Sell
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            {/* Otros campos similares para orderType, price, quantity */}
          </div>
          <DialogFooter className="flex justify-end gap-2">
            <Button
              type="submit"
              className="h-10 rounded-md bg-gray-900 text-gray-50 hover:bg-gray-900/90 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90"
            >
              Place Order
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="h-10 rounded-md bg-white text-gray-900 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              Cancel
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
