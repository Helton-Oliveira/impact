package com.digisphere.setup.file.extensions

import com.digisphere.setup.config.root.getAuthenticatedUsername
import com.digisphere.setup.file.domain.File
import com.digisphere.setup.file.dto.FileInput
import com.digisphere.setup.file.dto.FileOutput
import com.digisphere.setup.user.extensions.toDomain

fun FileInput.toDomain(): File {
    return File(
        name = this.name,
        path = this.path,
        base64 = this.base64,
        type = this.type,
    )
        .also { it.user = this.user?.toDomain() }
        .also { file -> file.takeIf { it.wasEdited() }?.audit(getAuthenticatedUsername()) }
}

fun File.toOutput(): FileOutput {
    return FileOutput(
        name = this.name,
        path = this.path,
        base64 = this.base64,
        type = this.type,
    ).also {
        it.id = this.id;
        it.uuid = this.uuid;
    }
}