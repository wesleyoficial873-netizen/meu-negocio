package com.blackcuts.adblocker.dns

import java.nio.ByteBuffer

data class ParsedDnsPacket(
    val sourceIp: ByteArray,
    val destIp: ByteArray,
    val sourcePort: Int,
    val destPort: Int,
    val dnsPayload: ByteArray,
    val transactionId: Int,
    val domain: String,
    val qType: Int
)

object DnsPacketParser {

    private const val PROTOCOL_UDP = 17

    fun parseIpv4UdpDns(packet: ByteArray, length: Int): ParsedDnsPacket? {
        if (length < 28) return null
        val version = (packet[0].toInt() ushr 4) and 0x0F
        if (version != 4) return null

        val ipHeaderLen = (packet[0].toInt() and 0x0F) * 4
        if (length < ipHeaderLen + 8) return null

        val protocol = packet[9].toInt() and 0xFF
        if (protocol != PROTOCOL_UDP) return null

        val sourceIp = packet.copyOfRange(12, 16)
        val destIp = packet.copyOfRange(16, 20)

        val udpStart = ipHeaderLen
        val sourcePort = ((packet[udpStart].toInt() and 0xFF) shl 8) or (packet[udpStart + 1].toInt() and 0xFF)
        val destPort = ((packet[udpStart + 2].toInt() and 0xFF) shl 8) or (packet[udpStart + 3].toInt() and 0xFF)

        if (destPort != 53) return null

        val dnsStart = udpStart + 8
        if (length <= dnsStart + 12) return null

        val dnsPayload = packet.copyOfRange(dnsStart, length)
        val transactionId = ((dnsPayload[0].toInt() and 0xFF) shl 8) or (dnsPayload[1].toInt() and 0xFF)

        val (domain, qType) = parseQuestion(dnsPayload) ?: return null

        return ParsedDnsPacket(
            sourceIp = sourceIp,
            destIp = destIp,
            sourcePort = sourcePort,
            destPort = destPort,
            dnsPayload = dnsPayload,
            transactionId = transactionId,
            domain = domain,
            qType = qType
        )
    }

    private fun parseQuestion(dns: ByteArray): Pair<String, Int>? {
        if (dns.size < 13) return null
        val sb = StringBuilder()
        var index = 12
        while (index < dns.size) {
            val labelLen = dns[index].toInt() and 0xFF
            index++
            if (labelLen == 0) break
            if ((labelLen and 0xC0) == 0xC0) return null // Ponteiro comprimido inesperado na pergunta
            if (index + labelLen > dns.size) return null
            if (sb.isNotEmpty()) sb.append('.')
            sb.append(String(dns, index, labelLen, Charsets.US_ASCII))
            index += labelLen
        }
        if (index + 4 > dns.size) return null
        val qType = ((dns[index].toInt() and 0xFF) shl 8) or (dns[index + 1].toInt() and 0xFF)
        return sb.toString() to qType
    }

    fun buildBlockedDnsResponse(queryPayload: ByteArray): ByteArray {
        // Resposta NXDOMAIN (RCODE = 3) para o cliente encerrar imediatamente sem tentar fallback
        val response = queryPayload.copyOf()
        if (response.size >= 4) {
            // QR=1, Opcode=0, AA=0, TC=0, RD=1 -> 0x81
            response[2] = 0x81.toByte()
            // RA=1, Z=0, RCODE=3 (NXDOMAIN) -> 0x83
            response[3] = 0x83.toByte()
        }
        return response
    }

    fun buildIpv4UdpResponsePacket(
        request: ParsedDnsPacket,
        dnsResponsePayload: ByteArray
    ): ByteArray {
        val ipHeaderLen = 20
        val udpHeaderLen = 8
        val totalLen = ipHeaderLen + udpHeaderLen + dnsResponsePayload.size
        val buffer = ByteBuffer.allocate(totalLen)

        // IPv4 Header
        buffer.put(0x45.toByte()) // Version 4, IHL 5
        buffer.put(0x00.toByte()) // TOS
        buffer.putShort(totalLen.toShort())
        buffer.putShort(0x0000.toShort()) // Identification
        buffer.putShort(0x4000.toShort()) // Flags (Don't fragment)
        buffer.put(64.toByte()) // TTL
        buffer.put(PROTOCOL_UDP.toByte())
        buffer.putShort(0x0000.toShort()) // Checksum placeholder
        buffer.put(request.destIp) // Source IP = original dest
        buffer.put(request.sourceIp) // Dest IP = original source

        // UDP Header
        val udpLen = udpHeaderLen + dnsResponsePayload.size
        buffer.putShort(request.destPort.toShort())
        buffer.putShort(request.sourcePort.toShort())
        buffer.putShort(udpLen.toShort())
        buffer.putShort(0x0000.toShort()) // UDP Checksum (0 = opcional em IPv4)

        // DNS Payload
        buffer.put(dnsResponsePayload)

        val bytes = buffer.array()
        val ipChecksum = calculateChecksum(bytes, 0, ipHeaderLen)
        bytes[10] = ((ipChecksum ushr 8) and 0xFF).toByte()
        bytes[11] = (ipChecksum and 0xFF).toByte()

        return bytes
    }

    private fun calculateChecksum(data: ByteArray, offset: Int, length: Int): Int {
        var sum = 0L
        var i = offset
        while (i < offset + length - 1) {
            val word = ((data[i].toInt() and 0xFF) shl 8) or (data[i + 1].toInt() and 0xFF)
            sum += word
            if ((sum and 0xFFFF0000L) != 0L) {
                sum = (sum and 0xFFFFL) + (sum ushr 16)
            }
            i += 2
        }
        if (i < offset + length) {
            sum += (data[i].toInt() and 0xFF) shl 8
            if ((sum and 0xFFFF0000L) != 0L) {
                sum = (sum and 0xFFFFL) + (sum ushr 16)
            }
        }
        return (sum.inv() and 0xFFFFL).toInt()
    }
}
