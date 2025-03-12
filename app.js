require("dotenv").config();
require("./db");

const express = require("express");
const cors = require("cors");
const app = express();
const FRONTEND_URL = process.env.ORIGIN || "http://localhost:5173"
// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware


app.use(cors({
  origin:[FRONTEND_URL],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

require("./config")(app);

// 👇 Start handling routes here
const indexRoutes = require("./routes/index.routes");
app.use("/api", indexRoutes);

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
