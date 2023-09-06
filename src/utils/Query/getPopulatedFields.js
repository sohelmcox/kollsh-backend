const { populateAllFields } = require("./queryParser");

const getPopulatedFields = async (populatedFields, documents) => {
  try {
    if (populatedFields.includes("*")) {
      // Populate all available fields for each document
      return await Promise.all(
        documents.map((document) =>
          document.populate(populateAllFields(document.schema)),
        ),
      );
    }
    // Populate only the specified fields for each document
    return await Promise.all(
      documents.map((document) => document.populate(populatedFields.join(" "))),
    );
  } catch (error) {
    throw new Error(`Error populating fields: ${error.message}`);
  }
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
