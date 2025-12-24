package com.example.LocalLens;
import java.util.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import jakarta.transaction.Transactional;

public interface Postrepo extends JpaRepository<Post,Long> {
  List<Post> findAllByCatagory(String category);

  long countByMail(String mail);

}
