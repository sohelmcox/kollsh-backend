const router = require("express").Router();
const { authControllers } = require("../api/v1/auth");

router.post("/local/login", authControllers.localLogin);
router.post("/local/register", authControllers.localRegister);
router.get("/email-confirmation", authControllers.emailConfirmation);
router.post("/send-email-confirmation", authControllers.sendEmailConfirmation);
router.post("/forgot-password", authControllers.forgotPassword);
router.post("/reset-password", authControllers.resetPassword);
module.exports = router;
