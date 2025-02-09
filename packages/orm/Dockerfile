FROM postgres:15-alpine

RUN apk add --no-cache --virtual .build-deps \
    git \
    postgresql-dev \
    gcc \
    make \
    musl-dev \
    clang \
    llvm

RUN git clone --branch v0.5.1 https://github.com/pgvector/pgvector.git \
    && cd pgvector \
    && make OPTFLAGS="" \
    && make install \
    && cd .. \
    && rm -rf pgvector


RUN apk del .build-deps

COPY .env /docker-entrypoint-initdb.d/.env

# Copy file backup (đặt file backup.dump cùng thư mục với Dockerfile)
COPY backups/big_backup.sql /docker-entrypoint-initdb.d/backups/big_backup.sql

# Copy script init để chạy pg_restore khi container khởi tạo
COPY init.sh /docker-entrypoint-initdb.d/init.sh
COPY configure_postgres.sh /docker-entrypoint-initdb.d/configure_postgres.sh

RUN chmod +x /docker-entrypoint-initdb.d/init.sh
RUN chmod +x /docker-entrypoint-initdb.d/configure_postgres.sh