const bcrypt = require('bcrypt');

const sequelize = require('../../../src/db/sequelize');
const { models } = sequelize;

const upSeed = async () => {
  try {
    await sequelize.sync({ force: true });
    const password = 'admin123';
    const hashedPassword = await bcrypt.hash(password, 10);
    await models.User.create({
      email: 'admin@gmail.com ',
      password: hashedPassword,
      role: 'admin',
    });

    const IMAGE_URL = 'https://api.lorem.space/image/game?w=150&h=220';
    await models.Category.bulkCreate([
      { name: 'Tecnología', image: IMAGE_URL },
      { name: 'Aseo', image: IMAGE_URL },
      { name: 'Hogar', image: IMAGE_URL },
    ]);
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
