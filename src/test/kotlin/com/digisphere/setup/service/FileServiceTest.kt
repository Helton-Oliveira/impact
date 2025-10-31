package com.digisphere.setup.service

import com.digisphere.setup.auth.enums.Role
import com.digisphere.setup.file.dto.FileInput
import com.digisphere.setup.file.dto.FileOutput
import com.digisphere.setup.file.enum.FileType
import com.digisphere.setup.file.service.FileService
import com.digisphere.setup.user.dto.UserInput
import jakarta.transaction.Transactional
import org.assertj.core.api.Assertions.assertThat
import org.junit.jupiter.api.BeforeEach
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import java.util.*
import kotlin.test.Test

@SpringBootTest
@Transactional
class FileServiceTest() {

    @Autowired
    private lateinit var fileService: FileService;

    private lateinit var userInput: UserInput;
    private lateinit var fileInput: FileInput

    @BeforeEach
    fun setup() {
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
            files = emptyList<FileInput>().toMutableList(),
        ).apply {
            id = null;
            uuid = "8ca66331-ae12-42a5-b644-f3219dffa891";
            _edited = true;
            active = true;
        }

        fileInput = FileInput(
            name = "testFile",
            path = "testFile.com",
            base64 = null,
            user = userInput,
            type = FileType.JPEG,
        ).apply {
            id = null;
            uuid = UUID.randomUUID().toString();
            _edited = true
            active = true
        }


    }

    @Test
    fun `deve ocasionar exclusao logica do File`() {
        val savedFile = fileService.saveFile(fileInput);
        var result: Result<FileOutput?>? = null
        var fileId: Long? = null;

        savedFile.onSuccess {
            fileId = it?.id;
            result = fileService.deleteById(fileId!!);
        }

        result?.onSuccess {
            assertThat(it?.id).isEqualTo(fileId);
            assertThat(it?.active).isFalse();
        }

    }
}