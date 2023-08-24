const { getProperty } = require("./getProperty");

// Helper function to select fields
function selectFields(items, selectedFields) {
  return items.map((item) => {
    const selectedItem = {};
    selectedFields.forEach((field) => {
      selectedItem[field] = getProperty(item, field);
    });
    return selectedItem;
  });
}
module.exports = { selectFields };
