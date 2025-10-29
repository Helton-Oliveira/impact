package com.digisphere.setup.user.domain

import com.digisphere.setup.auth.enums.Role
import com.digisphere.setup.config.root.BaseEntity
import com.digisphere.setup.file.domain.File
import jakarta.persistence.Entity
import jakarta.persistence.FetchType
import jakarta.persistence.OneToMany
import jakarta.persistence.Table
import org.hibernate.Hibernate
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

    var password: String = ""

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "user")
    val files: MutableList<File>? = null

    fun validatePassword(password: String): Result<Boolean> =
        runCatching {
            val regex = Regex("""(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&+=]).+""")
            password.contains(regex);
        }

    fun loadFiles(): User {
        Hibernate.initialize(files);
        return this
    }


}