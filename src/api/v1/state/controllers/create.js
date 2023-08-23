const { State } = require(".././../../../models");

const create = async (req, res) => {
  try {
    const state = await State.create(req.body);
    res.status(201).json({ state });
  } catch (error) {
    res.status(500).json({ error });
  }
};

module.exports = create;
