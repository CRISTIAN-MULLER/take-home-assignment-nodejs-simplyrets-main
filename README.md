Contents
========

 * [Installation](#installation)
 * [Usage](#usage)
 * [Tests](#test)

### Installation
---

```bash
$ git clone https://github.com/CRISTIAN-MULLER/take-home-assignment-nodejs-simplyrets-main
$ cd take-home-assignment-nodejs-simplyrets-main
$ yarn install .
```

### Usage
---

To start the API , simply run `$ yarn run start`.
You can also run `$ yarn run dev`, this will initiate the API with ts-node-dev and watching for files change.

### Test
---

To perform tests, run `$ yarn run test`, this will use Jest to run the exisiting tests.

#### File Structure
---

```shell
src/
├── api
│   ├── implements
│   │   └── ExpressAdapter.ts ## Implements Express as Http server following HttpServer interface params.
│   ├── HttpServer.ts ## Interface that defines how the HttpServer should be implemented.
│   └── index.ts ## exports
│   └── Router.ts ## Initialize API Routes,receives controllers and a HttpServer instance as dependecies.
│
├── controllers
│   ├── index.ts ## default exports
│   ├── PropertyController.spec.ts ## Define tests to be performed at the Property controller level.
│   ├── PropertyController.ts ## Controller for property endpoint, receives a validation service and a property service as dependencies.
│
├── data
│   ├── seed.json ## contains initial data to seed the database
│
└── dtos
│   ├── CreatePropertyDTO.ts ## Define necessary fileds for property creation. 
│   ├── index.ts ## exports
│   ├── PaginationOptionsDTO.ts ## Define fields to use at pagination. 
│   ├── PropertiesFilterDTO.ts ## Define fields that can be used for filtering a property. 
│   ├── PropertiesResponseDTO.ts ## Define response body for a property. 
│   ├── UpdatePropertyDTO.ts ## Define fields that can be used for updating a property.
│
└── entities
│   ├── index.ts ## exports
│   ├── Property.ts ## Define property entity for the domain. 
│
├── repositories
│   ├── implements
│   │   └── InMemoryPropertiesRepository.ts ## Implements a InMemory Repository to be used at tests environemts, follows Repository Interface.
│   │   └── TypeORMPropertiesRepository.ts ## Implements a TyperORM Repository to be used at PROD environemts, follows Repository Interface.
│   └── index.ts ## exports
│   └── PropertiesRepository.ts ## Define how to implement a property repository, which methods and returns should be used.
│
├── routes
│   ├── __tests__
│   │   └── propertyRoutes.spec.ts ## Define tests to be performed at the Property routes level (e2e).
│   └── index.ts ## exports
│   └── propertyRoutes.ts ## Define routes to property endpoints,receives a property controller and a HttpServer instance as dependecies.
│
├── services
│   └── index.ts ## exports
│   └── PropertyService.spec.ts ## Define tests to be performed at the Property services level (Unit).
│   └── PropertyService.ts ## Services for property endpoint, perform database actions through a repository, receives a repository as dependency.
│
├── utils
│   └── index.ts ## exports
│   └── Validation.ts ## Services used for validate user input utilizing class-validator decorators.
│   app.ts ## Orchestrate the API, initialize the database, http server, controller, services and repository.
│   dataSource.ts ## Holds TyperORM configd to initilize a database connection, also exports a seed function to add seed data to the database.
│   index.ts ## Entry point for the API, calls the App class and initialize the services, routes, and database.
```
