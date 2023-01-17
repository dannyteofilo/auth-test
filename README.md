# NodeJs - finsphera service

> Service owned by [Daniel Teofilo Maritnez](https://github.com/)
>
> User administration service

## Structure

This is the directory structure of the application.

```txt
  ├── .husky     -> Hooks of husky
  ├── .__tests__ -> Tests of the application
  ├── build      -> Build of the application
  ├── config     -> Variables of environment
  ├── coverage   -> Coverage of the unit tests
  ├── src        -> Source code
  │   ├── index.js -> Entry point of the application
  │   ├── controllers   -> Controllers of the application
  │   ├── database      -> Configuration of connection to the database
  │   ├── middlewares   -> Middlewares of the application
  │   ├── models        -> Models of the application
  │   ├── routes        -> Routes of the application
  │   ├── helpers       -> Helpers of the application
  │   ├── utils         -> Utils of the application
```

## Prerequisites

- Install Node.js from [here](http://nodejs.org) >= 18.12.1
- Install PNPM from [here](https://pnpm.io/es/installation) **(Optional)** can you use npm or yarn
- Install Git from [here](https://git-scm.com/downloads)
- Have shell or command line (If you use Mac and Linux, you have a terminal pre-installed, if you are using windows you can use [git bash](https://git-scm.com/downloads))

## Development

1. Clone the repo:
   - `git clone https://github.com/`
2. Install dependencies:
   - `pnpm install`
3. [Follow the configuration steps of the .env file](#configuration-environment-variables)
4. Execute the command to activate the husky hooks:
   - `pnpm prepare`
5. Run the app
   - `pnpm dev`

## Production

1. Clone the repo:
   - `git clone https://github.com/`
2. Install dependencies:
   - `npm install`
3. Run the app
   - `npm start`

## Auth endpoints

| Endpoint        | HTTP | Description           |
| --------------- | ---- | --------------------- |
| `*/api/v1/auth` | POST | Authenticate the user |

## Users endpoints

| Endpoint                 | HTTP   | Description       |
| ------------------------ | ------ | ----------------- |
| `*/api/v1/users`         | POST   | Create a new user |
| `*/api/v1/users/:userId` | PUT    | Update user       |
| `*/api/v1/users`         | GET    | Get all users     |
| `*/api/v1/users/:userId` | GET    | Get user by id    |
| `*/api/v1/users/:userId` | DELETE | Delete user by id |

## Configuration environment variables

The example structure is given in the [.env.example](.env.example) file

- Update `<PORT>` Port through which the server will run.
- Update `<ENV>` Environment in which the server will run.
- Update `<LEVEL>` Level of logs to show in Logger
- Update `<SERVICE_NAME>` Name of the service to show in Logger
- Update `<URL_MONGO_PROD>` Url of the database in production
- Update `<URL_MONGO_DEV>` Url of the database in development
- Update `<JWT_SECRET>` Secret to generate the token with jsonwebtoken

## Configured packages

- [Babel](https://babeljs.io/)
- [jsonwebtoken](https://jwt.io/)
- [bcrypt](https://www.npmjs.com/package/bcrypt)
- [mongoose](https://mongoosejs.com/)
- [Jest](https://jestjs.io/)
- [Supertest](https://www.npmjs.com/package/supertest)
- [Husky](https://typicode.github.io/husky/#/)
- [Lint Staged](https://github.com/okonet/lint-staged)
- [Winston](https://www.npmjs.com/package/winston)
- [Cors](https://www.npmjs.com/package/cors)
- [Morgan](https://www.npmjs.com/package/morgan)
- [Standard](https://standardjs.com/)
- [Prettier](https://prettier.io/)
- [Dotenv](https://www.npmjs.com/package/dotenv)

## Extra commands

Run the unit tests

```bash
# Run the unit tests with coverage
pnpm test

# Run the unit tests watch mode
pnpm test:watch
```

Run the eslint

```bash
pnpm lint
```

> **Note:** if you have any questions you can ask me at

## [License MIT](LICENSE)
