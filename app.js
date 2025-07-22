// app.js
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3000;
const AUTH_TOKEN = process.env.AUTH_TOKEN || "default_secret_token";

// Middlewares
app.use(bodyParser.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Define schema/model
const UserSchema = new mongoose.Schema({
  name: String,
  age: Number,
});

const User = mongoose.model("User", UserSchema);

// Public GET route
app.get("/", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// Protected POST route
app.post("/add", async (req, res) => {
  const token = req.headers["authorization"];

  if (token !== `Bearer ${AUTH_TOKEN}`) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { name, age } = req.body;
  if (!name || !age) {
    return res.status(400).json({ error: "Name and age required" });
  }

  const user = new User({ name, age });
  await user.save();
  res.status(201).json({ message: "User added", user });
});

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
