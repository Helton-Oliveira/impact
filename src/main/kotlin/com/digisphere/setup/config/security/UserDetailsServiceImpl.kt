package com.digisphere.setup.config.security

import com.digisphere.setup.user.repository.UserRepository
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.core.userdetails.UsernameNotFoundException
import org.springframework.stereotype.Service

@Service
class UserDetailsServiceImpl(private val userRepository: UserRepository) : UserDetailsService {

    override fun loadUserByUsername(email: String): UserDetails {
        return userRepository.findByUsername(email)
            ?.let { UserDetailsImpl(it) }
            ?: throw UsernameNotFoundException("User not found")

    }
}