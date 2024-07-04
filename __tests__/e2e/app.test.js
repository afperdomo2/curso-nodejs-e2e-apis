const request = require('supertest');
const express = require('express');

// Grupo de tests para la app
describe('tests for app', () => {
  let app = null;
  let server = null;
  let api = null;

  // Antes de cada test
  beforeEach(() => {
    // Crea una instancia de express
    app = express();
    // Crea una ruta que responde con un JSON
    app.get('/hello', (req, res) => {
      res.status(200).json({ name: 'mono' });
    });
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

  afterEach(() => {
    server.close();
  });
});
