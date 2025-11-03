package com.digisphere.setup.user.domain

import com.digisphere.setup.auth.enums.Role
import com.digisphere.setup.config.root.BaseEntity
import com.digisphere.setup.file.domain.File
import com.fasterxml.jackson.annotation.JsonIgnoreProperties
import jakarta.persistence.Entity
import jakarta.persistence.FetchType
import jakarta.persistence.OneToMany
import jakarta.persistence.Table
import java.time.Instant

@Entity
@Table(name = "usr_users")
class User : BaseEntity() {

    lateinit var firstName: String;
    lateinit var lastName: String;
    lateinit var cpf: String;
    lateinit var email: String;
    lateinit var phoneNumber: String;
    lateinit var role: Role;

    var password: String = ""
        set(value) {
            val regex = Regex("""(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&+=]).+""")
            value.takeIf { value.contains(regex) }
                ?.let { field = it }
        }

    var resetKey: String? = null;
    var resetKeyCreatedAt: Instant? = null;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "user")
    @JsonIgnoreProperties(value = ["user"])
    val files: MutableList<File>? = null

}