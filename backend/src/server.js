const express = require("express");
const dbConnection = require("./config/db");
const Config = require("./config");
const cors = require("cors");
const path = require("path");
const userRoutes = require("./routes/userRoutes");
const courseRoutes = require("./routes/courseRoutes");

const app = express();

const PORT = Config.PORT || 5000;

// Middleware to parse incoming JSON
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Serve static files from the uploads directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// dbConnection
dbConnection();

// API routes
app.use("/api/users", userRoutes); // User-related routes
app.use("/api/courses", courseRoutes);

// Error Handling
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

app.listen(PORT, (err) => {
  if (err) {
    console.log(err, "Server is not connected");
  }
  console.log(`Listening on port : http://localhost:${PORT}`);
});
