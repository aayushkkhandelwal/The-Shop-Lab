// IMPORTS
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const app = express();

//  MIDDLEWARE
app.use(cors());
app.use(express.json());

//  SERVE FRONTEND 
app.use(express.static(path.join(__dirname, "../")));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../indexamazon.html"));
});

//  CONNECT MONGODB
mongoose.connect("mongodb://127.0.0.1:27017/ecommerce")
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.log(err));


// USER SCHEMA
const userSchema = new mongoose.Schema({
  email: String,
  password: String
});

const User = mongoose.model("User", userSchema);

// ORDER SCHEMA
const orderSchema = new mongoose.Schema({
  name: String,
  address: String,
  phone: String,
  cart: Array
});

const Order = mongoose.model("Order", orderSchema);

// REGISTER API
app.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ success: false, message: "User already exists" });
    }
    const user = new User({ email, password });
    await user.save();
    res.json({ success: true, message: "User registered" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false });
  }
});

// LOGIN API
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    if (user) {
      res.json({ success: true });
    } else {
      res.json({ success: false });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false });
  }
});

// ORDER API
app.post("/order", async (req, res) => {
  try {
    const { name, address, phone, cart } = req.body;
    const newOrder = new Order({
      name,
      address,
      phone,
      cart
    });
    await newOrder.save();
    res.json({ success: true, message: "Order placed successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false });
  }
});

// TEST ROUTE (OPTIONAL)

app.get("/test", (req, res) => {
  res.send("Server is working 🚀");
});

// START SERVER
app.listen(5000, () => {
  console.log("Server running on port 5000");
});

app.get("/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

app.get("/add-test", async (req, res) => {
  const user = new User({
    email: "test@gmail.com",
    password: "1234"
  });

  await user.save();
  res.send("Test user added ✅");
});