const Razorpay = require('razorpay');

apiKey = "rzp_test_9dJ8hN80O5ZArS",
apiSecret = "pAkXSXOH2wvC6uzoB8GDAQPj"

const razorpay = new Razorpay({
  key_id: apiKey,
  key_secret: apiSecret,
});

module.exports = razorpay;