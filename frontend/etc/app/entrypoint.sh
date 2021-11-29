#!/usr/bin/env bash

HOST=0.0.0.0
PORT=80

cd /app
yarn ng serve --host=$HOST --port=$PORT
