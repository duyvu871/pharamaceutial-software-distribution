#!/bin/bash -ex

pg_restore -U postgres -d quan_ly_nha_thuoc -h localhost -p 5432 -c -v ./backups/mydatabase_backup.sql
