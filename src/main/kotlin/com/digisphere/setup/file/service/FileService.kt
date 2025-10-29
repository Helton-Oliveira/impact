package com.digisphere.setup.file.service

import com.digisphere.setup.file.dto.FileInput
import com.digisphere.setup.file.dto.FileOutput
import com.digisphere.setup.file.extensions.toDomain
import com.digisphere.setup.file.extensions.toOutput
import com.digisphere.setup.file.repository.FileRepository
import com.digisphere.setup.user.dto.UserInput
import jakarta.transaction.Transactional
import org.springframework.stereotype.Service

@Service
@Transactional
class FileService(private val fileRepository: FileRepository) {

    fun saveFile(input: FileInput?): Result<FileOutput?> = runCatching {
        input?.toDomain()
            .takeIf { it?.wasEdited() ?: false }
            ?.let(fileRepository::save)
            ?.toOutput()
    }

    fun saveAllAndFlush(inputs: List<FileInput?>?, userInput: UserInput?) = runCatching {
        inputs?.filter { it?._edited ?: false }
            ?.map { it?.user = userInput; it }
            ?.forEach(::saveFile)
    }

}