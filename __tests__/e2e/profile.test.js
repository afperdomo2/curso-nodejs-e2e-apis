const request = require('supertest');

const createApp = require('../../src/app');
const { models } = require('../../src/db/sequelize');
const { upSeed, downSeed } = require('./utils/umzug');

// Grupo de tests para la app
describe('tests for /profile path', () => {
  let app = null;
  let server = null;
  let api = null;

  // Se ejecuta antes de todos los tests
  beforeAll(async () => {
    app = createApp();
    server = app.listen(9021);
    api = request(app);
    await upSeed();
  });

  describe('GET /profile/my-user', () => {
    const MY_USER_PATH = '/api/v1/profile/my-user';
    let accessToken = null;
    let userData = null;

    beforeAll(async () => {
      const firstUser = await models.User.findOne();
      const inputData = { email: firstUser.email, password: 'admin123' };
      const { body } = await api.post('/api/v1/auth/login').send(inputData);
      accessToken = body.access_token;
      userData = body.user;
    });

    test('Should return a user', async () => {
      const auth = { Authorization: `Bearer ${accessToken}` };
      const { statusCode, body } = await api.get(MY_USER_PATH).set(auth);
      expect(statusCode).toEqual(200);
      expect(body.email).toEqual(userData.email);
    });

    afterAll(() => {
      accessToken = null;
      userData = null;
    });
  });

  // Se ejecuta después de todos los tests
  afterAll(async () => {
    server.close();
    await downSeed();
  });
});
