#!/usr/bin/env bash
set -euo pipefail
IFS=$'\n\t'

# based on https://www.knowru.com/blog/how-scale-r-restful-apis-using-docker/

# needs siege installed
# brew install siege
# then siege.config

siege -b -c 5 -r 10 http://localhost:8080/bah