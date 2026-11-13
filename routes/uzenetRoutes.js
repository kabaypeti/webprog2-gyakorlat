const router = require("express").Router();
const uzenetController = require("../controllers/uzenetController");

router.get("/", uzenetController.showForm);
router.post("/", uzenetController.sendMessage);
router.get("/lista", uzenetController.listMessages);

module.exports = router;