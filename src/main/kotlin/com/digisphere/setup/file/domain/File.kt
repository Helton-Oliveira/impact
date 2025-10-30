package com.digisphere.setup.file.domain

import com.digisphere.setup.config.root.BaseEntity
import com.digisphere.setup.file.enum.FileType
import com.digisphere.setup.user.domain.User
import jakarta.persistence.*

@Entity
@Table(name = "adm_files")
class File(
    val name: String,
    val path: String?,
    val base64: String?,

    @Enumerated(EnumType.STRING)
    val type: FileType,
) : BaseEntity() {

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    var user: User? = null

}