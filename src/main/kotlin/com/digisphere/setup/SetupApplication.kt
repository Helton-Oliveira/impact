package com.digisphere.setup

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.scheduling.annotation.EnableAsync

@SpringBootApplication
@EnableAsync
class SetupApplication

fun main(args: Array<String>) {
    runApplication<SetupApplication>(*args)
}
