const router = require("express").Router();
const permissionController = require("../api/v1/permission/controllers");
const authenticate = require("../middleware/authenticate");

router
  .route("/")
  .get(authenticate, permissionController.find)
  .post(authenticate, permissionController.create)
  .delete(authenticate, permissionController.destroyMany);
router
  .route("/:id")
  .get(authenticate, permissionController.findSingle)
  .put(authenticate, permissionController.updateOrCreate)
  .patch(authenticate, permissionController.edit)
  .delete(authenticate, permissionController.destroy);

module.exports = router;
