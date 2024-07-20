const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const paymentRoutes = require('./routes/payments');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api/payments', paymentRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ message: 'Something went wrong!', error: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
