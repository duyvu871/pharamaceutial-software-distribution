#!/bin/bash
# custom env
set -e

# Kiểm tra nếu file backup tồn tại
if [ -f /docker-entrypoint-initdb.d/backups/big_backup.sql ]; then
    echo "Restoring backup from big_backup.sql..."
    # Thực hiện pg_restore; các biến môi trường $POSTGRES_USER và $POSTGRES_DB được đặt bởi image postgres
    pg_restore --username "$DB_POSTGRES_USER" \
               --dbname "$DB_POSTGRES_DATABASE" \
               --verbose /docker-entrypoint-initdb.d/backups/big_backup.sql
else
    echo "Không tìm thấy file big_backup.sql. Bỏ qua pg_restore."
fi

