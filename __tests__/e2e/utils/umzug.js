const path = require('path');
const { Umzug, SequelizeStorage } = require('umzug');

const sequelize = require('../../../src/db/sequelize');

const umzug = new Umzug({
  migrations: { glob: path.join(__dirname, '../../../src/db/seeders/*.js') },
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize }),
  logger: undefined,
});

/**
 * Crear semillas de datos de forma programática con umzug
 */
const upSeed = async () => {
  try {
    await sequelize.sync({ force: true });
    await umzug.up();
  } catch (error) {
    console.error(error);
  }
};

const downSeed = async () => {
  await sequelize.drop();
};

module.exports = {
  upSeed,
  downSeed,
};
