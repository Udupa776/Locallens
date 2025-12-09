package com.example.LocalLens;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class Sendmail {
    @Autowired
    private JavaMailSender mail;

public String sendmail(String to,String sub,String body)
{
    try{
        SimpleMailMessage message =new SimpleMailMessage();
        message.setFrom("smartplant777@gmail.com");
        message.setTo(to);
        message.setSubject(sub);
        message.setText(body);
       

        mail.send(message);
        return ("200");
    }
    catch(Exception error)
    {

        return ("404"+error);
    }    
}
}
