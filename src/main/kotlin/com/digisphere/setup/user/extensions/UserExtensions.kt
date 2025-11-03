package com.digisphere.setup.user.extensions

import com.digisphere.setup.config.root.extensions.getAuthenticatedUsername
import com.digisphere.setup.config.root.extensions.mapIfRequested
import com.digisphere.setup.file.extensions.toOutput
import com.digisphere.setup.user.domain.User
import com.digisphere.setup.user.domain.UserAssociations
import com.digisphere.setup.user.dto.UserInput
import com.digisphere.setup.user.dto.UserOutput


fun User.toOutput(): UserOutput =
    UserOutput(
        firstName = this.firstName,
        lastName = this.lastName,
        cpf = this.cpf,
        email = this.email,
        phoneNumber = this.phoneNumber,
        role = this.role,
        files = this.mapIfRequested(UserAssociations.FILES.propertyName) { this.files?.map { it.toOutput() } },
        resetKey = this.resetKey,
        resetKeyCreatedAt = this.resetKeyCreatedAt
    ).also {
        it.id = this.id;
        it.uuid = this.uuid;
        it.active = this.active;
    }

fun UserInput.toDomain(): User =
    this.let { input ->
        User().apply {
            id = input.id
            uuid = input.uuid!!
            password = input.password
            firstName = input.firstName
            lastName = input.lastName
            cpf = input.cpf
            email = input.email
            phoneNumber = input.phoneNumber
            resetKey = input.resetKey
            resetKeyCreatedAt = input.resetKeyCreatedAt
            role = input.role
        }.also { usr ->
            usr.takeIf { it.wasEdited() }?.audit(getAuthenticatedUsername())
        }
    }

fun User.toInput(): UserInput =
    UserInput(
        firstName = this.firstName,
        lastName = this.lastName,
        password = this.password,
        cpf = this.cpf,
        email = this.email,
        phoneNumber = this.phoneNumber,
        resetKey = this.resetKey,
        resetKeyCreatedAt = this.resetKeyCreatedAt,
        role = this.role,
    ).also {
        it.id = this.id;
        it.uuid = this.uuid
    }
