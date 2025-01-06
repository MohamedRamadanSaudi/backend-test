require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require("morgan");
const connectDB = require('./config/database');
const AppError = require('./utils/appError');
const errorHandler = require('./middlewares/errorHandler');
// const rateLimiter = require('./middlewares/rateLimiter');
// const HealthCheck = require('./utils/healthCheck');
// const redisClient = require('./config/redis');

const User = require('./routes/userRoutes');
const auth = require('./routes/authRoutes');
const admin = require('./routes/adminRoutes');
// const Products = require('./routes/productRoutes');

const { default: mongoose } = require('mongoose');

const app = express();

// Connect to Database
connectDB();

// Middlewares
app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.json());


// Routes
app.use('/user', User);
app.use('/auth', auth);
app.use('/admin', admin);


// Catch-all route handler for undefined routes
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Global error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

