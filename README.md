## What is Redis?
- Open Source in-memory data structure store
---
### What is in-memory data structure store?
- An in-memory database(IMDB) is also called main memory database system(MMDB) or memory resident database.
- It is a database management system that primarily relies on main memory for computer data storage. i.e the whole dataset is stored in RAM
- Each time you query a DB or update the DB you only access the main memory. So there's no disk involved in the operation. Main memory is faster than the disk, so the reads are faster. However the drawback is the size of the dataset is affected by the RAM availability. A similar DB is Memcached.
---

- Redis is a key-value store, often referred to as NoSQL Database. Key-value store means, data/value is stored inside a key. This data is later retrieved only if we know the exact key use dot store it.

`SET key value`

`SET server:name url-shortner`

- Data types supported in Redis:
    - Strings
    - Lists
    - Sets
    - Sorted Sets
    - Hashes (similar to objects)
    - Bitmaps
    - Hyperlogs
    - Geospatial indexes

- No schema & column names
- Both as a caching system & persistent DB. eg. Memcached is a caching system and MongoDB is persistent DB. Redis has best of both the worlds combined
- Data encryption not supported. Only trusted clients should be allowed access.

### Redis Installation/commands on Mac

- Install Redis: `brew install redis`
- Launch Redis on computer start: `ln -sfv /usr/local/opt/redis/*.plist ~/Library/LaunchAgents`
- Start redis server via launchctl: `launchctl load ~/Library/LaunchAgents/homebrew.mxcl.redis.plist`
- Start redis-server using config file: `redis-server /usr/local/etc/redis.conf`
- Stop redis autostart on computer start: `launchctl unload ~/Library/LaunchAgents/homebrew.mxcl.redis.plist`
- Location of Redis config file: `/usr/local/etc/redis.conf`
- Uninstall Redis & remove its files: 
    - `brew uninstall redis`
    - `rm ~/Library/LaunchAgents/homebrew.mxcl.redis.plist`
- Redis package information: `brew info redis`
- Test if redis-server is running:
`redis-cli ping` => `PONG`

### Redis-cli commands

Command|Repsonse
-------|--------
ping|PONG



