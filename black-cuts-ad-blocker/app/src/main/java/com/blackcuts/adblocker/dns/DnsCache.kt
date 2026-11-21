package com.blackcuts.adblocker.dns

import java.util.concurrent.ConcurrentHashMap

class DnsCache(private val maxEntries: Int = 2000) {

    private data class CacheEntry(
        val responsePayload: ByteArray,
        val expiresAtMillis: Long
    )

    private val cache = ConcurrentHashMap<String, CacheEntry>()

    fun get(domain: String, qType: Int): ByteArray? {
        val key = "$domain:$qType"
        val entry = cache[key] ?: return null
        if (System.currentTimeMillis() > entry.expiresAtMillis) {
            cache.remove(key)
            return null
        }
        return entry.responsePayload.copyOf()
    }

    fun put(domain: String, qType: Int, responsePayload: ByteArray, ttlSeconds: Long = 120L) {
        if (cache.size >= maxEntries) {
            val now = System.currentTimeMillis()
            cache.entries.removeIf { it.value.expiresAtMillis < now }
            if (cache.size >= maxEntries) {
                cache.clear()
            }
        }
        val key = "$domain:$qType"
        val ttlMs = ttlSeconds.coerceIn(30L, 3600L) * 1000L
        cache[key] = CacheEntry(responsePayload.copyOf(), System.currentTimeMillis() + ttlMs)
    }

    fun clear() {
        cache.clear()
    }
}
