package com.digisphere.setup.config.root

interface Mapper<I, D, O> {
    fun toDomain(input: I): D;
    fun toOutput(domain: D): O;
}