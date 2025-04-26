deploy:
	npm run build
	firebase deploy

# コメントつきでデプロイする
COMMENT=""
deploy-with-comment:
	npm run build
	firebase deploy --only hosting -m "${COMMENT}"