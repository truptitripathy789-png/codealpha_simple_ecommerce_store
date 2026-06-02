const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    username: String,
    products: Array,
    total: Number
});

module.exports = mongoose.model("Order", orderSchema);