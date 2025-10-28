package com.digisphere.setup

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class SetupApplication

fun main(args: Array<String>) {
	runApplication<SetupApplication>(*args)
}
