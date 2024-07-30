const request = require('supertest');

const createApp = require('../../src/app');
const { models } = require('../../src/db/sequelize');
const { upSeed, downSeed } = require('./utils/umzug');

describe('test for /categories path', () => {
  const USERS_PATH = '/api/v1/categories';
  const IMAGE_URL = 'https://api.lorem.space/image/game?w=150&h=220';

  let app = null;
  let server = null;
  let api = null;

  let accessToken = null;

  beforeAll(async () => {
    app = createApp();
    server = app.listen(9021);
    api = request(app);
    await upSeed();
  });

  // 1. Grupos de tests sin autenticación
  describe('POST /categories without auth', () => {
    test('Should return 401', async () => {
      const inputData = { name: 'Categoría nueva', image: IMAGE_URL };
      const { statusCode } = await api.post(USERS_PATH).send(inputData);
      expect(statusCode).toEqual(401);
    });
  });

  // 2. Grupos de tests con autenticación de usuario admin
  describe('POST /categories with admin user', () => {
    beforeAll(async () => {
      const firstUser = await models.User.findOne();
      const inputData = { email: firstUser.email, password: 'admin123' };
      const { body } = await api.post('/api/v1/auth/login').send(inputData);
      accessToken = body.access_token;
    });

    test('Should return a new category', async () => {
      const inputData = { name: 'Categoría nueva', image: IMAGE_URL };
      const auth = { Authorization: `Bearer ${accessToken}` };
      const { statusCode, body } = await api
        .post(USERS_PATH)
        .send(inputData)
        .set(auth);
      expect(statusCode).toEqual(201);
      // Validar con la base de datos
      const category = await models.Category.findByPk(body.id);
      expect(category.name).toEqual(inputData.name);
      expect(category.image).toEqual(inputData.image);
    });

    afterAll(() => {
      accessToken = null;
    });
  });

  afterAll(async () => {
    await downSeed();
    server.close();
  });
});
