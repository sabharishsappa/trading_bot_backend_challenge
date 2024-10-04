require("dotenv").config();

// setting api key and other constants
module.exports = {
  ALPHA_VANTAGE_API_KEY: process.env.ALPHA_VANTAGE_API_KEY,
  INITIAL_BALANCE: process.env.INITIAL_BALANCE || 10000,
  SYMBOL: process.env.SYMBOL || "ICICIBANK",
};
