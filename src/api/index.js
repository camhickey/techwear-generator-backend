const express = require("express");

const router = express.Router();
const clothing = require("./clothing");

router.use("/clothing", clothing);

module.exports = router;
