package com.digisphere.setup.user.domain

import com.digisphere.setup.auth.enums.Role
import com.digisphere.setup.config.root.BaseEntity
import com.digisphere.setup.file.domain.File
import com.fasterxml.jackson.annotation.JsonIgnoreProperties
import jakarta.persistence.Entity
import jakarta.persistence.FetchType
import jakarta.persistence.OneToMany
import jakarta.persistence.Table
import org.apache.commons.text.CharacterPredicates
import org.apache.commons.text.RandomStringGenerator
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
    var password: String? = null;

    var resetKey: String? = null;
    var resetKeyCreatedAt: Instant? = null;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "user")
    @JsonIgnoreProperties(value = ["user"])
    val files: MutableList<File>? = null;

    fun generateResetKey() {
        val generator = RandomStringGenerator
            .Builder()
            .withinRange('0'.code, 'z'.code)
            .filteredBy(CharacterPredicates.LETTERS, CharacterPredicates.DIGITS)
            .get();

        this.resetKey = generator.generate(20).uppercase();
        this.resetKeyCreatedAt = Instant.now();
    }

    fun isResetKeyValid(inputKey: String?): Boolean =
        this.resetKey?.takeIf { it.isNotBlank() && this.resetKeyCreatedAt != null }
            ?.let { this.resetKeyCreatedAt!!.plusSeconds(15000) }
            ?.let { expiration ->
                this.resetKey == inputKey && Instant.now().isBefore(expiration)
            } ?: false

    fun markResetKeyAsUsed() {
        this.resetKey = null;
        this.resetKeyCreatedAt = null;
    }

}