const request = require('supertest');

const createApp = require('../../src/app');
const { models } = require('../../src/db/sequelize');
const { upSeed, downSeed } = require('./utils/umzug');

// Grupo de tests para la app
describe('tests for /auth path', () => {
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

  describe('POST /login', () => {
    const LOGIN_PATH = '/api/v1/auth/login';

    test('Should return a 401', async () => {
      const inputData = { email: 'emailfake@fake.com', password: 'passfalsa' };
      const { statusCode } = await api.post(LOGIN_PATH).send(inputData);
      expect(statusCode).toEqual(401);
    });

    test('Should return a 200', async () => {
      const firstUser = await models.User.findByPk(1);
      const inputData = {
        email: firstUser.email, // El email lo saca de la base de datos
        password: 'admin123',
      };
      const { statusCode, body } = await api.post(LOGIN_PATH).send(inputData);
      const { token, user } = body;
      expect(statusCode).toEqual(200);
      expect(token).toBeTruthy;
      expect(user.email).toEqual(inputData.email);
      expect(user.role).toBeTruthy;
      expect(user.password).toBeFalsy; // El password no debe ser devuelto
    });
  });

  // Se ejecuta después de todos los tests
  afterAll(async () => {
    server.close();
    await downSeed();
  });
});
