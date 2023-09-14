const router = require("express").Router();
const roleController = require("../api/v1/role/controllers");
const authenticate = require("../middleware/authenticate");

router
  .route("/")
  .get(authenticate, roleController.find)
  .post(authenticate, roleController.create)
  .delete(authenticate, roleController.destroyMany);
router
  .route("/:id")
  .get(authenticate, roleController.findSingle)
  .put(authenticate, roleController.updateOrCreate)
  .patch(authenticate, roleController.edit)
  .delete(authenticate, roleController.destroy);

module.exports = router;
