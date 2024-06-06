/**
 * Calcula el retorno porcentual de una inversión basado en el último precio y el precio de cierre.
 *
 * @param {number} lastPrice - El último precio conocido del activo.
 * @param {number} closePrice - El precio de cierre anterior del activo.
 * @returns {number} El retorno porcentual de la inversión.
 */
export const calculateReturn = (
  lastPrice: number,
  closePrice: number
): number => {
  return ((lastPrice - closePrice) / closePrice) * 100;
};

/**
 * Calcula la ganancia total de una inversión basado en el último precio, el costo promedio y la cantidad.
 *
 * @param {number} lastPrice - El último precio conocido del activo.
 * @param {number} avgCostPrice - El costo promedio del activo.
 * @param {number} quantity - La cantidad de unidades del activo.
 * @returns {number} La ganancia total de la inversión.
 */
export const calculateGain = (
  lastPrice: number,
  avgCostPrice: number,
  quantity: number
): number => {
  return (lastPrice - avgCostPrice) * quantity;
};

/**
 * Calcula el valor de mercado de una inversión basado en la cantidad y el último precio.
 *
 * @param {number} quantity - La cantidad de unidades del activo.
 * @param {number} lastPrice - El último precio conocido del activo.
 * @returns {number} El valor de mercado total de la inversión.
 */
export const calculateMarketValue = (
  quantity: number,
  lastPrice: number
): number => {
  return quantity * lastPrice;
};
