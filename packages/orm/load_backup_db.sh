#!/bin/bash -ex

pg_restore -U postgres -d postgres -h localhost -p 5432 -c -v ./backups/big_backup.sql
