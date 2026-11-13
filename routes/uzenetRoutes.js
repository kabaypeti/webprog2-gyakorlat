const router = require("express").Router();
const uzenetController = require("../controllers/uzenetController");
const { isAuthenticated } = require("../controllers/authMiddleware");

router.get("/", uzenetController.showForm);
router.post("/", uzenetController.sendMessage);

router.get("/lista", isAuthenticated, uzenetController.listMessages);

module.exports = router;