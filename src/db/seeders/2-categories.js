const { CATEGORY_TABLE } = require('../models/category.model');

module.exports = {
  up: async (queryInterface) => {
    const IMAGE_URL = 'https://api.lorem.space/image/game?w=150&h=220';
    return queryInterface.bulkInsert(CATEGORY_TABLE, [
      { name: 'Tecnología', image: IMAGE_URL, created_at: new Date() },
      { name: 'Aseo', image: IMAGE_URL, created_at: new Date() },
      { name: 'Hogar', image: IMAGE_URL, created_at: new Date() },
    ]);
  },
  down: (queryInterface) => {
    return queryInterface.bulkDelete(CATEGORY_TABLE, null, {});
  },
};
