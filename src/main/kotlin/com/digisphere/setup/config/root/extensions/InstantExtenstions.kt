package com.digisphere.setup.config.root.extensions

import java.time.Instant

fun Instant.isDeclared(timestamp: Instant): Boolean = timestamp.toString().isNotBlank();
