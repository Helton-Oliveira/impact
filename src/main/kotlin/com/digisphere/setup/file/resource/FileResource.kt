package com.digisphere.setup.file.resource

import com.digisphere.setup.file.dto.FileInput
import com.digisphere.setup.file.dto.FileOutput
import com.digisphere.setup.file.service.FileService
import jakarta.validation.Valid
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.util.UriComponentsBuilder

@RestController
@RequestMapping("api/files")
class FileResource(
    private val fileService: FileService
) {


    @PostMapping
    fun create(
        @RequestBody @Valid input: FileInput, uriBuilder: UriComponentsBuilder
    ): ResponseEntity<FileOutput> =
        fileService.saveFile(input)
            .fold(
                onFailure = { ResponseEntity.status(HttpStatus.BAD_REQUEST).build() },
                onSuccess = {
                    ResponseEntity.created(uriBuilder.path("/api/users/${it?.id}").build().toUri())
                        .body(it)
                }
            );
}