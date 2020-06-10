#!/usr/bin/env bash

# counting album(s) by composer
# curl -X GET http://localhost:8080/album/count?composer=Jessica%20Curry

# finding albums released on a given date
# curl -X GET http://localhost:8080/album/released/01-01-2013

# finding albums released before a given date
# curl -X GET http://localhost:8080/album/released/01-01-2013/before

# finding albums released after a given date
# curl -X GET http://localhost:8080/album/released/01-01-2013/after

# finding related genres
# curl -X GET http://localhost:8080/album/genre/Dance/related