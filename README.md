# Websocket Demo

## Startup

1. Install dependencies on the front and back ends with `yarn install`.
2. If you have not already installed redis, [do so](https://redis.io/download).
3. Start redis server with `redis-server`.
4. Start the back end with `yarn start`.
5. Start the front end with `yarn start`.

To access the redis cli, run `redis-cli`.

## Environment

### Front End

```
REACT_APP_BACKEND_URL="http://localhost:8080"
```

### Back End

```
FRONT_END_URL="http://localhost:3000"
PORT="8080"
REDIS_URL="redis://:6379"
```
