const express = require('express');
const router = express.Router();
const stripe = require('stripe')(require('../config/keys').stripeSecretKey);
const Transaction = require('../models/Transaction');

router.post('/pay', async (req, res) => {
  try {
    const { amount, source, currency } = req.body;

    const charge = await stripe.charges.create({
      amount,
      source,
      currency
    });

    const transaction = new Transaction({
      amount: charge.amount,
      currency: charge.currency,
      status: charge.status
    });

    await transaction.save();

    res.status(200).send({ success: true, charge });
  } catch (error) {
    res.status(500).send({ success: false, error: error.message });
  }
});

module.exports = router;
