

## Chạy db:
```bash
docker-compose up -d --build
```

## Chạy load backup:
```bash
sh ./load_backup_docker.sh  ./backups/big_backup.sql
```

## Dừng db:
```bash
docker-compose down
```