const router = require("express").Router();
const permissionController = require("../api/v1/permission/controllers");
const authenticate = require("../middleware/authenticate");

router
  .route("/")
  .get(authenticate, permissionController.find)
  .post(authenticate, permissionController.create);
router
  .route("/:permissionId")
  .get(authenticate, permissionController.findSingle)
  .put(authenticate, permissionController.updateOrCreate)
  .delete(authenticate, permissionController.destroy);

module.exports = router;
