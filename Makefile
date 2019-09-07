godep:
	go get -v github.com/spf13/hugo

build:
	- hugo
	- rm -fR public/videos
	docker build -f deploy/Dockerfile -t registry.geniusrabbit.dev/demdxx/www .

sync:
	docker push registry.geniusrabbit.dev/demdxx/www

deploy: build sync
