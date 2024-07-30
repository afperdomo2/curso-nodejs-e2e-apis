const request = require('supertest');

const createApp = require('../../src/app');
const { models } = require('../../src/db/sequelize');
const { upSeed, downSeed } = require('./utils/umzug');

describe('test for /categories path', () => {
  let app = null;
  let server = null;
  let api = null;

  beforeAll(async () => {
    app = createApp();
    server = app.listen(9021);
    api = request(app);
    await upSeed();
  });

  describe('POST /categories', () => {
    const USERS_PATH = '/api/v1/categories';

    test('Should return 401', async () => {
      const inputData = {
        name: 'Categoría nueva',
        image: 'https://api.lorem.space/image/game?w=150&h=220',
      };
      const { statusCode } = await api.post(USERS_PATH).send(inputData);
      expect(statusCode).toEqual(401);
    });
  });

  afterAll(async () => {
    await downSeed();
    server.close();
  });
});
