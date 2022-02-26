export GOSUMDB := off
export GOFLAGS=-mod=mod
# Go 1.13 defaults to TLS 1.3 and requires an opt-out.  Opting out for now until certs can be regenerated before 1.14
# https://golang.org/doc/go1.12#tls_1_3
export GODEBUG := tls13=0

.GODEPS:
	go install github.com/gohugoio/hugo@latest

.PHONY: build
build: .GODEPS ## Build application
	hugo
	- rm -fR public/videos
	echo "demdxx.com" > public/CNAME

.PHONY: github-deploy
github-deploy: build ## Deploy to github pages
	git subtree push --prefix public/ origin gh-pages

build-docker: ## Build docker image
	docker build -f deploy/Dockerfile -t registry.geniusrabbit.dev/demdxx/www .

.PHONY: sync
sync: ## Sync docker image
	docker push registry.geniusrabbit.dev/demdxx/www

.PHONY: deploy
deploy: build sync ## Deploy docker image

.PHONY: help
help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

.DEFAULT_GOAL := help
