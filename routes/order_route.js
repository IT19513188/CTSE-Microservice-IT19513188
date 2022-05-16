const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const rn = require('random-number');

/**Inserting Order Details */
router.post("/add", async(req,res) => {
    var gen = rn.generator({
        min:  0, 
        max:  999999,
        integer: true
    })
    const newOrder = new Order({
        orderId : 'ORD'+gen(),
        user : req.body.user,
        orderItems:req.body.orderItems,
        orderDate : new Date().toLocaleString(),
        totalCharge : parseFloat(req.body.totalCharge)
    });
    await newOrder.save()
        .then(data => {
            res.status(200).send({ data: data });
        })
        .catch(error => {
            res.status(500).send({ error: error.message });
        });
})

/**Retrieving All Order Details */
router.get("/view", async(req,res) => {
    await Order.find()
    .then(data => {
        res.status(200).send({ data: data });
    })
    .catch(error => {
        res.status(500).send({ error: error.message });
    });
})

/**Retrieving Customer's Order Details */
router.get("/viewCustomerOrder/:user", async(req,res) => {
    if (req.params && req.params.user) {
        await Order.find({"user":req.params.user})
        .then(data => {
            res.status(200).send({ data: data });
        })
        .catch(error => {
            res.status(500).send({ error: error.message });
        });
    }
})

/**Retrieving One Order Detail */
router.get("/viewOne/:orderId", async(req,res) => {
    if (req.params && req.params.orderId) {
        await Order.findOne({"orderId":req.params.orderId})
        .then(data => {
            res.status(200).send({ data: data });
        })
        .catch(error => {
            res.status(500).send({ error: error.message });
        });
    }
})

/**Deleteing One Order Detail */
router.delete("/delete/:orderId", async(req,res) => {
    if (req.params && req.params.orderId) {
        await Order.deleteOne({"orderId":req.params.orderId})
        .then(data => {
            res.status(200).send({ data: data });
        })
        .catch(error => {
            res.status(500).send({ error: error.message });
        });
    }
})


module.exports = router;