#!/usr/bin/env bash

# get all albums
# curl -X GET http://localhost:8080/album

# get album(s) by composer
# curl -X GET http://localhost:8080/album?composer=Kerry%20Muzzey

# get album(s) by title
# curl -X GET http://localhost:8080/album?title=Dear%20Esther

# get album(s) by composer and title
# curl -X GET "http://localhost:8080/album?composer=Audiomachine&title=Tree%20of%20Life"

# get album by ID
# curl -X GET http://localhost:8080/album/54f3a4df056601726f867685

# post a new album
# curl -X POST http://localhost:8080/album \
#     -d @new-album.json \
#     -H "Content-Type: application/json"

# put an update to an album
# curl -X PUT http://localhost:8080/album/54f66ed2fa4af12b43fee49b \
#     -d '{"releaseDate": "2013-08-15T05:00:00.000Z"}' \
#     -H "Content-Type: application/json"

# delete an album
# curl -X DELETE http://localhost:8080/album/54f66ed2fa4af12b43fee49b