#!/bin/bash -ex

# example: ./load_backup_docker.sh ./backups/big_backup.sql

# TODO: Store your POSTGRES_USER and POSTGRES_DB variables in .env
# (also add .env to .gitignore)
source .env

PG_FILE=${1}

if [[ -z "$PG_FILE" ]]; then
    echo "Please specify a PostgreSQL file"
    exit 1
fi

# TODO: replace/leave off somename.
CONTAINER_ID=$(docker ps --format='{{.ID}}' --filter name=^/erado_postgres$)

echo "Copying $PG_FILE to $CONTAINER_ID:/docker-entrypoint-initdb.d/dump.sql"

docker cp ${PG_FILE} ${CONTAINER_ID}:/docker-entrypoint-initdb.d/dump.sql

docker exec -it $CONTAINER_ID bash -c 'pg_restore -c --user ${POSTGRES_USER} --dbname ${POSTGRES_DB} /docker-entrypoint-initdb.d/dump.sql'