const request = require('supertest');

const createApp = require('../../src/app');
const { models } = require('../../src/db/sequelize');

// Grupo de tests para la app
describe('tests for /users path', () => {
  let app = null;
  let server = null;
  let api = null;

  // Se ejecuta antes de todos los tests
  beforeAll(() => {
    app = createApp();
    server = app.listen(9021);
    api = request(app);
  });

  describe('GET /users', () => {
    // tests
  });

  describe('POST /users', () => {
    const USERS_PATH = '/api/v1/users';

    test('Should return a 400 bad request with password invalid', async () => {
      // Arrage
      const inputData = { email: 'mono@gmail.com', password: '---' };
      // Act
      const { statusCode } = await api.post(USERS_PATH).send(inputData);
      // Assert
      expect(statusCode).toEqual(400);
    });

    test('Should return a 400 bad request with email invalid', async () => {
      const inputData = { email: '----', password: 'admin123' };
      const { statusCode, body } = await api.post(USERS_PATH).send(inputData);
      expect(statusCode).toEqual(400);
      expect(body.message).toMatch('must be a valid email');
    });
  });

  describe('GET /users/{id}', () => {
    const USERS_PATH = '/api/v1/users';

    test('Should return a user', async () => {
      const userId = 1;
      const user = await models.User.findByPk(userId);
      const { statusCode, body } = await api.get(`${USERS_PATH}/${user.id}`);
      expect(statusCode).toEqual(200);
      expect(body.id).toEqual(user.id);
      expect(body.email).toEqual(user.email);
    });
  });

  // Se ejecuta después de todos los tests
  afterAll(() => {
    server.close();
  });
});
