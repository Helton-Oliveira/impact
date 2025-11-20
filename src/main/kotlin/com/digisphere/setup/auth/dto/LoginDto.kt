package com.digisphere.setup.auth.dto

import jakarta.validation.constraints.NotBlank

data class LoginRequest(
    @field:NotBlank
    val email: String,

    @field:NotBlank
    val password: String,
)

data class RefreshTokenRequest(
    @field:NotBlank
    val refreshToken: String
)

data class LoginResponse(
    val accessToken: String,
    val refreshToken: String,
)

data class TokenResponse(
    val accessToken: String
)
