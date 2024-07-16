docker build -t dog3 .
docker rm -f dog3 || true

docker run -d --add-host=host.docker.internal:host-gateway -e DISCORD_TOKEN='' -e DB_URL='mongodb://host.docker.internal:27017/?authSource=admin' --name dog3 --restart always dog3
docker image prune -f
