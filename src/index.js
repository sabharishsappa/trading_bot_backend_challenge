const {
  fetchStockPrice,
  trade,
  balance,
} = require("./services/tradingService");
const { INITIAL_BALANCE } = require("./config/env");
const { logPerformance } = require("./utils/logger");
const { SYMBOL } = require("./config/env");

// fetching stock price and checks, whether we can make a trade with given conditions or not
const runBot = async () => {
  const stockPrice = await fetchStockPrice(SYMBOL);

  // after fetching stock price, checking for the trade
  if (stockPrice) {
    trade(stockPrice);
  }

  logPerformance(balance, INITIAL_BALANCE);
};

// Running the bot every 60 seconds
setInterval(runBot, 60000);
