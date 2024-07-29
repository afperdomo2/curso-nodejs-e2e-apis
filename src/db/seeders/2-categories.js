const { CATEGORY_TABLE } = require('../models/category.model');

module.exports = {
  up: async (queryInterface) => {
    if (queryInterface.context) {
      queryInterface = queryInterface.context;
    }
    const IMAGE_URL = 'https://api.lorem.space/image/game?w=150&h=220';
    return queryInterface.bulkInsert(CATEGORY_TABLE, [
      { name: 'Tecnología', image: IMAGE_URL, created_at: new Date() },
      { name: 'Aseo', image: IMAGE_URL, created_at: new Date() },
      { name: 'Hogar', image: IMAGE_URL, created_at: new Date() },
    ]);
  },
  down: async (queryInterface) => {
    if (queryInterface.context) {
      queryInterface = queryInterface.context;
    }
    return await queryInterface.bulkDelete(CATEGORY_TABLE, null, {});
  },
};
