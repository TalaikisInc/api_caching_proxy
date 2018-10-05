# API Redis Caching proxy

This simple proxy caches existing API calls on Redis, expiries are configurable for each route.

## How it works

End user sends POST query with wanted action to the proxy, then proxy caches and forwards the request from the original API or from cached result (if it exists on Redis) to the user.

Example query:

```json
{
    action: 'API_CACHE',
    query: 'beers/1'
}
```

## Install

```bash
npm i
```

## Run

All below parts require Redis running.

```bash
npm run start
```

## Deploy

```bash
npm i -g pm2
./build.sh <folder> <port> [install]
```

## Test

```bash
npm run test
```
