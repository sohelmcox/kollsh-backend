const mongoose = require("mongoose");
// modals
module.exports.Attribute = mongoose.models.Attribute || require("./Attribute");
module.exports.AttributeValue =
  mongoose.models.AttributeValue || require("./AttributeValue");
module.exports.Category = mongoose.models.Category || require("./Category");
module.exports.City = mongoose.models.City || require("./City");
module.exports.Country = mongoose.models.Country || require("./Country");
module.exports.Image = mongoose.models.Image || require("./Image");
module.exports.Item = mongoose.models.Item || require("./Item");
module.exports.ItemDetails =
  mongoose.models.ItemDetails || require("./ItemDetails");
module.exports.MetaData = mongoose.models.MetaData || require("./MetaData");
module.exports.Notification =
  mongoose.models.Notification || require("./Notification");
module.exports.Replay = mongoose.models.Replay || require("./Replay");
module.exports.State = mongoose.models.State || require("./State");
module.exports.Subcategory =
  mongoose.models.Subcategory || require("./Subcategory");
module.exports.User = mongoose.models.User || require("./User");
module.exports.UserProfile =
  mongoose.models.UserProfile || require("./UserProfile");
module.exports.Brand = mongoose.models.Brand || require("./Brand");
