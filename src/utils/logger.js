// function for logging profits or losses at that point of transaction

const logPerformance = (balance, initialBalance) => {
  const totalProfit = balance - initialBalance;
  console.log("Trading Bot Performance Summary:");
  console.log(`Balance: $${balance}`);
  console.log(`Total Profit: $${totalProfit}`);
};

module.exports = { logPerformance };
