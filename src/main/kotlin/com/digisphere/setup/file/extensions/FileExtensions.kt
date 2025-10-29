package com.digisphere.setup.file.extensions

import com.digisphere.setup.config.root.getAuthenticatedUsername
import com.digisphere.setup.file.domain.File
import com.digisphere.setup.file.dto.FileInput
import com.digisphere.setup.file.dto.FileOutput

fun FileInput.toDomain(): File {
    return File(
        name = this.name,
        path = this.path,
        base64 = this.base64,
        type = this.type,
    )
        .apply { user = this.user }
        .also { file -> file.takeIf { it.wasEdited() }?.audit(getAuthenticatedUsername()) }
}

fun File.toOutput(): FileOutput {
    return FileOutput(
        name = this.name,
        path = this.path,
        base64 = this.base64,
        type = this.type,
    ).apply { id = this.id }
}