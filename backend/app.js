const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

// Initialize an Express app
const app = express();
require("./config/db");

// Import routes and configuration files
const routes = require("./routes/v1");
const config = require("./config");
const { notFound, errorHandler } = require("./middleware/error");
const path = require("path");

// Middleware to enable CORS (Cross-Origin Resource Sharing)
app.use(cors());

// Middleware to parse incoming JSON requests
app.use(express.json());

// Middleware to parse URL-encoded data (for form submissions, etc.)
app.use(express.urlencoded({ extended: true }));

// Middleware to parse cookies from the incoming requests
app.use(cookieParser());

// Use the routes with a prefix defined in the config file
app.use(config.PREFIX, routes);


// Serve frontend static (single page app) in production or when build exists
const frontendBuildPath = path.join(__dirname, "..", "frontend", "build");
app.use(express.static(frontendBuildPath));

// If no API route matched, return index.html (SPA client-side routing)
app.get("*", (req, res, next) => {
	// If request starts with API prefix, skip to notFound
	if (req.path.startsWith(config.PREFIX)) return next();
	res.sendFile(path.join(frontendBuildPath, "index.html"), (err) => {
		if (err) next();
	});
});

app.use(notFound);
app.use(errorHandler);

module.exports = app;
