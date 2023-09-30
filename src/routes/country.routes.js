const router = require("express").Router();
const countryController = require("../api/v1/country/controllers");
const authenticate = require("../middleware/authenticate");
const { hasPermission } = require("../middleware/hasPermission");

router
  .route("/")
  .get(countryController.find)
  .post(
    authenticate,
    hasPermission("country", ["write"]),
    countryController.create,
  )
  .delete(
    authenticate,
    hasPermission("country", ["delete"]),
    countryController.destroyMany,
  );
router
  .route("/:id")
  .get(countryController.findSingle)
  .put(
    authenticate,
    hasPermission("country", ["update"]),
    countryController.updateOrCreate,
  )
  .patch(
    authenticate,
    hasPermission("country", ["update"]),
    countryController.edit,
  )
  .delete(
    authenticate,
    hasPermission("country", ["delete"]),
    countryController.destroy,
  );

module.exports = router;
