## Release

Run the production stack via

```shell
docker compose -f docker-compose.yml -f docker-compose-prod.yml up
```

Ports and passwords to access web services such as the frontend and database
console are in the .env file.

## Dev

Run the docker compose stack via

```shell
docker compose watch
```

Run individual services via

```shell
docker compose watch <multiple> <services>
```

All configurable environment variables are in the .env file.

### Testing

Tests can be run in docker

```bash
env TEST='test' docker compose up --build --attach backend
```

To run with jest command arguments

```bash
env TEST='test -- {jest variables}' docker compose up --build --attach backend
env TEST='test -- -t \"my jest test name\"' docker compose up --build --attach backend
```

## Caveats

Building and running images manually and not via docker compose makes containers
not respond to SIGTERM. Each image sends SIGKILL instead of SIGTERM to allow
docker compose to kill the containers immediately.
