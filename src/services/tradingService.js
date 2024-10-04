const axios = require("axios");
const { ALPHA_VANTAGE_API_KEY } = require("../config/env");
const { INITIAL_BALANCE } = require("../config/env");

let balance = INITIAL_BALANCE;
let positions = [];
let tradeLog = [];

// function for fetching stock price using alphavantage api
// taken reference alphavantage documentation
async function fetchStockPrice(symbol = "ICICIBANK") {
  try {
    // making an api call using axios for fetching the price
    const response = await axios.get("https://www.alphavantage.co/query", {
      params: {
        function: "TIME_SERIES_INTRADAY",
        symbol: symbol,
        interval: "1min",
        apikey: ALPHA_VANTAGE_API_KEY,
      },
    });

    const timeSeries = response.data["Time Series (1min)"];
    if (!timeSeries) {
      console.error(
        "No time series data found. Check if the symbol is correct and your API key is valid."
      );
      return null;
    }

    // Get the most recent data point
    const latestTime = Object.keys(timeSeries)[0];
    const latestData = timeSeries[latestTime];
    const stockPrice = parseFloat(latestData["1. open"]);

    return stockPrice;
  } catch (error) {
    console.error("Error fetching stock price from Alpha Vantage:", error);
  }
}

// selling and buying business logic if and only if meeting specific requirements provided in documentation

let lastPrice = null;

async function trade(stockPrice) {
  const lastPosition = positions[positions.length - 1];

  //   initial case
  if (lastPrice === null) {
    lastPrice = stockPrice;
    return;
  }

  // selling the stock

  if (lastPosition && stockPrice >= lastPosition.price * 1.3) {
    balance += stockPrice;
    positions.pop();
    tradeLog.push({ action: "Sell", price: stockPrice });
  }

  //   buying the stock
  else if (!lastPosition && stockPrice <= lastPrice * 0.98) {
    balance -= stockPrice;
    positions.push({ action: "Buy", price: stockPrice });
    tradeLog.push({ action: "Buy", price: stockPrice });
  }

  lastPrice = stockPrice;
}

module.exports = { fetchStockPrice, trade, balance, tradeLog };
