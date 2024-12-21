#!/bin/bash -ex

# Load environment variables from .env file (if present)
if [ -f .env ]; then
  echo "Loading environment variables from .env file"
  export $(grep -v '^#' .env | xargs)
fi

# Check if required environment variables are set
if [ -z "$DB_POSTGRES_HOST" ] || [ -z "$DB_POSTGRES_PORT" ] || [ -z "$DB_POSTGRES_USER" ] || [ -z "$DB_POSTGRES_PASSWORD" ] || [ -z "$DB_POSTGRES_DATABASE" ]; then
    echo "Error: Required PostgreSQL environment variables are not set."
    echo "Please set DB_POSTGRES_HOST, DB_POSTGRES_PORT, DB_POSTGRES_USER, DB_POSTGRES_PASSWORD, and DB_POSTGRES_DATABASE"
    exit 1
fi

DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="./backups/mydatabase_backup_$DATE.dump"

# Create the backups directory if it doesn't exist
mkdir -p "./backups"

echo 'pg_dump command executed: pg_dump -U '"$DB_POSTGRES_USER"' -h '"$DB_POSTGRES_HOST"' -p '"$DB_POSTGRES_PORT"' -Fc '"$DB_POSTGRES_DATABASE"' > '"$BACKUP_FILE"

# Construct the pg_dump command with the loaded variables
pg_dump -U "$DB_POSTGRES_USER" -h localhost -p "$DB_POSTGRES_PORT" -Fc "$DB_POSTGRES_DATABASE" > "$BACKUP_FILE"

echo "Backup created: $BACKUP_FILE"

# pg_dump -U postgres -h localhost -p 5432 -Fc quan_ly_nha_thuoc > ./backups/mydatabase_backup.sql