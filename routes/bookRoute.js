// user.router.js
const express = require("express");
const router = express.Router();

const {createBooks, updateBooks, deleteBooks, getBooks} = require('../controllers/bookController.js'); // Import User controller

// Route to handle single user creation with file upload
router.post("/create", createBooks);
router.get("/get", getBooks);
router.put("/update/:id", updateBooks);

// Other user-related routes can be added here

module.exports = router;