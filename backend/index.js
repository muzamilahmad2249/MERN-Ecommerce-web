const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// ✅ MongoDB connection
mongoose
  .connect(process.env.MONGO_URI) // use env variable on Vercel
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => console.error("MongoDB connection error:", err));

// ⚠️ Local file uploads won’t persist on Vercel
const storage = multer.diskStorage({
  destination: "./upload/images",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

app.post("/addproduct", async (req, res) => {
  let products = await Product.find({});
  let id = products.length > 0 ? products[products.length - 1].id + 1 : 1;

  const product = new Product({
    id,
    name: req.body.name,
    image: req.body.image, // ✅ should be Cloudinary URL
    category: req.body.category,
    new_price: req.body.new_price,
    old_price: req.body.old_price,
  });

  await product.save();
  res.json({ success: true, name: req.body.name });
});

// Import routes
const orderRoutes = require("./routes/orderRoutes");
app.use("/api/orders", orderRoutes);

// =======================
// Product Model + Routes
// =======================
const Product = mongoose.model("Product", {
  id: { type: Number, required: true },
  name: { type: String, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
  new_price: { type: Number, required: true },
  old_price: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  available: { type: Boolean, default: true },
});

app.post("/addproduct", async (req, res) => {
  let products = await Product.find({});
  let id = products.length > 0 ? products[products.length - 1].id + 1 : 1;

  const product = new Product({
    id,
    name: req.body.name,
    image: req.body.image,
    category: req.body.category,
    new_price: req.body.new_price,
    old_price: req.body.old_price,
  });

  await product.save();
  res.json({ success: true, name: req.body.name });
});

app.post("/removeproduct", async (req, res) => {
  await Product.findOneAndDelete({ id: req.body.id });
  res.json({ success: true, name: req.body.name });
});

app.get("/allproducts", async (req, res) => {
  let products = await Product.find({});
  res.send(products);
});

// =======================
// User Model + Auth
// =======================
const User = mongoose.model("User", {
  name: { type: String },
  email: { type: String, unique: true },
  password: { type: String, unique: true },
  cartData: { type: Object },
  date: { type: Date, default: Date.now },
});

app.post("/signup", async (req, res) => {
  let check = await User.findOne({ email: req.body.email });
  if (check) {
    return res
      .status(400)
      .json({ success: false, errors: "User already exists" });
  }

  let cart = {};
  for (let i = 0; i < 300; i++) {
    cart[i] = 0;
  }

  const user = new User({
    name: req.body.username,
    email: req.body.email,
    password: req.body.password,
    cartData: cart,
  });
  await user.save();

  const data = { user: { id: user.id } };
  const token = jwt.sign(data, process.env.JWT_SECRET || "secret_ecom");
  res.json({ success: true, token });
});

app.post("/login", async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (user && req.body.password === user.password) {
    const data = { user: { id: user.id } };
    const token = jwt.sign(data, process.env.JWT_SECRET || "secret_ecom");
    res.json({ success: true, token });
  } else {
    res.json({ success: false, errors: "Invalid email or password" });
  }
});

// =======================
// Products filtering
// =======================
app.get("/newcollections", async (req, res) => {
  let products = await Product.find({});
  let newcollection = products.slice(-8);
  res.send(newcollection);
});

app.get("/popularproducts", async (req, res) => {
  let products = await Product.find({ category: "men" });
  let popularproducts = products.slice(0, 4);
  res.send(popularproducts);
});

// =======================
// Middleware: fetchUser
// =======================
const fetchUser = async (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    return res.status(401).send({ errors: "No token provided" });
  }
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET || "secret_ecom");
    req.user = data.user;
    next();
  } catch {
    res.status(401).send({ errors: "Invalid token" });
  }
};

// Cart APIs
app.post("/addtocart", fetchUser, async (req, res) => {
  let userData = await User.findById(req.user.id);
  userData.cartData[req.body.itemId] += 1;
  await userData.save();
  res.send("Added");
});

app.post("/removefromcart", fetchUser, async (req, res) => {
  let userData = await User.findById(req.user.id);
  if (userData.cartData[req.body.itemId] > 0) {
    userData.cartData[req.body.itemId] -= 1;
  }
  await userData.save();
  res.send("Removed");
});

app.post("/getcart", fetchUser, async (req, res) => {
  let userData = await User.findById(req.user.id);
  res.json(userData.cartData || {});
});

// ✅ Export app instead of listening
module.exports = app;
