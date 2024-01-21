# Project

Node.js + Express.js REST API, which provides CRUD operations on a table in SQLite3.

## Requirements

### Plain mode
 - [ ] `NodeJS` >= 19
 - [ ] `Sqlite3`

### Docker
- [ ] `Docker`

### Kubernetes
- [ ] `Minikube` / other tool / cloud provider
- [ ] `kubectl`

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

 - [ ] Run Docker
    ```
    docker pull ghcr.io/kesha123/nodejs-rest-api:1.0.0
    ```

    ```
    docker run -p 8080:8080 ghcr.io/kesha123/nodejs-rest-api:1.0.0
    ```

 - [ ] Run K8S
      1. Build an image.
      2. Push image to the registry of your choice. Don't forget to add registry key if the registry os private.
      ```
      kubectl create secret docker-registry <your-registry-key-name> --docker-server=DOCKER_REGISTRY_SERVER --docker-username=DOCKER_USER --docker-password=DOCKER_PASSWORD --docker-email=DOCKER_EMAIL
      ```
      3. Update `kubernetes/deployment.yaml` with you imnage
      ```
      kubectl apply -f=kubernetes/deployment.yaml -f=kubernetes/service.yaml -f=kubernetes/persistent-volume-claim.yaml -f=kubernetes/persistent-volume.yaml
      ```


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
