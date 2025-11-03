package com.digisphere.setup.user.service

import com.digisphere.setup.config.root.extensions.applyFetches
import com.digisphere.setup.file.service.FileService
import com.digisphere.setup.mail.EmailService
import com.digisphere.setup.user.domain.UserAssociations
import com.digisphere.setup.user.dto.UserInput
import com.digisphere.setup.user.dto.UserOutput
import com.digisphere.setup.user.extensions.toDomain
import com.digisphere.setup.user.extensions.toInput
import com.digisphere.setup.user.extensions.toOutput
import com.digisphere.setup.user.repository.UserRepository
import jakarta.transaction.Transactional
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service
import org.thymeleaf.TemplateEngine
import org.thymeleaf.context.Context
import kotlin.jvm.optionals.getOrNull

@Service
@Transactional
class UserService(
    private val userRepository: UserRepository,
    private val fileService: FileService,
    private val passwordEncoder: PasswordEncoder,
    private val emailService: EmailService,
    private val templateEngine: TemplateEngine,
) {

    fun create(input: UserInput, fetches: Set<UserAssociations> = emptySet()): Result<UserOutput?> =
        runCatching {
            val editedFiles = input.files
                ?.filter { it?._edited ?: false }
                ?.takeIf { it.isNotEmpty() }

            input.apply { files = null }
                .toDomain()
                .apply { password = passwordEncoder.encode(input.password) }
                .let { userRepository.save(it) }
                .also { usr -> fileService.saveAllAndFlush(editedFiles, usr.toInput()) }
                .also { if (fetches.isNotEmpty()) it.applyFetches(fetches) }
                .toOutput()
        }

    fun getOne(id: Long, fetches: Set<UserAssociations> = emptySet()): Result<UserOutput?> =
        runCatching {
            userRepository.findById(id)
                .getOrNull()
                ?.also { if (fetches.isNotEmpty()) it.applyFetches(fetches) }
                ?.toOutput()
        }

    fun getAll(pageable: Pageable, fetches: Set<UserAssociations> = emptySet()): Result<Page<UserOutput>?> =
        runCatching {
            userRepository.findAll(pageable)
                .map { usr -> if (fetches.isNotEmpty()) usr.applyFetches(fetches); usr }
                .map { usr -> usr.toOutput() };
        }

    fun disableById(id: Long): Result<UserOutput?> =
        runCatching {
            userRepository.findById(id)
                .getOrNull()
                ?.also { it.disabled() }
                ?.let { userRepository.save(it) }
                ?.toOutput()
        }

    @Transactional
    fun requestPasswordReset(userInput: UserInput): Result<Boolean> =
        runCatching {
            val context = Context().apply {
                setVariable("user", userInput);
                setVariable("resetLink", "routerLink");
            }

            userRepository.findById(userInput.id!!).orElse(null)
                ?.also { it.generateResetKey() }
                ?.let(userRepository::save)

            emailService.sendEmail(
                from = "from",
                to = userInput.email,
                subject = "Recuperação de Senha",
                templateEngine.process("password-reset", context)
            )
        }

    fun confirmPasswordReset(userInput: UserInput): Result<Boolean?> =
        runCatching {
            userInput.toDomain()
                .takeIf { input -> input.wasEdited() && input.isResetKeyValid(input.resetKey) }
                ?.let { usr ->
                    usr.markResetKeyAsUsed();
                    usr.password = passwordEncoder.encode(userInput.password);
                    userRepository.save(usr);
                    true
                } ?: false
        }
}