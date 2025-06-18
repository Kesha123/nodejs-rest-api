API_IMAGE_TAG 			?= latest
MIGRATIONS_IMAGE_TAG 	?= latest
SSL_DIR                 ?= $(shell pwd)/infrastructure/docker/ssl
COMMON_NAME             ?= localhost


.PHONY: build-api-docker-image
build-api-docker-image:
	docker build -t ghcr.io/kesha123/nodejs-rest-api/api:$(API_IMAGE_TAG) -f ./api/docker/Dockerfile ./api


.PHONY: build-migrations-docker-image
build-migrations-docker-image:
	docker build -t ghcr.io/kesha123/nodejs-rest-api/migrations:$(MIGRATIONS_IMAGE_TAG) -f ./data/docker/Dockerfile ./data


.PHONY: generate-tls-certificates
generate-tls-certificates:
	@echo "Generating TLS certificates..."
	@mkdir -p $(SSL_DIR)
	@PASSPHRASE=$$(openssl rand -hex 64); \
	openssl req -new -text -passout pass:${PASSPHRASE} -subj /CN=${COMMON_NAME} -out ${SSL_DIR}/server.req -keyout ${SSL_DIR}/privkey.pem
	openssl rsa -in ${SSL_DIR}/privkey.pem -passin pass:${PASSPHRASE} -out ${SSL_DIR}/server.key
	openssl req -x509 -in ${SSL_DIR}/server.req -text -key ${SSL_DIR}/server.key -out ${SSL_DIR}/server.crt
	@sudo chmod 600 ${SSL_DIR}/server.key


.PHONY: export-tls-certificates-to-env
export-tls-certificates-to-env:
	@echo "Exporting TLS certificates to environment variables..."
	@mkdir -p $(shell pwd)/infrastructure/docker
	@echo "SSL_CERTIFICATE=$(shell cat $(SSL_DIR)/server.crt)" >> $(shell pwd)/infrastructure/docker/.env
	@echo "SSL_KEY=$(shell cat $(SSL_DIR)/server.key)" >> $(shell pwd)/infrastructure/docker/.env
	@echo "SSL_CA=$(shell cat $(SSL_DIR)/server.crt)" >> $(shell pwd)/infrastructure/docker/.env


.PHONY: database-start-local
database-start-local:
	docker compose -f ./infrastructure/docker/docker-compose.database.yml up -d
	docker exec -t nodejs-rest-api_postgres sh -c "psql -U postgres -d postgres -f /opt/sql/insert.sql"


.PHONY: api-start-local
api-start-local:
	docker compose -f ./infrastructure/docker/docker-compose.yml up -d
	docker exec -t nodejs-rest-api_postgres sh -c "psql -U postgres -d postgres -f /opt/sql/insert.sql"
