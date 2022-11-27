bvim:
	cd backend && vim .
bcode:
	cd backend && code .
server: 
	cd backend && rails s -b 0.0.0.0
console:
	cd backend && rails c
sidekiq:
	cd backend && bundle exec sidekiq
credentials:
	cd backend && EDITOR=vim rails credentials:edit

