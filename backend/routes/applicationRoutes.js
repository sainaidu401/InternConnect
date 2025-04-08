const express = require("express");
const router = express.Router();
const applicationController = require("../controllers/applicationController");

// POST /api/applications - Submit a new application
router.post("/", applicationController.submitApplication);

module.exports = router;
