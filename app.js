const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("سلام بر استاد سالکی این یک پیام ابری هست!");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
