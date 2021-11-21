#!/usr/bin/env bash

if [ -z "$POSTGRES_HOST" ] || [ -z "$POSTGRES_PORT" ] || [ -z "$POSTGRES_DB" ] || [ -z "$POSTGRES_USER" ] || [ -z "${POSTGRES_PASSWORD}" ]; then
    echo "Please, specify DB credentials POSTGRES_HOST POSTGRES_PORT POSTGRES_DB POSTGRES_USER POSTGRES_PASSWORD"
    exit 1;
fi

LIQUIBASE_URL="jdbc:postgresql://$POSTGRES_HOST:$POSTGRES_PORT/$POSTGRES_DB"

exec ./wait-for.sh $POSTGRES_HOST:$POSTGRES_PORT -- /liquibase/liquibase \
    --driver="org.postgresql.Driver" \
    --changeLogFile="$MASTER_CHANGELOG" \
    --logLevel="debug" \
    --url="$LIQUIBASE_URL" \
    --username="$POSTGRES_USER" \
    --password="${POSTGRES_PASSWORD}" \
    "$@"

