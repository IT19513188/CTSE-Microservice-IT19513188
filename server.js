require('dotenv').config({path: "./config.env"});
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const ConnectDB = require('./database/orderDB');

ConnectDB();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const order_routes = require('./routes/order_route');
app.use("/order",order_routes);

const PORT = process.env.PORT || 8080;

const server = app.listen(PORT , () => {
    console.log(`Server is running on ${PORT}`);
});

process.on("unhandledRejection", (err, promise) => {
    console.log(`Logged Error: ${err}`);
    server.close(() => process.exit(1));
});