const { getProperty } = require("./getProperty");

// function getPropertys(obj, path) {
//   const properties = path.split(".");
//   let value = obj;

//   for (let i = 0; i < properties.length; i += 1) {
//     const property = properties[i];
//     value = value[property];

//     if (typeof value === "undefined") {
//       return undefined;
//     }
//   }

//   return value;
// }
function sorting(items, sortCriteria) {
  return items.sort((a, b) => {
    let result = 0;

    Object.keys(sortCriteria).forEach((key) => {
      const sortOrder = sortCriteria[key];
      const valueA = getProperty(a, key);
      const valueB = getProperty(b, key);

      if (valueA < valueB) {
        result = -sortOrder;
      } else if (valueA > valueB) {
        result = sortOrder;
      }
    });

    return result;
  });
}
module.exports = { sorting };
