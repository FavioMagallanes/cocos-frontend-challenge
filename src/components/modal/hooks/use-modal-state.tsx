import { useState } from "react";
import { Instruments, OrderData, Portfolio } from "@/api";
import {
  mapInstrumentToOrderData,
  mapPortfolioToOrderData,
} from "@/utils/order-data-mappers";

type ModalState = {
  selectedItem: OrderData | null;
  isModalOpen: boolean;
  itemType: "instruments" | "portfolio" | null;
};

export const useModalState = () => {
  const [modalState, setModalState] = useState<ModalState>({
    selectedItem: null,
    isModalOpen: false,
    itemType: null,
  });

  const openModal = (
    item: Instruments | Portfolio,
    itemType: "instruments" | "portfolio"
  ) => {
    // Mapea el elemento pasado al tipo OrderData correspondiente utilizando las funciones de mapeo adecuadas
    const mappedItem =
      itemType === "instruments"
        ? mapInstrumentToOrderData(item as Instruments)
        : mapPortfolioToOrderData(item as Portfolio);

    setModalState({ selectedItem: mappedItem, isModalOpen: true, itemType });
  };

  const closeModal = () =>
    setModalState({ ...modalState, isModalOpen: false, itemType: null });

  return {
    selectedItem: modalState.selectedItem,
    isModalOpen: modalState.isModalOpen,
    itemType: modalState.itemType,
    openModal,
    closeModal,
  };
};
