package com.digisphere.setup.service

import com.digisphere.setup.auth.enums.Role
import com.digisphere.setup.file.dto.FileInput
import com.digisphere.setup.file.enum.FileType
import com.digisphere.setup.file.service.FileService
import com.digisphere.setup.mail.EmailService
import com.digisphere.setup.user.domain.User
import com.digisphere.setup.user.dto.UserInput
import com.digisphere.setup.user.dto.UserOutput
import com.digisphere.setup.user.repository.UserRepository
import com.digisphere.setup.user.service.UserService
import io.mockk.every
import io.mockk.mockk
import io.mockk.verify
import jakarta.transaction.Transactional
import org.assertj.core.api.Assertions.assertThat
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.data.domain.Page
import org.springframework.data.domain.PageImpl
import org.springframework.data.domain.PageRequest
import org.springframework.data.domain.Pageable
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.test.annotation.Commit
import org.thymeleaf.TemplateEngine
import java.util.*

@SpringBootTest
@Transactional
class UserServiceTest() {

    private lateinit var userService: UserService

    @Autowired
    private lateinit var userRepository: UserRepository

    @Autowired
    private lateinit var emailService: EmailService

    @Autowired
    private lateinit var engine: TemplateEngine

    private val fileService: FileService = mockk()
    private val passwordEncoder: PasswordEncoder = mockk()

    private lateinit var userInput: UserInput;
    private lateinit var fileInput: FileInput;

    @BeforeEach
    fun setup() {
        fileInput = FileInput(
            name = "testFile",
            path = "testFile.com",
            base64 = null,
            user = null,
            type = FileType.JPEG,
        ).apply {
            id = null;
            uuid = UUID.randomUUID().toString();
            _edited = true
            active = true
        }

        userInput = UserInput(
            firstName = "Tony",
            lastName = "Stark",
            password = "230ASD#:",
            cpf = "34165050008",
            email = "stark@avenger.com",
            phoneNumber = "123456789",
            role = Role.ADMIN,
            resetKey = null,
            resetKeyCreatedAt = null,
            files = mutableListOf(fileInput),
        ).apply {
            id = null;
            uuid = "8ca66331-ae12-42a5-b644-f3219dffa891";
            _edited = true;
            active = true;
        }

        userService = UserService(
            userRepository = userRepository,
            fileService = fileService,
            passwordEncoder = passwordEncoder,
            emailService = emailService,
            templateEngine = engine,
        )

        every { passwordEncoder.encode(any()) } returns "230ASD#:"
        every { fileService.saveAllAndFlush(any(), any()) } returns Result.success(Unit)
    }

    @Test
    fun `deve criar usuario e salvar um arquivo`() {
        val result = userService.create(userInput);

        verify(exactly = 1) { fileService.saveAllAndFlush(any(), any()) }

        result.onSuccess {
            assertThat(it?.id).isNotNull()
            assertThat(it?.firstName).isEqualTo("Tony")
            assertThat(it?.lastName).isEqualTo("Stark")
            assertThat(it?.cpf).isEqualTo("34165050008")
            assertThat(it?.email).isEqualTo("stark@avenger.com")
            assertThat(it?.active).isTrue()
        };
    }

    @Test
    fun `deve buscar um usuario`() {
        val savedUser = userService.create(userInput);
        var userId: Long? = null;

        savedUser.onSuccess {
            userId = it?.id
        }

        val result = userService.getOne(userId!!);

        result.onSuccess {
            assertThat(it?.id).isNotNull()
            assertThat(it?.firstName).isEqualTo("Tony")
            assertThat(it?.lastName).isEqualTo("Stark")
            assertThat(it?.cpf).isEqualTo("34165050008")
            assertThat(it?.email).isEqualTo("stark@avenger.com")
            assertThat(it?.active).isTrue()
        }
    }

    @Test
    fun `deve buscar uma lista de usuarios`() {
        val totalElements: Long = 20L;
        val pageable: Pageable = PageRequest.of(0, 10);
        val userListMock: List<User> = emptyList();
        val userOutputMOckList: List<UserOutput> = emptyList();
        val pageMocked: Page<User> = PageImpl(userListMock, pageable, totalElements);

        val result = userService.getAll(pageable);

        result.onSuccess {
            assertThat(pageMocked.totalElements).isEqualTo(totalElements)
            assertThat(it?.content).isEqualTo(userOutputMOckList);
        }
    }

    @Test
    fun `deve desativar usuario`() {
        val savedUser = userService.create(userInput);
        var result: Result<UserOutput?>? = null
        var savedUserId: Long? = null

        savedUser.onSuccess {
            result = userService.disableById(it?.id!!)
            savedUserId = it.id
        }

        result?.onSuccess {
            assertThat(it?.id).isEqualTo(savedUserId);
            assertThat(it?.active).isFalse();
        }
    }

    @Test
    @Commit
    fun `deve enviar email de reset de senha e criar a resetKey`() {
        val newUser = UserInput(
            firstName = "Steve",
            lastName = "Rogers",
            password = "230ASD#:",
            phoneNumber = "123456789",
            cpf = "34165050008",
            role = Role.ADMIN,
            email = "steve@avenger.com",
            resetKey = null,
            resetKeyCreatedAt = null,
            files = null,
        ).apply {
            id = 32L
            uuid = "287dc62e-7bfe-4e63-a827-95f5f97b9ca4"
            active = true
            _edited = true
        }
        val isRested = userService.requestPasswordReset(newUser);

        isRested.onSuccess {
            assertThat(it).isTrue();
        }

        isRested.onFailure { exception ->
            exception.printStackTrace();
        }
    }

    @Test
    @Commit
    fun `deve resetar a senha do usuario caso resetKey for valida`() {
        val getUser = userService.getOne(32L);
        var userInput: UserInput? = null

        getUser.onSuccess {
            userInput = UserInput(
                firstName = it?.firstName!!,
                lastName = it.lastName,
                password = "230ASD#:",
                cpf = it.cpf,
                email = it.email,
                phoneNumber = it.phoneNumber,
                role = it.role,
                resetKey = it.resetKey,
                resetKeyCreatedAt = it.resetKeyCreatedAt,
                files = null,
            ).apply {
                id = 32L
                uuid = "287dc62e-7bfe-4e63-a827-95f5f97b9ca4"
                active = true
                _edited = true
            }
        }

        val result = userService.confirmPasswordReset(userInput!!);

        result.onSuccess {
            assertThat(it).isTrue();
        }

    }
}