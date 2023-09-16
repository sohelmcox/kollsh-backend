const router = require("express").Router();
const brandController = require("../api/v1/brand/controllers");
const authenticate = require("../middleware/authenticate");

router
  .route("/")
  .get(brandController.find)
  .post(authenticate, brandController.create)
  .delete(authenticate, brandController.destroyMany);
router
  .route("/:id")
  .get(brandController.findSingle)
  .put(authenticate, brandController.updateOrCreate)
  .patch(authenticate, brandController.edit)
  .delete(authenticate, brandController.destroy);

module.exports = router;
