## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Systen architecture

### Architecture Diagram

### Components
The system follows micro-service architecture and has 3 main services

- Authentication service: authenticate and authorize user
- Quiz service: quiz and score management
- Leaderboard service: leaderboard management

### Data Flow

#### User authentication
* User submit a login request using username & password or SSO to Authentication service
* If user is valid then Authentication service will generate access token and response to user
* User client store the access token and use for future requests.

#### User join quiz by quizId
* User submits a request to join a quiz request with attached access token
* Authorizer authorises the request. If the request is valid then allow user to join the quiz using quizId
* Quiz service then issue an Quiz Session token, TTL is 15 mins (or depends on how long the quiz allow user to take the answer)
* Session information will be cached on Redis with this key format `QUIZ-SERICE:SESSION:{sessionID}` and session value will include `sessionId, userId, quizId, sessionEndAt`
* After TTL, Redis will clear the key automatically

#### User submit answer
* User can submit an answer to quiz service using Quiz Session token generate from previous step.
* Quiz service get Quiz Session token from request and get session from redis with GET command. (Complexity: O(1))
* If the session exists then allow user to submit the quiz

### Leader board update
* Leader board will be maintained in 2 places:
    * Redis memcache using sorted set data structure for fast and realtime access
    * Quiz service database for backing up 
* When user submits an answer for the quiz
    * User need to submit quiz Session token in the request
    * Quiz service will use quiz session token to validate if user is authorised to submit the answer to the quiz
    * If the token is valid, then calculate the score and update the score using ZADD command with key is quizId, value is userId
    * Quiz service will then produce a message to kafka topic is `score-update` and the consumer will consume the message and update the score to database
* Leader board service finally broadcast an event to all listener about the score updated and ask them to make a request to update the leaderboard


### Technology Justification
#### Authentication service
- Language: Nodejs
- Framework: NestJs
- Database: Mongodb
- ORM: Mongoose

### Quiz service
- Language: Nodejs
- Framework: NestJs
- Database: PostgreSQL
- ORM: TypeOrm

### Leaderboard service
- Language: Nodejs
- Framework: NestJs - Websocket
- Database: PostgreSQL

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
