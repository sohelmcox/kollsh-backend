const router = require("express").Router();
const roleController = require("../api/v1/role/controllers");
const authenticate = require("../middleware/authenticate");
const { hasPermission } = require("../middleware/hasPermission");

router
  .route("/")
  .get(authenticate, hasPermission("role", ["read"]), roleController.find)
  .post(authenticate, hasPermission("role", ["write"]), roleController.create)
  .delete(
    authenticate,
    hasPermission("role", ["delete"]),
    roleController.destroyMany,
  );
router
  .route("/:id")
  .get(authenticate, hasPermission("role", ["read"]), roleController.findSingle)
  .put(
    authenticate,
    hasPermission("role", ["update"]),
    roleController.updateOrCreate,
  )
  .patch(authenticate, hasPermission("role", ["update"]), roleController.edit)
  .delete(
    authenticate,
    hasPermission("role", ["delete"]),
    roleController.destroy,
  );

module.exports = router;
