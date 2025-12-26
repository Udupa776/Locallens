package com.example.LocalLens;

import com.sendgrid.helpers.mail.Mail;
import com.sendgrid.helpers.mail.objects.Email;
import com.sendgrid.helpers.mail.objects.Content;

import com.sendgrid.SendGrid;
import com.sendgrid.Request;
import com.sendgrid.Method;
import org.springframework.stereotype.Service;
import java.io.IOException;

@Service
public class Sendmail {

    private static final String API_KEY = "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";

    public String sendmail(String to, String subject, String body) {

        Email from = new Email("smartplant777@gmail.com"); // must be verified in SendGrid
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

    