const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const bodyParser = require("body-parser");
const path = require("path");

const Product = require("./models/Product");
const authRoutes = require("./routes/auth");
const shopRoutes = require("./routes/shop");

const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/ecommerceDB")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret: "ecommerce_secret",
    resave: false,
    saveUninitialized: false
}));

app.use((req, res, next) => {
    res.locals.isAuthenticated = req.session.isLoggedIn;
    next();
});

app.use(authRoutes);
app.use(shopRoutes);

app.get("/seed", async (req, res) => {
    await Product.deleteMany();

    await Product.insertMany([
{
name:"C++ Programming Book",
price:499,
image:"https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800",
description:"Complete C++ Guide",
category:"Books"
},
{
name:"Python Programming Book",
price:699,
image:"https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800",
description:"Learn Python Programming",
category:"Books"
},
{
name:"Java Programming Book",
price:599,
image:"https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=800",
description:"Master Java Development",
category:"Books"
},

{
name:"Men T-Shirt",
price:799,
image:"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800",
description:"Premium Cotton T-Shirt",
category:"Clothes"
},
{
name:"Blue Jeans",
price:1499,
image:"https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800",
description:"Slim Fit Jeans",
category:"Clothes"
},

{
name:"Dell Inspiron 15",
price:54999,
image:"https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800",
description:"Dell Laptop i5",
category:"Laptops"
},
{
name:"HP Pavilion",
price:62999,
image:"https://images.unsplash.com/photo-1517336714739-489689fd1ca8?w=800",
description:"HP Laptop Ryzen 7",
category:"Laptops"
},
{
name:"Lenovo IdeaPad",
price:58999,
image:"https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800",
description:"Lenovo Laptop",
category:"Laptops"
},

{
name:"Samsung Galaxy S25",
price:74999,
image:"https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800",
description:"Samsung Flagship Phone",
category:"Mobiles"
},
{
name:"iPhone 16",
price:79999,
image:"https://images.unsplash.com/photo-1592286927505-1def25115558?w=800",
description:"Apple iPhone 16",
category:"Mobiles"
},
{
name:"OnePlus 13",
price:59999,
image:"https://images.unsplash.com/photo-1580910051074-3eb694886505?w=800",
description:"OnePlus Smartphone",
category:"Mobiles"
}
]);
       

    res.send("Products Seeded");
});

app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});