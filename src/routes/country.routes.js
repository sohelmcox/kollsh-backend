const router = require("express").Router();
const countryController = require("../api/v1/country/controllers");
const authenticate = require("../middleware/authenticate");

router
  .route("/")
  .get(countryController.find)
  .post(countryController.create)
  .delete(countryController.destroyMany);
router
  .route("/:id")
  .get(countryController.findSingle)
  .put(countryController.updateOrCreate)
  .patch(countryController.edit)
  .delete(countryController.destroy);

module.exports = router;
