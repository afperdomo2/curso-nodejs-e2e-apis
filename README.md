# 💻Project Setup

```sh
npm install
```

# Migrations

```sh
npm run migrations:run
```

# Run in dev mode

```sh
npm run dev
```

# Run in prod mode

```sh
npm run start
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
