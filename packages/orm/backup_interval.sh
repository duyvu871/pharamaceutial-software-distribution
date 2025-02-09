#!/bin/bash
set -e

# -------------------------------
# Cấu hình (có thể override bằng biến môi trường)
# -------------------------------
# Host và cổng của PostgreSQL (nếu chạy trong cùng network hoặc trên host)
DB_HOST="${DB_HOST:-localhost}"
DB_PORT="${DB_PORT:-5432}"

# Thông tin kết nối tới database
DB_USER="${DB_USER:-${DB_POSTGRES_USER:-myuser}}"
DB_PASSWORD="${DB_PASSWORD:-${DB_POSTGRES_PASSWORD:-mypassword}}"
DB_NAME="${DB_NAME:-${DB_POSTGRES_DATABASE:-mydatabase}}"

# Thư mục chứa file backup (volume đã được mount, ví dụ: ./backups được mount vào /backup)
BACKUP_DIR="${BACKUP_DIR:-/backup}"

# Khoảng thời gian backup định kỳ (đơn vị: giây); ví dụ: 24 giờ = 86400 giây
BACKUP_INTERVAL="${BACKUP_INTERVAL:-86400}"

# Export mật khẩu để pg_dump không yêu cầu nhập
export PGPASSWORD="$DB_PASSWORD"

echo "Khởi chạy backup định kỳ cho database '$DB_NAME'"
echo "Host: $DB_HOST, Port: $DB_PORT, User: $DB_USER"
echo "Thư mục backup: $BACKUP_DIR"
echo "Backup interval: $BACKUP_INTERVAL giây"

# Tạo thư mục backup nếu chưa có
mkdir -p "$BACKUP_DIR"

# Vòng lặp backup định kỳ
while true; do
    TIMESTAMP=$(date +"%Y-%m-%d_%H-%M-%S")
    BACKUP_FILE="${BACKUP_DIR}/${DB_NAME}_backup_${TIMESTAMP}.sql"

    echo "[$(date)] Bắt đầu backup: ${BACKUP_FILE}"
    # Thực hiện backup database bằng pg_dump
    pg_dump -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d "$DB_NAME" > "$BACKUP_FILE"

    if [ $? -eq 0 ]; then
        echo "[$(date)] Backup thành công: ${BACKUP_FILE}"
    else
        echo "[$(date)] Backup thất bại"
    fi

    echo "[$(date)] Chờ ${BACKUP_INTERVAL} giây trước khi backup lần tiếp theo..."
    sleep "$BACKUP_INTERVAL"
done
