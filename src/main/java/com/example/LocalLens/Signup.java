package com.example.LocalLens;
import java.util.*;

import jakarta.persistence.*;

@Entity
@Table(name="signup")

public class Signup {
    
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private long id;

    @Column
    private String name;

    @Column 
    private String mail;

    @Column 
    private long phone;

    @Column
    private String pass;

    public void setPass(String p)
    {
        this.pass=p;
    }

    public void setMail(String m)
    {
        this.mail=m;
    }

    public void setPhone(long p)
    {
        this.phone=p;
    }

    public void setName(String n)
    {
        this.name=n;
    }

    public String getName()
    {
        return name;
    }
    public String getMail()
    {
        return mail;
    }
    public String getPass()
    {
        return pass;
    }
    public long getPhone()
    {
        return phone;
    }
    public long getId()
    {
        return id;
    }

}
