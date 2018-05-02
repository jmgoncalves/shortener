# URL Shortener

Create short URLs with this (minimal) piece of work! It comprises of a Redis database, Scala-based backend, static React frontend and an nginx proxy to wrap everything together and avoid CORS fun.

Just clone the repository, do `docker-compose up`, and after an eternity of downloading dependencies, building everything and executing tests, you will be able to access the UI @ http://localhost:8080/ui/

Short links start with http://localhost:8080/l/ and the API is accessible from http://localhost:8080/api

Tests are a bit minimal but to be honest there isn't much code, so there also isn't much to test... Anyway, the frontend tests can be run with `npm test` (requires node installed) and backend ones with `sbt test` (requires sbt installed).

Enjoy!
