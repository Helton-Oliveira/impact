package com.digisphere.setup.user.service

import com.digisphere.setup.file.service.FileService
import com.digisphere.setup.user.dto.UserInput
import com.digisphere.setup.user.dto.UserOutput
import com.digisphere.setup.user.extensions.toDomain
import com.digisphere.setup.user.extensions.toInput
import com.digisphere.setup.user.extensions.toOutput
import com.digisphere.setup.user.repository.UserRepository
import jakarta.transaction.Transactional
import org.springframework.data.domain.Pageable
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service
import kotlin.jvm.optionals.getOrNull

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
            ?.takeIf { it.isNotEmpty() }

        input.apply { files = null }
            .toDomain()
            .also { it.validatePassword(input.password) }
            .apply { password = passwordEncoder.encode(input.password) }
            .let { userRepository.save(it) }
            .also { usr -> fileService.saveAllAndFlush(editedFiles, usr.toInput()) }
            .toOutput()
    }

    fun getOne(id: Long) = runCatching {
        userRepository.findById(id)
            .getOrNull()
            ?.toOutput()
    }

    fun getAll(pageable: Pageable) = runCatching {
        userRepository.findAll(pageable).map { user -> user.toOutput() };
    }

    fun disableById(id: Long) = runCatching {
        userRepository.findById(id)
            .getOrNull()
            ?.also { it.disabled() }
            ?.let { userRepository.save(it) }
            ?.toOutput()
    }
}