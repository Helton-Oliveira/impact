package com.digisphere.setup.config.security

import io.jsonwebtoken.Jwts
import io.jsonwebtoken.SignatureAlgorithm
import org.springframework.beans.factory.annotation.Value
import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.stereotype.Component
import java.util.*

@Component
class JwtTokenUtil(
    private val userDetailsService: UserDetailsService
) {
    @Value("\${jwt.secret}")
    private lateinit var secret: String

    private val accessExpiration: Long = 1000L * 60 * 15
    private val refreshExpiration: Long = 1000L * 60 * 60 * 24 * 30

    fun generateAccessToken(username: String, roles: Collection<GrantedAuthority>): String {
        return Jwts.builder()
            .setSubject(username)
            .claim("roles", roles.map { it.authority })
            .setExpiration(Date(System.currentTimeMillis() + accessExpiration))
            .signWith(SignatureAlgorithm.HS512, secret.toByteArray())
            .compact()
    }

    fun generateRefreshToken(username: String): String {
        return Jwts.builder()
            .setSubject(username)
            .setIssuedAt(Date())
            .setExpiration(Date(System.currentTimeMillis() + refreshExpiration))
            .signWith(SignatureAlgorithm.HS512, secret.toByteArray())
            .compact()
    }

    fun validate(token: String?): Boolean {
        return try {
            Jwts.parser().setSigningKey(secret.toByteArray()).parseClaimsJws(token)
            true
        } catch (e: Exception) {
            e.printStackTrace()
            false
        }
    }

    fun extractUsername(token: String): String {
        return Jwts.parser().setSigningKey(secret.toByteArray()).parseClaimsJws(token).body.subject
    }
}
