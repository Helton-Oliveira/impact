package com.digisphere.setup.service

import com.digisphere.setup.auth.dto.LoginRequest
import com.digisphere.setup.auth.service.AuthService
import com.digisphere.setup.config.security.JwtTokenUtil
import jakarta.transaction.Transactional
import org.assertj.core.api.Assertions.assertThat
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import kotlin.test.Test

@SpringBootTest
@Transactional
class AuthServiceTest() {

    @Autowired
    lateinit var jwtTokenUtil: JwtTokenUtil;

    @Autowired
    lateinit var authService: AuthService;

    @Test
    fun `deve retornar token valido caso usuario autenticado`() {
        val credentials = LoginRequest("steve@avenger.com", "230ASD#:");

        val result = authService.login(credentials);

        result.onSuccess {
            assertThat(it.token).isNotNull();
            assertThat(jwtTokenUtil.isValid(it.token)).isTrue();
        }
    }


}