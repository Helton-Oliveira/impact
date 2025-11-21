package com.digisphere.setup.Compaign.domain

import com.digisphere.setup.config.root.BaseEntity
import com.digisphere.setup.enumerations.Status
import com.digisphere.setup.file.domain.File
import com.digisphere.setup.user.domain.User
import com.fasterxml.jackson.annotation.JsonIgnoreProperties
import jakarta.persistence.*
import java.time.Instant

@Entity
@Table(name = "cam_campaigns")
class Campaign : BaseEntity() {

    lateinit var name: String;
    lateinit var purpose: String;
    lateinit var expirationTime: Instant;
    var allowMoneyDonation: Boolean = false;
    var allowItemDonation: Boolean = false;

    @Enumerated(EnumType.STRING)
    lateinit var status: Status;

    @OneToOne(cascade = [CascadeType.ALL], fetch = FetchType.LAZY)
    @JoinColumn(name = "file_id", unique = true)
    @JsonIgnoreProperties(value = ["campaign"])
    lateinit var file: File;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    @JsonIgnoreProperties(value = ["compaigns"])
    var user: User? = null;

}