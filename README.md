Octoreso

Source for Octoreso.com, a mapping utility for Ingress Missions.

## Installation

* Clone and bundle, nothing special.
* Make sure your system has a self-signed SSL cert. (.key and .crt)

## Running Server

* `puma -b 'ssl://127.0.0.1:3000?key=full/path/to/selfsigned/server.key&cert=full/path/to/selfsigned/server.crt'`
* You will likely want to alias that to something meaningful.


## Backups

Currently manual (:()

* `cap production db:local:sync DB_USER=... DB_PASSWORD=... DB_NAME=...`
* Must unfortunately supply ENV variables manually here as Figaro is not yet loaded.
* Another alias? Keep it safe if storing DB credentials!
