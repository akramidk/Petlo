bvim:
	cd backend && vim .
bcode:
	cd backend && code .
bserver: 
	cd backend && rails s -b 0.0.0.0
console:
	cd backend && rails c
sidekiq:
	cd backend && bundle exec sidekiq
docker-development:
	sudo docker compose -f backend-development-docker-compose.yml up