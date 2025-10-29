package com.digisphere.setup.user.repository

import com.digisphere.setup.user.domain.User
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param

interface UserRepository : JpaRepository<User, Long> {

    @Query(
        nativeQuery = true, //
        value = " select * from usr_users u " +//
                "   where u.email = :email  " +//
                "   and u.active = true     "
    )
    fun findByUsername(@Param("email") email: String): User?

}