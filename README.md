# Node.js Fastify Project

## Run Postgres and PgAdmin using docker

```bash
docker run -d \
  --name postgres_container \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=root \
  -p 5432:5432 \
  postgres
```

```bash
docker run -d \
  --name pgadmin_container \
  -e PGADMIN_DEFAULT_EMAIL=admin@example.com \
  -e PGADMIN_DEFAULT_PASSWORD=admin \
  -p 8080:80 \
  --link postgres_container:postgres \
  dpage/pgadmin4
```

Now PostgreSQL and pgAdmin containers should be running. You can access pgAdmin in your web browser by navigating to `http://localhost:8080`. Log in using the email and password you specified in the docker run command for pgAdmin.

To create a new PostgreSQL server in pgAdmin, follow these steps:

- In the left sidebar, under "Servers," right-click on "Servers" and select "Create" > "Server..."
- Fill in the following details:
  - **Name:** Give your server a name.
  - **Connection:** Fill in the following details:
    - **Host name/address:** `postgres` (this is the name of the PostgreSQL container)
    - **Port:** `5432`
    - **Username:** The username you specified when running the PostgreSQL container
    - **Password:** The password you specified when running the PostgreSQL container
- Click on the "Save" button.
