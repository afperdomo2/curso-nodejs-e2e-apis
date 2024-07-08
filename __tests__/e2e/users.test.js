const request = require('supertest');

const createApp = require('../../src/app');

// Grupo de tests para la app
describe('tests for /users path', () => {
  let app = null;
  let server = null;
  let api = null;

  beforeEach(() => {
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

  describe('GET /users/:id', () => {
    // tests
  });

  afterEach(() => {
    server.close();
  });
});
