const express = require("express");
const router = express.Router();

const { createFakeData, queryData, report } = require("./controller");

router.route("/fake").get(createFakeData);
router.route("/query").get(queryData);
router.route("/report").get(report);
module.exports = router;
