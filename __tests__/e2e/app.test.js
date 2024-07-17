const request = require('supertest');

const createApp = require('../../src/app');

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

  // Se ejecuta después de todos los tests
  afterAll(() => {
    server.close();
  });
});
