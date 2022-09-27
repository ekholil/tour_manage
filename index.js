const express = require("express");
const mongoose = require("mongoose");
const tourRouter = require("./routes/tour.route");
const app = express();
app.use(express.json());
require("dotenv").config();
const port = process.env.PORT || 5000;
app.use("/api/tours", tourRouter);

app.get("/", (req, res) => {
  res.status(200).send("Working");
});
async function dbConnect() {
  await mongoose.connect(process.env.MONGOCLOUD);
  console.log("db is connected");
}
dbConnect().catch((err) => console.log(err));
app.listen(port, () => {
  console.log("Servier is running");
});
