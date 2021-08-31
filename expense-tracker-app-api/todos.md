- [ ] Setup Database in project

  - [ ] Create docker container for local setup (to avoid issues on installing Mongo on local computer)
  - [ ] setup MongoDB setup with TypeORM
  - [ ] User Service
  - [ ] Use "BeforeInsert" method to hash the password
        https://tkssharma.com/nestjs-crud-using-typeorm-and-mysql/
        Although, should it be there?
        It is not a clean code as Entity should not worry about hashing the password

- [ ] Auth Service

  - [ ] JWT Setup with Passport
    - This option should be similar to the setup I had in old project
  - [ ] Implement all auth routes

- [ ] Expenses, Incomes and Statements Routes

- [ ] Versioning
  - We will be using only one version but try out the versioning feature of nestjs
