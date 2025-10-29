package com.digisphere.setup.file.repository

import com.digisphere.setup.file.domain.File
import org.springframework.data.jpa.repository.JpaRepository

interface FileRepository : JpaRepository<File, Long> {
}