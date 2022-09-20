const path = require("path");
const express = require("express");
var cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const authRoute = require("./routes/authRoute");
const userRoute = require("./routes/userRoute");
const restaurantRoute = require("./routes/restaurantRoute");
const orderRoute = require("./routes/orderRoute");

dotenv.config();
const app = express();

mongoose.Promise = global.Promise;

mongoose
  .connect(process.env.DB)
  .then(() => console.log("Success"))
  .catch((err) => console.log(err));
app.use(cors());
app.options("*", cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/res", restaurantRoute);
app.use("/api/order", orderRoute);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Listening from port ${port}`);
});
