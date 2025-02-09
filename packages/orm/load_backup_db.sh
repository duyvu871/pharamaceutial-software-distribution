#!/bin/bash -ex

pg_restore -U postgres -d quan_ly_nha_thuoc -h localhost -p 5432 -c -v ./backups/big_backup.sql

## load backup via docker exec
## docker exec -i erado_postgres pg_restore -U postgres -d quan_ly_nha_thuoc -h localhost -p 5432 -c -v < ./backups/big_backup.sql