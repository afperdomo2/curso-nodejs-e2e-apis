const request = require('supertest');

const createApp = require('../../src/app');
const { models } = require('../../src/db/sequelize');
const { upSeed, downSeed } = require('./utils/umzug');

// Grupo de tests para la app
describe('tests for /users path', () => {
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

    test('Should return a new user', async () => {
      const ROL_DEFAULT = 'admin';
      const inputData = {
        email: 'pepitoPerez@gmail.com',
        password: 'pruebas123',
      };
      const { statusCode, body } = await api.post(USERS_PATH).send(inputData);
      expect(statusCode).toEqual(201);
      // Validar con la base de datos
      const user = await models.User.findByPk(body.id);
      expect(user).toBeTruthy(); // Existe el usuario
      expect(user.role).toEqual(ROL_DEFAULT);
      expect(user.email).toEqual(inputData.email);
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
  afterAll(async () => {
    server.close();
    await downSeed();
  });
});
