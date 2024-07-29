const bcrypt = require('bcrypt');

const { USER_TABLE } = require('../models/user.model');

module.exports = {
  up: async (queryInterface) => {
    const DEFAULT_ROLE = 'admin';
    const password = 'admin123';
    const hashedPassword = await bcrypt.hash(password, 10);
    return queryInterface.bulkInsert(USER_TABLE, [
      {
        email: 'admin@gmail.com',
        password: hashedPassword,
        role: DEFAULT_ROLE,
        created_at: new Date(),
      },
    ]);
  },
  down: (queryInterface) => {
    return queryInterface.bulkDelete(USER_TABLE, null, {});
  },
};
