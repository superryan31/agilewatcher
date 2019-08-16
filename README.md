# README
## Configuration
- Create .env file and copy the .env.example to .env file
- Change the value for database user, password max_thread and host(db) in .env file.
- If you run in local, please make sure to stop mysql service.
- Run `docker-compose up`

## Database creation
```
$ docker-compose run --rm backend bin/rails db:create
```

## Database initialization
```
$ docker-compose run --rm backend bin/rails db:reset
```

### Database Reset
```
$ docker-compose run --rm backend bin/rails db:migrate:reset
```

## Seed
```
$ docker-compose run --rm backend bin/rails db:seed
```

## How to bundle install
```
$ docker-compose run --rm backend bundle install
```
## How to run rspec
```
$ docker-compose run --rm backend bin/rspec
```
## How to run app (Backend + Frontend)
```
$ docker-compose up
```
