const express = require("express");
const Product = require("../models/Product");
const Order = require("../models/Order");

const router = express.Router();

let cart = [];

router.get("/", async (req, res) => {
    const products = await Product.find();
    res.render("index", { products });
});

router.get("/product/:id", async (req, res) => {
    const product = await Product.findById(req.params.id);
    res.render("product", { product });
});

router.get("/cart", (req, res) => {
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    res.render("cart", { cart, total });
});

router.post("/add-to-cart", async (req, res) => {
    const product = await Product.findById(req.body.productId);
    cart.push(product);
    res.redirect("/cart");
});

router.post("/place-order", async (req, res) => {
    if (!req.session.username) {
        return res.redirect("/login");
    }

    const total = cart.reduce((sum, item) => sum + item.price, 0);

    const order = new Order({
        username: req.session.username,
        products: cart,
        total
    });

    await order.save();
    cart = [];

    res.send("Order placed successfully!");
});

module.exports = router;