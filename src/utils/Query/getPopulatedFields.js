const { populateAllFields } = require("./queryParser");

const getPopulatedFields = async (populatedFields, Model) => {
  let items = [];
  if (populatedFields.includes("*")) {
    items = await Model.find().populate(populateAllFields(Model.schema)).exec();
  } else {
    items = await Model.find().populate(populatedFields.join(" ")).exec();
  }
  return items;
};
const getSinglePopulatedFields = async (document, populatedFields) => {
  try {
    if (populatedFields.includes("*")) {
      // Populate all available fields
      return await document.populate(populateAllFields(document.schema));
    }
    // Populate only the specified fields
    const item = await document.populate(populatedFields.join(" "));
    return item;
  } catch (error) {
    throw new Error(`Error populating fields: ${error.message}`);
  }
};

module.exports = { getPopulatedFields, getSinglePopulatedFields };
