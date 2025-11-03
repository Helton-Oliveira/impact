package com.digisphere.setup.user.domain

import com.digisphere.setup.config.root.AssociationFetcher


enum class UserAssociations(override val propertyName: String) : AssociationFetcher {
    FILES("files"),
}