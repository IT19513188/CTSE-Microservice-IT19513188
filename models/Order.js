const mongoose = require('mongoose');
const schema = mongoose.Schema;

const orderDetailSchema = new schema({
    
    orderId:{
        type: String,
        required: true,
        unique:true
    },
    user:{
        type: String,
        required: true
    },
    orderItems:{
        type: Array,
        required: true
    },
    orderDate:{
        type: String,
        required: true
    },
    totalCharge:{
        type: Number,
        required: true
    }
})

const Order = mongoose.model("orderDetail",orderDetailSchema);

module.exports = Order;