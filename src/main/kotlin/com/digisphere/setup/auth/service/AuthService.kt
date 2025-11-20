package com.digisphere.setup.auth.service

import com.digisphere.setup.auth.dto.LoginRequest
import com.digisphere.setup.auth.dto.LoginResponse
import com.digisphere.setup.auth.dto.TokenResponse
import com.digisphere.setup.config.security.JwtTokenUtil
import com.digisphere.setup.config.security.UserDetailsServiceImpl
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.stereotype.Service

@Service
class AuthService(
    private val manager: AuthenticationManager,
    private val jwtTokenUtil: JwtTokenUtil,
    private val userDetailsServiceImpl: UserDetailsServiceImpl
) {

    fun login(credentials: LoginRequest): Result<LoginResponse> = runCatching {

        val auth = manager.authenticate(
            UsernamePasswordAuthenticationToken(credentials.email, credentials.password)
        )
        SecurityContextHolder.getContext().authentication = auth

        val username = auth.name
        val userDetails = userDetailsServiceImpl.loadUserByUsername(username)

        val accessToken = jwtTokenUtil.generateAccessToken(
            userDetails.username,
            userDetails.authorities
        )

        val refreshToken = jwtTokenUtil.generateRefreshToken(
            userDetails.username
        )

        LoginResponse(
            accessToken = accessToken,
            refreshToken = refreshToken
        )
    }

    fun refreshToken(refreshToken: String) = runCatching {
        if (!jwtTokenUtil.validate(refreshToken)) {
            throw RuntimeException("Invalid refresh token")
        }

        val username = jwtTokenUtil.extractUsername(refreshToken)
        val user = userDetailsServiceImpl.loadUserByUsername(username)

        val newAccessToken = jwtTokenUtil.generateAccessToken(
            username,
            user.authorities
        )

        TokenResponse(newAccessToken);
    }

}