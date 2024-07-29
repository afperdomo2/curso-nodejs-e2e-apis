const { PRODUCT_TABLE } = require('../models/product.model');

module.exports = {
  up: async (queryInterface) => {
    if (queryInterface.context) {
      queryInterface = queryInterface.context;
    }
    const IMAGE_URL = 'https://api.lorem.space/image/game?w=150&h=220';
    return queryInterface.bulkInsert(PRODUCT_TABLE, [
      {
        name: 'Iphone 13',
        image: IMAGE_URL,
        description: 'Celular de última generación',
        price: 100,
        created_at: new Date(),
        category_id: 1,
      },
      {
        name: 'Detergente',
        image: IMAGE_URL,
        description: 'Producto para lavar ropa',
        price: 200,
        created_at: new Date(),
        category_id: 2,
      },
      {
        name: 'Alfombra',
        image: IMAGE_URL,
        description: 'Alfombra para el hogar',
        price: 300,
        created_at: new Date(),
        category_id: 1,
      },
    ]);
  },
  down: async (queryInterface) => {
    if (queryInterface.context) {
      queryInterface = queryInterface.context;
    }
    return await queryInterface.bulkDelete(PRODUCT_TABLE, null, {});
  },
};
