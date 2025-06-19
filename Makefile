API_IMAGE_TAG 			?= latest
MIGRATIONS_IMAGE_TAG 	?= latest
SSL_DIR                 ?= $(shell pwd)/infrastructure/docker/ssl
COMMON_NAME             ?= localhost
GITHUB_TOKEN			?= ${GITHUB_TOKEN}

.PHONY: build-api-docker-image
build-api-docker-image:
	docker build -t ghcr.io/kesha123/nodejs-rest-api/api:$(API_IMAGE_TAG) \
		--build-arg GITHUB_TOKEN=${GITHUB_TOKEN} \
		-f ./api/docker/Dockerfile \
		./api


.PHONY: build-migrations-docker-image
build-migrations-docker-image:
	docker build -t ghcr.io/kesha123/nodejs-rest-api/migrations:$(MIGRATIONS_IMAGE_TAG) \
		-f ./data/docker/Dockerfile \
		./data


.PHONY: generate-tls-certificates
generate-tls-certificates:
	@echo "Generating TLS certificates..."
	@mkdir -p $(SSL_DIR)
	@PASSPHRASE=$$(openssl rand -hex 64); \
	openssl req -new -text -passout pass:${PASSPHRASE} -subj /CN=${COMMON_NAME} -out ${SSL_DIR}/server.req -keyout ${SSL_DIR}/privkey.pem
	openssl rsa -in ${SSL_DIR}/privkey.pem -passin pass:${PASSPHRASE} -out ${SSL_DIR}/server.key
	openssl req -x509 -in ${SSL_DIR}/server.req -text -key ${SSL_DIR}/server.key -out ${SSL_DIR}/server.crt
	@cp ${SSL_DIR}/server.key ${SSL_DIR}/server.key.bak
	@sudo chown 999:999 ${SSL_DIR}/server.key
	@sudo chmod 600 ${SSL_DIR}/server.key


.PHONY: database-start-local
database-start-local:
	docker compose -f $(shell pwd)/infrastructure/docker/docker-compose.database.yaml up -d
	docker run \
		-ti \
		--rm \
		--env-file $(shell pwd)/infrastructure/docker/.env \
		--network docker_nodejs-rest-api  \
		--volume $(shell pwd)/infrastructure/docker/ssl/privkey.pem:/migrations/ssl/privkey.pem \
		--volume $(shell pwd)/infrastructure/docker/ssl/server.crt:/migrations/ssl/server.crt \
		--volume $(shell pwd)/infrastructure/docker/ssl/server.key.bak:/migrations/ssl/server.key \
		ghcr.io/kesha123/nodejs-rest-api/migrations:${MIGRATIONS_IMAGE_TAG}
	docker exec postgres sh -c "psql -U postgres -d postgres -f /opt/sql/insert.sql"


.PHONY: api-start-local
api-start-local:
	docker compose -f $(shell pwd)/infrastructure/docker/docker-compose.yaml up -d

.PHONY: stack-stop-local
stack-stop-local:
	docker compose -f $(shell pwd)/infrastructure/docker/docker-compose.database.yaml down
	docker compose -f $(shell pwd)/infrastructure/docker/docker-compose.yaml down
