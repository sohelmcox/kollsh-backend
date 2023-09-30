const router = require("express").Router();
const cityController = require("../api/v1/city/controllers");
const authenticate = require("../middleware/authenticate");
const { hasPermission } = require("../middleware/hasPermission");

router
  .route("/")
  .get(cityController.find)
  .post(authenticate, hasPermission("city", ["write"]), cityController.create)
  .delete(
    authenticate,
    hasPermission("city", ["delete"]),
    cityController.destroyMany,
  );
router
  .route("/:id")
  .get(cityController.findSingle)
  .put(
    authenticate,
    hasPermission("city", ["update"]),
    cityController.updateOrCreate,
  )
  .patch(authenticate, hasPermission("city", ["update"]), cityController.edit)
  .delete(
    authenticate,
    hasPermission("city", ["delete"]),
    cityController.destroy,
  );

module.exports = router;
