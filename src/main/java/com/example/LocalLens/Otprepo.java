package com.example.LocalLens;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.*;
public interface Otprepo extends JpaRepository<Otp,Long>{
      Optional<Otp> findTopByMailOrderBySentAtDesc(String mail);
}
