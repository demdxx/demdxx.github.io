NPM ?= npm
PORT ?= 7777

.PHONY: help install dev run build lint clean preview

.DEFAULT_GOAL := help

help: ## Show available targets
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

install: ## Install dependencies
	$(NPM) install

dev: ## Start development server
	$(NPM) run dev -- --port $(PORT)

run: dev ## Alias for dev

build: ## Build static site to out/
	$(NPM) run build

lint: ## Run linter
	$(NPM) run lint

preview: build ## Serve static output locally
	$(NPM) exec -- serve out -p $(PORT)

clean: ## Remove build artifacts and dependencies
	rm -rf .next out node_modules
