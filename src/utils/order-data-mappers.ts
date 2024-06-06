import { Instruments, OrderData, Portfolio } from "@/api";

/**
 * Mapea un objeto de tipo `Instruments` a un objeto de tipo `OrderData`.
 *
 * @param {Instruments} instrument - El objeto instrumento que se va a mapear.
 * @returns {OrderData} El objeto mapeado de tipo `OrderData`.
 */
export const mapInstrumentToOrderData = (
  instrument: Instruments
): OrderData => ({
  id: instrument.id,
  ticker: instrument.ticker,
  name: instrument.name,
  lastPrice: instrument.last_price,
  closePrice: instrument.close_price,
});

/**
 * Mapea un objeto de tipo `Portfolio` a un objeto de tipo `OrderData`.
 *
 * @param {Portfolio} portfolio - El objeto portafolio que se va a mapear.
 * @returns {OrderData} El objeto mapeado de tipo `OrderData`.
 */
export const mapPortfolioToOrderData = (portfolio: Portfolio): OrderData => ({
  id: portfolio.instrument_id,
  ticker: portfolio.ticker,
  name: "",
  lastPrice: portfolio.last_price,
  closePrice: portfolio.close_price,
  quantity: portfolio.quantity,
});
