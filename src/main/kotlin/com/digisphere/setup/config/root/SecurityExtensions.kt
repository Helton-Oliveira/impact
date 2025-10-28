package com.digisphere.setup.config.root

import org.springframework.security.core.context.SecurityContextHolder

fun getAuthenticatedUsername(): String =
    SecurityContextHolder
        .getContext()
        .authentication
        ?.takeIf { it.isAuthenticated }
        ?.let { it.principal as String }
        ?: "system@email.com";