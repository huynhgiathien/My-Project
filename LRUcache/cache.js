class LRUCache {
    constructor(size) {
        this.size = size || 3;
        this.cache = new Map();
    }

    put (key, value) {
        const hasKey = this.cache.has(key);
        if (hasKey) {
            this.cache.delete(key);
        }

        this.cache.set(key, value);
        if(this.cache.size > this.size)
        {
            this.cache.delete(this.cache.key().next().value);
        }
        return true;
    }
    
    get(key) {
        const hasKey = this.cache.has(key);
        if (hasKey) {
            const val = this.cache.get(key);
            this.cache.delete(key);
            this.cache.set(key, val);
            return val;
        }
        return -1;
    }

    item(){
        return this.cache.entries();
    }
}

// const cache = new LRUCache(3)
// cache.put(1,1)
// cache.put(2,2)
// cache.put(3,3)
// cache.item()

