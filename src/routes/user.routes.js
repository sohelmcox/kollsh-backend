const router = require("express").Router();
const userController = require("../api/v1/user/controllers");
const authenticate = require("../middleware/authenticate");

router
  .route("/")
  .get(authenticate, userController.find)
  .post(authenticate, userController.create)
  .delete(authenticate, userController.destroyMany);
router
  .route("/:id")
  .get(authenticate, userController.findSingle)
  .patch(authenticate, userController.edit)
  .delete(authenticate, userController.destroy);
// TODO: fix /me route
router.route("/me").get(authenticate, userController.userSelf);
router
  .route("/change-password")
  .put(authenticate, userController.changePassword);

module.exports = router;
