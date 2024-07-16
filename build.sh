docker build -t on-discord .
docker rm -f on-discord

docker run -d --add-host=host.docker.internal:host-gateway -e DISCORD_TOKEN='' -e DB_URL='mongodb://host.docker.internal:27017/?authSource=admin' --name on-discord --restart always on-discord
docker image prune -f
