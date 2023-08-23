const { State: Item } = require(".././../../../models");

const getItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    res.status(200).json({ item });
  } catch (error) {
    res.status(500).json({ error });
  }
};
module.exports = getItem;
