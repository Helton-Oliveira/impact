package com.digisphere.setup.file.extensions

import com.digisphere.setup.config.root.extensions.getAuthenticatedUsername
import com.digisphere.setup.file.domain.File
import com.digisphere.setup.file.dto.FileInput
import com.digisphere.setup.file.dto.FileOutput
import com.digisphere.setup.user.domain.User

fun FileInput.toDomain(): File =
    this.let { input ->
        File().apply {
            name = input.name;
            path = input.path;
            base64 = input.base64;
            type = input.type;
            user = input.user?.id?.let { userInputId -> User().apply { id = userInputId } }
        }.also { file ->
            file.takeIf { it.wasEdited() }
                ?.audit(getAuthenticatedUsername())
        }
    }

fun File.toOutput(): FileOutput =
    FileOutput(
        name = this.name,
        path = this.path,
        base64 = this.base64,
        type = this.type,
    ).also {
        it.id = this.id;
        it.uuid = this.uuid;
        it.active = this.active;
    }
