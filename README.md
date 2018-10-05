# API Caching proxy

This simple proxy caches existing API calls on Redis, expiries are configurable for each route.

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
