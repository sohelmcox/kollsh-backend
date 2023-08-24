function getProperty(obj, path) {
  const properties = path.split(".");
  return properties.reduce((value, property) => value && value[property], obj);
}
module.exports = { getProperty };
