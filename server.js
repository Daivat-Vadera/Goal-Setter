const path = require("path");
const express = require("express");
const dotenv = require("dotenv").config();
const colors = require("colors");
const bodyParser = require("body-parser");
const port = process.env.PORT || 5000;
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
const cors = require("cors");

const app = express();
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

connectDB();

// app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/goals", require("./routes/goalsRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use(errorHandler);

//serve frontend
if (process.env.NODE_ENV === "production") {
  const root = require("path").join(__dirname, "client", "build");
  app.use(express.static(root));
  app.get("*", (req, res) => {
    res.sendFile("index.html", { root });
  });
}

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
