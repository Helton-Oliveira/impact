package com.digisphere.setup.config.security

import jakarta.servlet.FilterChain
import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.stereotype.Component
import org.springframework.web.filter.OncePerRequestFilter

@Component
class JwtAuthenticationFilter(
    private val jwtTokenUtil: JwtTokenUtil,
    private val userDetailsService: UserDetailsService,
) : OncePerRequestFilter() {


    override fun doFilterInternal(
        request: HttpServletRequest,
        response: HttpServletResponse,
        filterChain: FilterChain
    ) {

        val header = request.getHeader("Authorization")
        val token = header?.takeIf { it.startsWith("Bearer ") }?.substring(7)

        if (!token.isNullOrBlank() && jwtTokenUtil.validate(token)) {
            val username = jwtTokenUtil.extractUsername(token)
            val userDetails = userDetailsService.loadUserByUsername(username)

            val authentication = UsernamePasswordAuthenticationToken(
                userDetails,
                null,
                userDetails.authorities
            )

            SecurityContextHolder.getContext().authentication = authentication
        }

        filterChain.doFilter(request, response)
    }

    override fun shouldNotFilter(request: HttpServletRequest): Boolean {
        val path = request.requestURI
        return path.startsWith("/api/auth") || path.startsWith("/api/users")
    }
}