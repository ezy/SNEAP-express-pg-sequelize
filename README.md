# Postnado - Part 2!!

*The sequel(ize) to '(Postgres)sive' - coming to a repo near you this summer*

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

This is the sort of folder structure that makes your dev team go daaaaaammmmmmmmnnnn son! It's a super simple Node JS API demo built with Express, for PostgreSQL using Sequelize ORM. Has a folder structure that follows sequelize-cli conventions with a pod structure for routes and controllers.

**Stack**

* [Node.js](https://nodejs.org/en/)
* [PostgreSQL](https://www.postgresql.org/)
* [Sequelize](http://docs.sequelizejs.com/en/v3/)
* [Sequelize-CLI](https://github.com/sequelize/cli)
* [JSON Web Token](https://jwt.io/)

**Testing**

* [Mocha](https://mochajs.org/)
* [Chai](http://chaijs.com/)
* [Supertest](https://github.com/visionmedia/supertest)


### Features

- [x] Authentication with JSON Web Token
- [x] Email, Password validations
- [x] User login and registration
- [x] Full API and Unit test coverage
- [x] Simple demo endpoint template
- [x] Logging with winston

### Folder structure

* **api** - contains all endpoint folders and router file
  * **pod folder** - contains route and controller for pod
  * **router.js** - contains all router endpoints for the api 
* **config** - all config settings and middlewares
* **migrations** - sequelize
* **models** - sequelize
* **seeders** - sequelize
* **services** - folder for all utils and services
* **tests** - folder for all test files

### To run locally

Make sure to install and run PostgreSQL first. There are a list of package.json
scripts that include core sequelize migrations and seeds.

```
brew update
brew install postgres
```
Then you'll need to adjust the config file `config/db.js` to suit your setup.

Then run `npm run reset` and your db will create from scratch and seed data under
the db name `vanilla_dev`.

Running `npm run dev` will start your dev server where needed.

### Testing

You'll need to setup the test server using `npm run resettest`. To trigger the mocha/chai tests enter:
```
npm run test
```

#### Postman

There is a postman collection file for API testing and development in
`./node-starter.postman_collection.json`. It contains scripts and
basic CRUD for:

* /auth
  * [POST] Register (/register)
  * [POST] Login (/login)

* /demos
  * [POST] Single demo (/ - with auth)
  * [PATCH] Single demo (/:id - with auth)
  * [DEL] Single demo (/:id - with auth)
  * [GET] All demos (/)
  * [GET] Single demo (/:id)

#### Sequelize ORM

Node Starter uses Sequelise ORM to interact with Postgres. Install globally
on your dev machine using `npm run global sequelize-cli` then run commands with
`sequelize` or alternately run commands locally in your dev folder with the
built in dev package `./node_modules/.bin/sequelize init`.
