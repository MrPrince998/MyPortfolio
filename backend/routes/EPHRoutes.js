const express = require("express");
const router = express.Router();
const { EPHGet, EPHInsert } = require("../controller/EPHController");
const adminauth = require("../middleware/checkTokenMiddleware")

router.get("/eph-get", EPHGet);
router.post("/eph-post", adminauth, EPHInsert);

module.exports = router;
