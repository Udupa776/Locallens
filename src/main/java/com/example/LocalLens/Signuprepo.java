package com.example.LocalLens;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.data.jpa.repository.Modifying;  


public interface Signuprepo extends JpaRepository<Signup,Long> {
    Signup findByMail(String mail);

    @Modifying
    @Transactional
    @Query("UPDATE Signup s SET s.pass= :password WHERE mail= :email")
    int upadatePass(@Param("password") String password,@Param("email") String email);
}
