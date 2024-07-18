const request = require('supertest');

const createApp = require('../../src/app');
const { config } = require('../../src/config/config');

// Grupo de tests para la app
describe('tests for app', () => {
  let app = null;
  let server = null;
  let api = null;

  // Se ejecuta antes de todos los tests
  beforeAll(() => {
    // Crea una instancia de express
    app = createApp();
    // Inicia el servidor en el puerto 9020
    server = app.listen(9020);
    // Crea una instancia de supertest pasando la app de express
    api = request(app);
  });

  // Realiza una petición GET a la ruta /hello
  test('GET /hello', async () => {
    const response = await api.get('/hello');

    // Verifica que la respuesta sea verdadera
    expect(response).toBeTruthy();

    // Verifica que el status code sea 200
    expect(response.statusCode).toEqual(200);

    // Verifica que el body sea igual a { name: 'mono' }
    expect(response.body.name).toEqual('mono');

    // Verifica que el header content-type sea igual a 'application/json; charset=utf-8'
    expect(response.headers['content-type']).toEqual(
      'application/json; charset=utf-8'
    );
  });

  describe('GET /nueva-ruta', () => {
    test('Should return a 401', async () => {
      const { statusCode } = await api.get('/nueva-ruta');
      expect(statusCode).toEqual(401);
    });
    test('Should return a 401 with invalid API KEY', async () => {
      const { statusCode } = await api.get('/nueva-ruta').set('api', 'AAA111');
      expect(statusCode).toEqual(401);
    });
    test('Should return a 200', async () => {
      const { statusCode } = await api
        .get('/nueva-ruta')
        .set('api', config.apiKey);
      expect(statusCode).toEqual(200);
    });
  });

  // Se ejecuta después de todos los tests
  afterAll(() => {
    server.close();
  });
});
