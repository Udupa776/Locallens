package com.example.LocalLens;

import java.util.*;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
public interface Followrepo extends JpaRepository<Follow,Long>{
    List<Follow> findAllByFollowMail(String mail);

 @Modifying
    @Transactional
    @Query("Delete from Follow f where f.followMail = :folm AND f.followingMail = :folgm")
    void Unfollow(@Param ("folm") String folm ,@Param("folgm") String folgm);
}
