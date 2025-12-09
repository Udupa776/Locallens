package com.example.LocalLens;
import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.*;

@Entity
@Table(name="OTP")

public class Otp {
    
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private long otpId;

    @Column
    private long otp;

    @Column 
    private String mail;

    @Column 
    private LocalDateTime sentAt;

    @Column
    private boolean isVerified;
   
    public void setOtp(long o)
    {
        this.otp=o;
    }
    public void setSentAt(LocalDateTime d)
    {
        sentAt=d;
    }
   public void setIsVerified(boolean v)
   {
    isVerified=v;
   }
   public void setMail(String m)
   {
    this.mail=m;
   }
   public String getMail()
   {
    return mail;
   }
   public LocalDateTime getSentAt()
   {
    return sentAt;
   }
   public long getOtp()
   {
    return otp;
   }
   public boolean getIsVerified()
   {
    return isVerified;
   }
   public long getOtpId()
   {
    return otpId;
   }
}
