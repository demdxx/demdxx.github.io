.PHONY: $(godep)
$(godep): ## Download hugo tools
	go get -v github.com/gohugoio/hugo

.PHONY: build
build: $(godep) ## Build application
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
