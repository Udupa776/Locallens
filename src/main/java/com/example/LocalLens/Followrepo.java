package com.example.LocalLens;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.*;

public interface Followrepo extends JpaRepository<Follow,Long>{
    List<Follow> findAllByFollowMail(String mail);
}
