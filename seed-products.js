const mongoose = require("mongoose");
const Product = require("./models/Product");

mongoose.connect("mongodb://127.0.0.1:27017/ecommerceDB");

const products = [
  {
    name: "C++ Programming Book",
    category: "Books",
    brand: "Pearson",
    price: 499,
    description: "Learn C++ from beginner to advanced",
    rating: 4.8,
    discount: 10
  },
  {
    name: "Python Programming Book",
    category: "Books",
    brand: "Packt",
    price: 699,
    description: "Complete Python Guide",
    rating: 4.9,
    discount: 15
  },
  {
    name: "Men T-Shirt",
    category: "Clothes",
    brand: "Puma",
    price: 799,
    description: "Premium Cotton T-Shirt",
    rating: 4.5,
    discount: 20
  },
  {
    name: "Dell Inspiron 15",
    category: "Laptops",
    brand: "Dell",
    price: 54999,
    description: "Intel i5, 16GB RAM, 512GB SSD",
    rating: 4.8,
    discount: 10
  },
  {
    name: "Samsung Galaxy S25",
    category: "Mobiles",
    brand: "Samsung",
    price: 74999,
    description: "Flagship Android Smartphone",
    rating: 4.8,
    discount: 10
  }
];

async function seedData() {
  await Product.deleteMany({});
  await Product.insertMany(products);
  console.log("Products Added Successfully");
  mongoose.connection.close();
}

seedData();