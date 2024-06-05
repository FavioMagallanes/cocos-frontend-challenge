export const calculateReturn = (
  lastPrice: number,
  closePrice: number
): number => {
  return ((lastPrice - closePrice) / closePrice) * 100;
};
export const calculateGain = (
  lastPrice: number,
  avgCostPrice: number,
  quantity: number
): number => {
  return (lastPrice - avgCostPrice) * quantity;
};
export const calculateMarketValue = (quantity: number, lastPrice: number) => {
  return quantity * lastPrice;
};
