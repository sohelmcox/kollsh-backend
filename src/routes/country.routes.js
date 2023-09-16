const router = require("express").Router();
const countryController = require("../api/v1/country/controllers");
const authenticate = require("../middleware/authenticate");

router
  .route("/")
  .get(countryController.find)
  .post(authenticate, countryController.create)
  .delete(authenticate, countryController.destroyMany);
router
  .route("/:id")
  .get(countryController.findSingle)
  .put(authenticate, countryController.updateOrCreate)
  .patch(authenticate, countryController.edit)
  .delete(authenticate, countryController.destroy);

module.exports = router;
