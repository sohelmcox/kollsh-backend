const router = require("express").Router();
const roleController = require("../api/v1/role/controllers");
const authenticate = require("../middleware/authenticate");

router
  .route("/")
  .get(authenticate, roleController.find)
  .post(authenticate, roleController.create);
router
  .route("/:roleId")
  .get(authenticate, roleController.findSingle)
  .put(authenticate, roleController.updateOrCreate)
  .delete(authenticate, roleController.destroy);

module.exports = router;
