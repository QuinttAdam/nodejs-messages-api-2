// require express
const express = require("express");
// create a new router
const router = express.Router();

// import controller
const messagesController = require("../../../controllers/api/v1/messages");

router.get("/", messagesController.index);
router.post("/", messagesController.create);
router.delete("/:id", messagesController.remove);
router.put("/:id", messagesController.update);
router.get("/:id", messagesController.getMessageById);

module.exports = router;
