# Test Backend Developer

## Requirement
- Install yarn
- Database MySQL

## Installation

Install project with yarn

```bash
  cd $PROJECT_DIR
  yarn install
```

## Setup ENV

Copy file .env.example and rename it to .env

## Setup DB


- Run migration to setup tables (directory: database/migrations)

```bash
  yarn knex:migrate:latest
```

- Run migration to setup data (directory: database/seeds)

```bash
  yarn knex:seed:run
```

## Run project
- Run for development/local

```bash
  yarn dev
```

- Run for deployment

```bash
  yarn build && yarn start
```

## Boilerplate
- This project is using modular design pattern, to create new module files and folder automatically, run command bellow

```bash
  node boilerplate.js make:module {{MODULE_NAME}}
```

- example:

```bash
  node boilerplate.js make:module user-profile
```

## Swagger

  After project is running, open [http://localhost:8000/swagger](http://localhost:8000/swagger) from browser
    
