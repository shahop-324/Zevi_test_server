const express = require("express");
const searchController = require("../controllers/searchController");

const router = express.Router();

router.post(
  "/images",
  // Insert middlewares if needed
  searchController.fetchImages,
  searchController.sendSearchResult
);

module.exports = router;
