package com.example.LocalLens;

import java.time.LocalDateTime;
import java.util.*;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;



import jakarta.mail.Multipart;

import org.springframework.beans.factory.annotation.Autowired;
@RestController
public class Controllers {
    
















   
	private final Signuprepo signup;

	private final Otprepo otp;
 
	private final Sendmail mail;

	private final Postrepo post;
   
	private final Commentsrepo comm;

	private final Followrepo follow;

	private StoreImg store;

	public Controllers(Signuprepo signup, Otprepo o, Sendmail mail,StoreImg img,Postrepo p,Commentsrepo comm,Followrepo f) {
		this.signup = signup;
		this.otp = o;
		this.mail = mail;
		this.store=img;
		this.post=p;
		this.comm=comm;
		this.follow=f;
	}

	// public static void main(String[] args) {

	// 	SpringApplication.run(LocalLensApplication.class, args);
	// 	System.out.println("Application is ready in port 8080");
		
	// }


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
   @GetMapping("/profile/{mail}")
   public ResponseEntity<Signup> Profile(@PathVariable String mail)
   {
	 return ResponseEntity.ok(signup.findByMail(mail));
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

	@GetMapping("/feed/{catagory}")
	public ResponseEntity<List<Post>> Feed(@PathVariable String catagory)
	{
		if(catagory.equals("All"))
		return ResponseEntity.ok(post.findAll());
		else
			return ResponseEntity.ok(post.findAllByCatagory(catagory));

	}	
	@GetMapping("/comments")
	public ResponseEntity<List<Comments>> Comment(){
        return ResponseEntity.ok(comm.findAll());
	}

	@PostMapping("/storecomment")
	public Comments StoreComm(@RequestBody Comments c)
	{
        return comm.save(c);
	}
	@DeleteMapping("/deletecomment")
	public ResponseEntity<Void> DeleteComm(@RequestParam String comment)
	{
         comm.deleteByComment(comment);
		 
			return ResponseEntity.noContent().build();

	}

	@PostMapping("/follow")
	public ResponseEntity Follow(@RequestBody Follow fo)
	{
		
		return ResponseEntity.ok(follow.save(fo));
	} 
	
	@GetMapping("/getfollowers/{fmail}")
		public ResponseEntity<List<Follow>> GetFollowers(@PathVariable String fmail)
		{
				return ResponseEntity.ok(follow.findAllByFollowMail(fmail));
		}
	@GetMapping("/getcount/{mail}")
	public long getCount(@PathVariable String mail)
	{
		return post.countByMail(mail);
	}
}
