package com.digisphere.setup.user.service

import com.digisphere.setup.user.dto.UserInput
import com.digisphere.setup.user.dto.UserOutput
import com.digisphere.setup.user.extensions.toDomain
import com.digisphere.setup.user.extensions.toResponse
import com.digisphere.setup.user.repository.UserRepository
import jakarta.transaction.Transactional
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service

@Service
@Transactional
class UserService(
    private val userRepository: UserRepository,
    private val passwordEncoder: PasswordEncoder
) {

    fun create(input: UserInput): Result<UserOutput> = runCatching {
        input.toDomain()
            .also { it.validatePassword(input.password) }
            .let(userRepository::save)
            .toResponse()
    }
}