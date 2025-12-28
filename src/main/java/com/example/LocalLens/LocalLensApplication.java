package com.example.LocalLens;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication

public class LocalLensApplication {

	public static void main(String[] args) {

		SpringApplication.run(LocalLensApplication.class, args);
		System.out.println("Application is ready in port 8080");
		
	}
}