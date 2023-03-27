const express = require("express");
const router = express.Router();
const chatController = require("../controllers/chat.controller");

router.get("/",chatController.chat);
router.post("/",chatController.reply);

module.exports = router;