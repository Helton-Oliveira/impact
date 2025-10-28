package com.digisphere.setup.config.security

import com.digisphere.setup.user.domain.User
import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.security.core.userdetails.UserDetails

class UserDetailsImpl(private val user: User?) : UserDetails {

    override fun getAuthorities(): List<GrantedAuthority?> = listOf(SimpleGrantedAuthority(user?.role?.name))

    override fun getPassword(): String? = user?.password

    override fun getUsername(): String? = user?.username
}