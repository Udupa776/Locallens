package com.example.LocalLens;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import jakarta.transaction.Transactional;

public interface Commentsrepo extends JpaRepository<Comments,Long>{
    @Modifying
@Transactional
@Query("DELETE FROM Comments c WHERE c.comment = :comment")
void deleteByComment(@Param("comment") String comment);


}
