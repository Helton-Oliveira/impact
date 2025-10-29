package com.digisphere.setup.config.root

import jakarta.persistence.*
import java.time.Instant
import java.util.*

@MappedSuperclass
class BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long? = null;
    val uuid: String = UUID.randomUUID().toString();
    var active: Boolean = true;
    private var createdAt: Instant = Instant.now();
    private var lastModifiedAt: Instant = Instant.now();
    private lateinit var deletedAt: Instant;
    private var createdBy: String? = null;
    private var lastModifiedBy: String? = null;

    @Transient
    private var _edited: Boolean = true;


    fun wasEdited(): Boolean {
        return _edited;
    }

    fun audit(username: String) {

        this.createdBy
            ?.takeIf { it.isBlank() }
            ?.let { this.createdBy = username; }

        this.createdAt
            .takeIf { !it.isDeclared(it) }
            ?.let { this.createdAt = Instant.now() }

        this.lastModifiedBy = username;
        this.lastModifiedAt = Instant.now();
    }

}