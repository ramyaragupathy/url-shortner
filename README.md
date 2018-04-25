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
`redis-cli ping` =&gt; `PONG`

## Redis-cli commands

### String related

Command|Response
-------|--------
ping|PONG
echo 'hello world'|"hello world"
set &lt;key&gt; &lt;value&gt; | OK
get &lt;key&gt;|&lt;value&gt; or nil if it doesn't exist
incr &lt;key&gt;|Increments an integer value by 1
decr &lt;key&gt;|Decrements an integer value by 1
exists &lt;key&gt;|1 if the key exists, 0 if the key doesn't exist
del &lt;key&gt;|Deletes a k-v pair
flushall|flushes everything from memory
expire &lt;key&gt; &lt;seconds&gt;|k-v pair expires in specified seconds
ttl &lt;key&gt;|Shows the time in seconds for the k-v pair to expire or shows `-2` if it has already expired or key doesn't exist
setex key &lt;time&gt; &lt;value&gt;|set k-v with expiration time
mset &lt;key1&gt; &lt;value1&gt; &lt;key2&gt; &lt;value2&gt; | set multiple k-v pairs
append &lt;key&gt; &lt;value&gt;|Appends value to the existing key


You can use key spaces like `server:name`, `server:port`


### List related

Command|Response
-------|---------
lpush people "ramya"|Creates a list by name people and pushes "ramya" to the front
lrange people 0 -1|fetches everything in the list `people`
llen people|returns the length of the list
lpop people|removes values from the beginning of list
rpop people|removes values from the end of list
linsert people before "ragupathy" "rani"| inserts a value in the list at a specified index

### Set related

Set is an unordered list of strings.

Command|Response
-------|--------
sadd cars "ford"|Creates a set by name cars and adds "ford" to it
sismember cars "ford"|returns `1` if `ford` is a member of set cars
smembers cars|gives all the members of the cars set
scard cars|gives how many members are there in the set
smove cars mycars "ford"| Moves "ford" from the cars set to another set mycars
srem cars "honda"|removes a member from the set

### Sorted sets

They're similar to sets except that every member is associated to a score. Members are sorted from the smallest to greater score. Members are unique, but scores can be repeated.

Command|Response
-------|---------
zadd users 1990 user1|adds user1 with score 1990 to the users set
zrank users user1|returns the rank/index of user1 with users set
zrange users 0 -1| returns all the members in the sorted set
zincrby users 10 user1|increments the score of user 1 within the users sorted set by 10. This alters the rank of all the members






