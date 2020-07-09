const NodeCache = require('node-cache');

const statsDB = new NodeCache();

const update = (userId, data) => {
  statsDB.set(userId, { ...statsDB.get(userId), ...data });
};

module.exports = {
  update,
  get: statsDB.get,
};
