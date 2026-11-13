const router = require("express").Router();
const uzenetController = require("../controllers/uzenetController");

router.get("/", uzenetController.showForm);
router.post("/", uzenetController.sendMessage);

module.exports = router;