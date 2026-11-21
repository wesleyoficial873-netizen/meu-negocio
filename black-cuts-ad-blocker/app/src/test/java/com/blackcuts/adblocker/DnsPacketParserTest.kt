package com.blackcuts.adblocker

import com.blackcuts.adblocker.dns.DnsPacketParser
import org.junit.Assert.assertEquals
import org.junit.Assert.assertNotNull
import org.junit.Test
import java.nio.ByteBuffer

class DnsPacketParserTest {

    @Test
    fun parseIpv4UdpDns_extractsDomainAndBuildsNxDomainResponse() {
        // Monta pacote IPv4 + UDP + DNS query para "ads.doubleclick.net"
        val dnsQuery = byteArrayOf(
            0x12, 0x34, // Transaction ID
            0x01, 0x00, // Standard query, RD=1
            0x00, 0x01, // QDCOUNT=1
            0x00, 0x00, // ANCOUNT=0
            0x00, 0x00, // NSCOUNT=0
            0x00, 0x00, // ARCOUNT=0
            3, 'a'.code.toByte(), 'd'.code.toByte(), 's'.code.toByte(),
            11, 'd'.code.toByte(), 'o'.code.toByte(), 'u'.code.toByte(), 'b'.code.toByte(),
            'l'.code.toByte(), 'e'.code.toByte(), 'c'.code.toByte(), 'l'.code.toByte(),
            'i'.code.toByte(), 'c'.code.toByte(), 'k'.code.toByte(),
            3, 'n'.code.toByte(), 'e'.code.toByte(), 't'.code.toByte(),
            0x00,       // End of QNAME
            0x00, 0x01, // QTYPE = A
            0x00, 0x01  // QCLASS = IN
        )

        val totalLen = 20 + 8 + dnsQuery.size
        val buf = ByteBuffer.allocate(totalLen)
        buf.put(0x45.toByte())
        buf.put(0x00.toByte())
        buf.putShort(totalLen.toShort())
        buf.putShort(0)
        buf.putShort(0x4000.toShort())
        buf.put(64.toByte())
        buf.put(17.toByte()) // UDP
        buf.putShort(0)
        buf.put(byteArrayOf(10, 111, 222.toByte(), 1))
        buf.put(byteArrayOf(10, 111, 222.toByte(), 2))

        buf.putShort(12345.toShort()) // src port
        buf.putShort(53.toShort())    // dst port
        buf.putShort((8 + dnsQuery.size).toShort())
        buf.putShort(0)
        buf.put(dnsQuery)

        val packet = buf.array()
        val parsed = DnsPacketParser.parseIpv4UdpDns(packet, packet.size)
        assertNotNull(parsed)
        assertEquals("ads.doubleclick.net", parsed!!.domain)
        assertEquals(1, parsed.qType)

        val blockedResp = DnsPacketParser.buildBlockedDnsResponse(parsed.dnsPayload)
        assertEquals(0x83.toByte(), blockedResp[3]) // RCODE=3 (NXDOMAIN)
    }
}
