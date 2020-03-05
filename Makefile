DOCKER_COMPOSE  = docker-compose

EXEC_JS         = $(DOCKER_COMPOSE) run webpack

NPM             = $(EXEC_JS) npm

##
## Project
## -------
##

build:                                                        ## Build the app locally
	$(NPM) run build

clean: kill                                                   ## Stop the project and remove generated files
	rm -rf node_modules

kill:
	$(DOCKER_COMPOSE) kill
	$(DOCKER_COMPOSE) down --volumes --remove-orphans

install: build-docker node_modules                           ## Install

reset: clean install                                         ## Stop and start a fresh install of the project

start:                                                       ## Start the project
	$(DOCKER_COMPOSE) up webpack

storybook:
	$(DOCKER_COMPOSE) up storybook

stop:                                                        ## Stop the project
	$(DOCKER_COMPOSE) stop

mac:                                                        ## Rename docker-compose.override.yml for OSX users
	cp -n docker-compose.override.mac.yaml docker-compose.override.yaml

mac-dinghy:                                                 ## Rename docker-compose.override.yml for OSX users
	cp -n docker-compose.override.dinghy.yaml docker-compose.override.yaml

lint:                                                       ## Run linter inside container
	$(NPM) run lint

.PHONY: kill install mac mac-dinghy reset start stop lint

build-docker:
	$(DOCKER_COMPOSE) build


##
## Utils
## -----
##

node:                                                        ## Run interactive sh inside node
	$(DOCKER_COMPOSE) run --rm webpack sh

.PHONY: node

node_modules: package-lock.json
	$(NPM) ci
	@touch -c node_modules

package-lock.json: package.json
	$(NPM) install
