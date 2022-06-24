

ensure-dependencies:
	@echo "Ensuring docker is installed..."
	@docker info

brand:
	@echo "Creating our healthy-thoughts manifest file..."
	@node_modules/make-manifest/bin/make-manifest
	@cat ./manifest.json

package:
	@echo "Building our healthy-thoughts docker image..."
	@docker build --tag healthy-thoughts .
	@docker images

qa:
	@echo "Checking that our healthy-thoughts tests dont fail..."
	@npm run qa