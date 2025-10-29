package com.digisphere.setup.user.service

import com.digisphere.setup.file.service.FileService
import com.digisphere.setup.user.dto.UserInput
import com.digisphere.setup.user.dto.UserOutput
import com.digisphere.setup.user.extensions.toDomain
import com.digisphere.setup.user.extensions.toInput
import com.digisphere.setup.user.extensions.toResponse
import com.digisphere.setup.user.repository.UserRepository
import jakarta.transaction.Transactional
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service

@Service
@Transactional
class UserService(
    private val userRepository: UserRepository,
    private val fileService: FileService,
    private val passwordEncoder: PasswordEncoder
) {

    fun create(input: UserInput): Result<UserOutput?> = runCatching {
        val editedFiles = input.files
            ?.filter { it?._edited ?: false }
            .takeIf { it?.isNotEmpty()!! }

        input.apply { files = null }
            .toDomain()
            .also { it.validatePassword(input.password) }
            .apply { password = passwordEncoder.encode(input.password) }
            .let(userRepository::save)
            .also { usr -> fileService.saveAllAndFlush(editedFiles, usr.toInput()) }
            .toResponse()
    }
}