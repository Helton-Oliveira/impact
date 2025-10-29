package com.digisphere.setup.file.domain

import com.digisphere.setup.config.root.BaseEntity
import com.digisphere.setup.file.enum.FileType
import com.digisphere.setup.user.domain.User
import jakarta.persistence.Entity
import jakarta.persistence.FetchType
import jakarta.persistence.ManyToOne
import jakarta.persistence.Table

@Entity
@Table(name = "adm_files")
class File(
    val name: String,
    val path: String?,
    val base64: String?,
    val type: FileType,
) : BaseEntity() {

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    var user: User? = null

}