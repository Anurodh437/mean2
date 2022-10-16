const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const taskRoutes = require("./routes/taskRoutes");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

const app = express();
dotenv.config();

// connect to database
connectDB();

// cors middleware to enable access from other servers
app.use(cors());

// body parser middleware
app.use(bodyParser.json());


// user routes
app.use("/api/users", userRoutes);

// task routes
app.use("/api/tasks",taskRoutes);


// index routing
app.get("/", (req, res) => {
  res.send("Server is Running");
});

// error middlewares
app.use(notFound);
app.use(errorHandler);

// ports
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server started on port ${PORT} 🚀`));
