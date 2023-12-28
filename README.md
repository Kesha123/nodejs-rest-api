# Project

**Author**: Innokentii Kozlov
**Date**: 11.12.2023

## Requirements

 - [ ] `NodeJS` >= 19
 - [ ] `Docker`
 - [ ] `Sqlite3`

## Setup
 - [ ] Clone repository
    ```
    git clone git@github.com:Kesha123/nodejs-rest-api.git

    cd nodejs-rest-api
    ```

 - [ ] Install production packages
    ```
    npm install --production
    ```

## Database Setup

- [ ] Create Database and create table statements
```
sqlite3 database.db < sql/create.sql
```

- [ ] Insert statements for tables
```
sqlite3 database.db < sql/insert.sql
```

- [ ] Delete statements to empty data in all tables
```
sqlite3 database.db < sql/delete.sql
```

## Run

 - [ ] Run production
    ```
    npm run start
    ```

 - [ ] Verify availability
    ```
    curl --location 'http://localhost:8080/api/health_'
    ```

## Example Enpoint Calls
 - [x] Fetch All Users
   ```
   curl --location 'http://localhost:8080/api/users'
   ```

 - [x] Fetch Users By Criteria
   ```
   curl --location 'http://localhost:8080/api/users?ename=SMITH%2CJOHN&deptno=10%2C20'
   ```

 - [x] Fetch User By Id
   ```
   curl --location 'http://localhost:8080/api/user/7369'
   ```

 - [x] Delete User
   ```
   curl --location --request DELETE 'http://localhost:8080/api/user/7369'
   ```

 - [x] Create User
   ```
   curl --location 'http://localhost:8080/api/user' \
   --header 'Content-Type: application/json' \
   --data '{
      "empno": 7369,
      "ename": "SMITH",
      "job": "CLERK",
      "mgr": 7902,
      "hiredate": "1980-12-17",
      "sal": 800,
      "comm": null,
      "deptno": 20
   }'
   ```

 - [x] Update (PUT) User
   ```
   curl --location --request PUT 'http://localhost:8080/api/user/7369' \
   --header 'Content-Type: application/json' \
   --data '{
      "empno": 7369,
      "ename": "JOHN",
      "job": "CLERK",
      "mgr": 7902,
      "hiredate": "1980-12-17",
      "sal": 800,
      "comm": null,
      "deptno": 20
   }'
   ```

 - [x] Update (PATCH) User
   ```
   curl --location --request PATCH 'http://localhost:8080/api/user/7369' \
   --header 'Content-Type: application/json' \
   --data '{
      "ename": "SMITH"
   }'
   ```
