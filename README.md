# 💻Project Setup

```sh
# Instalar dependencias
npm install

# Migrations
npm run migrations:run

# Run in dev mode
npm run dev

# Run in prod mode
npm run start

# Run test E2E
npm run e2e

# Ejecutar pruebas y generar el reporte de cobertura
npm run e2e:coverage
```

# Connect to DB from Docker

```sh
docker-compose exec postgres bash
psql -h localhost -d my_store -U nico
\d+
SELECT * FROM users;
DELETE FROM users WHERE id=<id>;
```

## 🐳 Docker Compose

```sh
# Ejecutar todos los contenedores
docker-compose up -d

# Ejecutarlos de forma individual
docker-compose up -d postgres
docker-compose up -d pgadmin
```
