const router = require("express").Router();
const brandController = require("../api/v1/brand/controllers");
const authenticate = require("../middleware/authenticate");
const { hasPermission } = require("../middleware/hasPermission");

router
  .route("/")
  .get(brandController.find)
  .post(authenticate, hasPermission("brand", ["write"]), brandController.create)
  .delete(
    authenticate,
    hasPermission("brand", ["delete"]),
    brandController.destroyMany,
  );
router
  .route("/:id")
  .get(brandController.findSingle)
  .put(
    authenticate,
    hasPermission("brand", ["update"]),
    brandController.updateOrCreate,
  )
  .patch(authenticate, hasPermission("brand", ["update"]), brandController.edit)
  .delete(
    authenticate,
    hasPermission("brand", ["delete"]),
    brandController.destroy,
  );

module.exports = router;
