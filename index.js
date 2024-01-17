const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const cors = require("cors");
const useragent = require("express-useragent");

const { loggerMiddleware } = require("./middlewares/logger.middleware");
const portfolioRoute = require("./routes/portfolio");
const multerConfig = require("./configs/multer.config");
const corsConfig = require("./configs/cors.config");
const { DOC_TEMPLATE } = require("./utils/constants");

// Multipart defined variable
const upload = multer(multerConfig);
const app = express();
const port = 3000;

// Middleware
app.use(cors(corsConfig));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(upload.single("file"));
app.use(useragent.express());
app.use(loggerMiddleware);

// Base route
app.get("/", (req, res) => {
  res.send(DOC_TEMPLATE);
});

// Error handler
app.use(function (err, req, res, next) {
  console.error(err.message, err.stack);
  res.status(err.statusCode || 500).json({ error: err.message });
  return;
});

// Register routes
app.use("/api", portfolioRoute);

// Start Nodejs Server
app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
