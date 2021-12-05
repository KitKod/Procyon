#!/usr/bin/env bash

cd $APP_DIR
ng serve \
    --configuration=$SERVE_CONFIGURATION \
    --host=$SERVE_HOST \
    --port=$SERVE_PORT \
    --proxy-config=$SERVE_PROXY_CONFIG
