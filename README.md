Octoreso

Source for Octoreso.com, a mapping utility for Ingress Missions.

## Installation

* Clone and bundle, nothing special.
* Make sure your system has a self-signed SSL cert. (.key and .crt)

## Running Server

* `server='puma -b '\''ssl://127.0.0.1:3000?key=full/path/to/selfsigned/server.key&cert=full/path/to/selfsigned/server.crt'\'`
* You will likely want to alias that to something meaningful.
