const router = require("express").Router();
const userController = require("../api/v1/user/controllers");
const authenticate = require("../middleware/authenticate");
const { hasPermission } = require("../middleware/hasPermission");

router
  .route("/me")
  .get(authenticate, hasPermission("user", ["read"]), userController.userSelf);
router
  .route("/change-password")
  .post(
    authenticate,
    hasPermission("user", ["write"]),
    userController.changePassword,
  );
router
  .route("/")
  .get(authenticate, hasPermission("user", ["read"]), userController.find)
  .post(authenticate, hasPermission("user", ["write"]), userController.create)
  .delete(
    authenticate,
    hasPermission("user", ["delete"]),
    userController.destroyMany,
  );
router
  .route("/:id")
  .get(authenticate, hasPermission("user", ["read"]), userController.findSingle)
  .patch(authenticate, hasPermission("user", ["update"]), userController.edit)
  .delete(
    authenticate,
    hasPermission("user", ["delete"]),
    userController.destroy,
  );

module.exports = router;
