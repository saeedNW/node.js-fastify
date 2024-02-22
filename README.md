# Node.js Fastify Project

This Node.js learning project focuses on exploring the Fastify framework and its capabilities and learning how to use it for basic tasks like user login, managing profiles, and organizing categories.

## Table of Content

- [Node.js Fastify Project](#nodejs-fastify-project)
  - [Table of Content](#table-of-content)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Run Postgres and PgAdmin using docker](#run-postgres-and-pgadmin-using-docker)
    - [Run PostgreSQL service](#run-postgresql-service)
    - [Run PgAdmin service](#run-pgadmin-service)
      - [Create a New PostgreSQL Server](#create-a-new-postgresql-server)
  - [Starting Application](#starting-application)
    - [Restful API Swagger Doc URL](#restful-api-swagger-doc-url)
  - [Contributors](#contributors)

## Prerequisites

Before running the project, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (latest version)
- [Docker](https://www.docker.com) (latest version)

## Installation

1. Clone the repository:

   ```shell
   git clone https://github.com/saeedNW/node.js-fastify.git
   ```

2. Navigate to the project directory:

   ```shell
   cd node.js-fastify
   ```

3. Install dependencies:

   ```shell
   npm install
   ```

## Run Postgres and PgAdmin using docker

To begin using this project, the first step is to install and run a **PostgreSQL** database. If you don't already have PostgreSQL installed, you can follow these instructions to set it up using Docker containers.

### Run PostgreSQL service

Using this command you can pull and run PostgreSQL database.

```bash
docker run -d \
  --name postgres_container \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=root \
  -p 5432:5432 \
  postgres
```

This command initiates a PostgreSQL container with username and password authentication (postgres/root).

### Run PgAdmin service

PgAdmin is the most popular and feature rich Open Source administration and development platform for PostgreSQL. Using this command you can pull and run PgAdmin.

```bash
docker run -d \
  --name pgadmin_container \
  -e PGADMIN_DEFAULT_EMAIL=admin@example.com \
  -e PGADMIN_DEFAULT_PASSWORD=admin \
  -p 8080:80 \
  --link postgres_container:postgres \
  dpage/pgadmin4
```

This command starts a pgAdmin container with management UI available at <http://localhost:8080>. Log in using the email and password you specified in the docker run command for pgAdmin (<admin@example.com>/admin).

#### Create a New PostgreSQL Server

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

## Starting Application

To run the application you can use this command:

```shell
npm run dev
```

### Restful API Swagger Doc URL

Project's swagger ui interface is available at <http://localhost:3000/api-doc>

## Contributors

We would like to thank the following individuals who have contributed to the development of this application:

![avatar](https://images.weserv.nl/?url=https://github.com/erfanyousefi.png?h=150&w=150&fit=cover&mask=circle&maxage=5d)
‎ ‎ ‎ ![avatar](https://images.weserv.nl/?url=https://github.com/saeedNW.png?h=150&w=150&fit=cover&mask=circle&maxage=5d)

[**Erfan Yousefi - Supervisor and instructor of the node.js programming course**](https://github.com/erfanyousefi/)

[**Saeed Norouzi - Back-end Developer**](https://github.com/saeedNW)
