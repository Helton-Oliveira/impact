package com.digisphere.setup.user.extensions

import com.digisphere.setup.config.root.getAuthenticatedUsername
import com.digisphere.setup.user.domain.User
import com.digisphere.setup.user.dto.UserInput
import com.digisphere.setup.user.dto.UserOutput


fun User.toOutput(): UserOutput =
    UserOutput(
        firstName = this.firstName,
        lastName = this.lastName,
        cpf = this.cpf,
        email = this.email,
        phoneNumber = this.phoneNumber,
        role = this.role
    ).also {
        it.id = this.id;
        it.uuid = this.uuid;
        it.active = this.active;
    }

fun UserInput.toDomain(): User =
    User(
        firstName = this.firstName,
        lastName = this.lastName,
        cpf = this.cpf,
        email = this.email,
        phoneNumber = this.phoneNumber,
        resetKey = this.resetKey,
        resetKeyCreatedAt = this.resetKeyCreatedAt,
        role = this.role
    ).also { usr -> usr.takeIf { it.wasEdited() }?.audit(getAuthenticatedUsername()) }

fun User.toInput(): UserInput {
    return UserInput(
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
}
