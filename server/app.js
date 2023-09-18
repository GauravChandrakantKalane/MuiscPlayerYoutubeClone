require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

app.use(cors({ origin: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("This is Home Route");
});

// mongodb connections
mongoose.connect(process.env.DB_STRING, { useNewUrlParser: true });
mongoose.connection
  .once("open", () => {
    console.log("Connected");
  })
  .on("error", (e) => {
    console.log("Error " + e);
  });

// user authentication route
const userRouter = require("./routes/auth");
app.use("/api/users", userRouter);
// Artist Routes
const artistRoutes = require("./routes/artist");
app.use("/api/artists", artistRoutes);
// Albums Routes
const albumRoutes = require("./routes/albums");
app.use("/api/albums", albumRoutes);
// Songs Routes
const songRoutes = require("./routes/songs");
app.use("/api/songs", songRoutes);

app.listen(5000, () => {
  console.log("Server is Running Successfully...");
});
