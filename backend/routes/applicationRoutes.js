const express = require("express");
const router = express.Router();
const applicationController = require("../controllers/applicationController");
const {
    getApplicationsByEntrepreneur,
  } = require("../controllers/applicationController");

// POST /api/applications - Submit a new application
router.post("/", applicationController.submitApplication);
router.get("/by-entrepreneur/:email", getApplicationsByEntrepreneur);
router.get("/by-student/:email", applicationController.getApplicationsByStudent);
router.put("/:applicationId/status", applicationController.updateApplicationStatus);

module.exports = router;
