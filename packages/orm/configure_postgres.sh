#!/bin/bash

# Đọc biến môi trường từ file .env (nếu có)
if [ -f .env ]; then
  export $(grep -v '^#' .env | xargs)
fi

# Kiểm tra xem các biến môi trường cần thiết đã được set hay chưa
if [ -z "$DB_POSTGRES_HOST" ] || [ -z "$DB_POSTGRES_PORT" ] || [ -z "$DB_POSTGRES_USER" ] || [ -z "$DB_POSTGRES_PASSWORD" ] || [ -z "$DB_POSTGRES_DATABASE" ]; then
  echo "ERROR: Các biến môi trường DB_POSTGRES_HOST, DB_POSTGRES_PORT, DB_POSTGRES_USER, DB_POSTGRES_PASSWORD, DB_POSTGRES_DATABASE chưa được set."
  exit 1
fi

# User và mật khẩu
DATABASE_USER="$DB_POSTGRES_USER" # Bạn có thể tùy chỉnh tên user ở đây
DATABASE_PASSWORD="$DB_POSTGRES_PASSWORD"
DATABASE_NAME="$DB_POSTGRES_DATABASE"

# Sử dụng psql để thực hiện các lệnh SQL
psql_command="psql -U postgres -c"

echo "Bắt đầu cấu hình PostgreSQL..."

# Tạo user (nếu chưa tồn tại)
if ! psql -U postgres -t -c "SELECT 1 FROM pg_roles WHERE rolname='$DATABASE_USER'" | grep -q "^1$"; then
  echo "  Creating user $DATABASE_USER..."
  $psql_command "CREATE USER $DATABASE_USER WITH PASSWORD '$DATABASE_PASSWORD';"
else
  echo "  User $DATABASE_USER already exists."
fi

# Tạo database (nếu chưa tồn tại)
if ! psql -U postgres -t -c "SELECT 1 FROM pg_database WHERE datname='$DATABASE_NAME'" | grep -q "^1$"; then
  echo "  Creating database $DATABASE_NAME..."
  $psql_command "CREATE DATABASE $DATABASE_NAME;"
else
  echo "  Database $DATABASE_NAME already exists."
fi

# Cấp quyền cho user trên database
echo "  Granting privileges to user $DATABASE_USER on database $DATABASE_NAME..."
$psql_command "GRANT ALL PRIVILEGES ON DATABASE $DATABASE_NAME TO $DATABASE_USER;"
$psql_command "GRANT USAGE ON SCHEMA public TO $DATABASE_USER;"
$psql_command "GRANT CREATE, USAGE ON SCHEMA public TO $DATABASE_USER;"
$psql_command "GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO $DATABASE_USER;"
$psql_command "GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO $DATABASE_USER;"

# Thiết lập schema mặc định (tùy chọn)
# echo "  Setting default schema for user $DATABASE_USER..."
# $psql_command "ALTER USER $DATABASE_USER SET search_path TO public;"

echo "Hoàn tất cấu hình PostgreSQL."