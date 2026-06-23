const express = require("express");
const { submitPropertyCallback, submitContactPageQuery } = require("../../controllers/InquiryController/inquiryController");

const router = express.Router();

router.post("/property-callback", submitPropertyCallback);
router.post("/contact-page-query", submitContactPageQuery); // ⬅️ Ensure this route line is active

module.exports = router;