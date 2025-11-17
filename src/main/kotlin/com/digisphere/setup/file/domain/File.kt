package com.digisphere.setup.file.domain

import com.digisphere.setup.Compaign.domain.Campaign
import com.digisphere.setup.config.root.BaseEntity
import com.digisphere.setup.file.enum.FileType
import com.digisphere.setup.user.domain.User
import com.fasterxml.jackson.annotation.JsonIgnoreProperties
import jakarta.persistence.*

@Entity
@Table(name = "adm_files")
class File : BaseEntity() {

    lateinit var name: String;
    var path: String? = null;
    var base64: String? = null;

    @Enumerated(EnumType.STRING)
    lateinit var type: FileType;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties(value = ["files"])
    var user: User? = null;

    @OneToOne(mappedBy = "file")
    @JsonIgnoreProperties(value = ["file"])
    var campaign: Campaign? = null;
}