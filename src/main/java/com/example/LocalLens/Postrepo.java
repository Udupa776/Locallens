package com.example.LocalLens;
import java.util.*;
import org.springframework.data.jpa.repository.JpaRepository;

public interface Postrepo extends JpaRepository<Post,Long> {
  List<Post> findAllByCatagory(String category);
}
