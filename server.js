// Create an express app
const express = require("express")
const app = express()
const port = process.env.PORT || 8080;

// Use the static
app.use(express.static("dist"));

// Start the server
app.listen(port, 
	() => console.log(`Server is running on port ${port}...`));