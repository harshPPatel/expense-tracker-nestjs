- [x] Setup Database in project

  - [x] Create docker container for local setup (to avoid issues on installing Mongo on local computer)
  - [x] setup MongoDB setup with TypeORM
  - [x] User Service
  - [-] Use "BeforeInsert" method to hash the password
    https://tkssharma.com/nestjs-crud-using-typeorm-and-mysql/
    Although, should it be there?
    It is not a clean code as Entity should not worry about hashing the password

- [x] Auth Service

  - [x] JWT Setup with Passport
    - This option should be similar to the setup I had in old project
  - [x] Implement all auth routes

- [x] Expenses, Incomes and Statements Routes

  - [x] Expense
  - [x] Income
  - [x] Statement
  - [x] User

- [ ] Versioning

  - We will be using only one version but try out the versioning feature of nestjs

- [ ] Middlewares from old project

- [ ] Complete ALL TODO Comments

- [ ] testing

- [ ] Clean Code
  - [ ] wrap date-fns library
  - [ ] organize constants properly
  - [ ] notes for future reference?
