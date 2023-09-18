const router = require("express").Router();
const userController = require("../api/v1/user/controllers");
const authenticate = require("../middleware/authenticate");

router
  .route("/")
  .get(userController.find)
  .post(userController.create)
  .delete(userController.destroyMany);
router
  .route("/:id")
  .get(userController.findSingle)
  .patch(userController.edit)
  .delete(userController.destroy);
// TODO: fix /me route
router.route("/me").get(userController.userSelf);
router.route("/change-password").put(userController.changePassword);

module.exports = router;
