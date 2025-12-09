package com.example.LocalLens;

import org.springframework.data.jpa.repository.JpaRepository;

public interface Otprepo extends JpaRepository<Otp,Long>{
      Otp findTopByMailOrderBySentAtDesc(String mail);
}
