package com.digisphere.setup.user.domain

import com.digisphere.setup.auth.enums.Role
import com.digisphere.setup.config.root.BaseEntity
import jakarta.persistence.Entity
import jakarta.persistence.Table
import java.time.Instant

@Entity
@Table(name = "usr_users")
class User(
    val firstName: String,
    val lastName: String,
    val cpf: String,
    val email: String,
    val phoneNumber: String,
    val role: Role,
    val resetKey: String? = null,
    val resetKeyCreatedAt: Instant? = null
) : BaseEntity() {

    val username: String get() = "$firstName.$lastName";

    final var password: String = ""
        private set

    fun validatePassword(password: String): Result<Boolean> =
        runCatching {
            val regex = Regex("""(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&+=]).+""")
            password.contains(regex);
        }


}