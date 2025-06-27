// routes/orderRoutes.js
const express = require("express");
const {placeOrder} = require('../controllers/orderController.js') ;
const { fetchUser } = require("./index.js");
cona



const orderRouter = express.Router();

orderRouter.post("/place", fetchUser, addOrderItems); // POST /api/orders to place order
orderRouter.get("/:id", fetchUser, getOrderById); // GET /api/orders/:id to get order details

module.exports = orderRouter;
