const limitBuyMultiple = require('./limit-buy-multiple');
const getMinutesFrom630 = require('../utils/get-minutes-from-630');


const purchaseStocks = async (Robinhood, { stocksToBuy, strategy, multiplier }) => {
    const accounts = await Robinhood.accounts();
    // const ratioToSpend = Math.max(0.3, getMinutesFrom630() / 390);
    const cashAvailable = Number(accounts.results[0].sma) - 1000;
    // const totalAmtToSpend = cashAvailable * ratioToSpend;

    const amountPerBuy = 20 * multiplier;
    const totalAmtToSpend = Math.min(amountPerBuy, cashAvailable);
    if (totalAmtToSpend < 10) {
        return console.log('not purchasing less than $10 to spend', strategy);
    }
    console.log('actually purchasing', strategy, 'count', stocksToBuy.length);
    // console.log('ratioToSpend', ratioToSpend);
    console.log('totalAmtToSpend', totalAmtToSpend, 'amtperbuy', amountPerBuy);

    await limitBuyMultiple(Robinhood, {
        stocksToBuy,
        totalAmtToSpend,
        strategy
    });
};

module.exports = purchaseStocks;
