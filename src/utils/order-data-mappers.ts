import { Instruments, OrderData, Portfolio } from "@/api";

export const mapInstrumentToOrderData = (
  instrument: Instruments
): OrderData => ({
  id: instrument.id,
  ticker: instrument.ticker,
  name: instrument.name,
  lastPrice: instrument.last_price,
  closePrice: instrument.close_price,
});

export const mapPortfolioToOrderData = (portfolio: Portfolio): OrderData => ({
  id: portfolio.instrument_id,
  ticker: portfolio.ticker,
  name: "",
  lastPrice: portfolio.last_price,
  closePrice: portfolio.close_price,
  quantity: portfolio.quantity,
});
