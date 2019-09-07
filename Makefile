godep:
	go get -v github.com/spf13/hugo

build:
	- hugo
	- rm -fR public/videos
	docker build -f deploy/Dockerfile -t registry.geniusrabbit.dev/personal/demdxx .

sync:
	docker push registry.geniusrabbit.dev/personal/demdxx

deploy: build sync
