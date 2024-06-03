export const calculateReturn = (
  lastPrice: number,
  closePrice: number
): number => {
  return ((lastPrice - closePrice) / closePrice) * 100;
};
