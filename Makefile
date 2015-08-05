default: push

build:
	ember build --environment=production

push:
	git push
	git push heroku master

set_origin:
	heroku git:remote -a wallapop-web