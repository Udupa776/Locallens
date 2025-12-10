package com.example.LocalLens;

import java.time.LocalDateTime;
import java.util.*;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import jakarta.mail.Multipart;

import org.springframework.beans.factory.annotation.Autowired;

@SpringBootApplication
@RestController
public class LocalLensApplication {
	private final Signuprepo signup;
	private final Otprepo otp;
	private final Sendmail mail;
	private final Postrepo post;
	private StoreImg store;

	public LocalLensApplication(Signuprepo signup, Otprepo o, Sendmail mail,StoreImg img,Postrepo p) {
		this.signup = signup;
		this.otp = o;
		this.mail = mail;
		this.store=img;
		this.post=p;
	}

	public static void main(String[] args) {

		SpringApplication.run(LocalLensApplication.class, args);
		System.out.println("Application is ready in port 8080");
		System.out.println("DB URL = " + System.getenv("URL"));
    System.out.println("DB USER = " + System.getenv("UNAME"));
    System.out.println("DB PASS EXISTS = " + (System.getenv("SUPABASE_PASS") != null));
	}

	@PostMapping("/signup")
	public Signup signUp(@RequestBody Signup sign) {
		return (signup.save(sign));
	}

	@PostMapping("/sendotp")
	public ResponseEntity<Otp> sendotp(@RequestBody Otp o) {
		Random rand = new Random();
		long n = rand.nextLong(1000, 9999);
		o.setOtp(n);
		o.setSentAt(LocalDateTime.now().plusMinutes(5));
		String sub = "This is the conformation mail from our LocalLens app\n";
		String body = "Your Signup OTP is " + n + " \n This mail is valid for 5 minutes only \n \t\t\t Thank You";
		String getmail = o.getMail();
		String res = mail.sendmail(getmail, sub, body);
		if (res == "200")
			return ResponseEntity.ok(otp.save(o));
		return ResponseEntity.notFound().build();
	}

	@PostMapping("/verify")
	public boolean Verify(@RequestBody Otp o) {
		Otp m = otp.findTopByMailOrderBySentAtDesc(o.getMail());
		if (m.getOtp() == o.getOtp())
			return true;
		else
			return false;
	}

	@PostMapping("/checkpass")
	public boolean CheckPass(@RequestBody Signup si)
	{
	    try{
		Signup s=signup.findByMail(si.getMail());
		if(s.getPass().equals(si.getPass()))
		return true;
	    else 
			return false;
		}
		catch(Exception e){
			return false;
		}
	}
	@PostMapping("/updatepass")
	public int UpdatePass(@RequestBody Signup s)
	{
		return signup.upadatePass(s.getPass(), s.getMail());
	}

	@PostMapping("/posts")
	public String Post(@RequestParam("img") MultipartFile file)
	{
		String path="posts/"+file.getOriginalFilename();
		return store.upload(file, path);
	}
	
	@PostMapping("/issue")
	public ResponseEntity<Post> Issue(@RequestBody Post p)
	{
		p.setPostedAt(LocalDateTime.now());
		return ResponseEntity.ok(post.save(p));
	}

	@GetMapping("/feed")
	public ResponseEntity<List<Post>> Feed()
	{
		return ResponseEntity.ok(post.findAll());

	}	
	
}
