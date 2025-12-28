package com.example.LocalLens;

import com.sendgrid.helpers.mail.Mail;
import com.sendgrid.helpers.mail.objects.Email;
import com.sendgrid.helpers.mail.objects.Content;

import com.sendgrid.SendGrid;
import com.sendgrid.Request;
import com.sendgrid.Method;
import org.springframework.stereotype.Service;
import java.io.IOException;
import org.springframework.beans.factory.annotation.Value;

@Service
public class Sendmail {
    
    @Value("${sendgrid.key}")
    private String API_KEY;

    public String sendmail(String to, String subject, String body) {
    System.out.println(API_KEY);
        Email from = new Email("smartplant777@gmail.com"); 
        Email toEmail = new Email(to);
        Content content = new Content("text/plain", body);
        Mail mail = new Mail(from, subject, toEmail, content);

        SendGrid sg = new SendGrid(API_KEY);
        Request request = new Request();

        try {
            request.setMethod(Method.POST);
            request.setEndpoint("mail/send");
            request.setBody(mail.build());
            sg.api(request);
            return "200";
        } catch (IOException e) {
            return "404 " + e.getMessage();
        }
    }
}

    