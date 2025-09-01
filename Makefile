HUGO_URI := -tags extended,withdeploy github.com/gohugoio/hugo@v0.128
export GOSUMDB := off
export GOFLAGS=-mod=mod
# Go 1.13 defaults to TLS 1.3 and requires an opt-out.  Opting out for now until certs can be regenerated before 1.14
# https://golang.org/doc/go1.12#tls_1_3
export GODEBUG := tls13=0

.GODEPS:
	go install ${HUGO_URI}

.PHONY: build
build: .GODEPS ## Build application
	CGO_ENABLED=1 go run ${HUGO_URI} --minify
	- rm -fR public/videos
	echo "demdxx.com" > public/CNAME

.PHONY: run
run: ## Run application
	hugo server -D

.PHONY: help
help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

.DEFAULT_GOAL := help
