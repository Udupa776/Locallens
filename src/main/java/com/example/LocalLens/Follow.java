package com.example.LocalLens;
import  jakarta.persistence.*;

@Entity
@Table(name="follow")
public class Follow {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private long id;

    @Column(name="follow_mail")
    private String followMail;

    @Column(name="following_mail")
    private String followingMail;

    public void setFollowingMail(String s)
    {
        followingMail=s;
    }
    public void setFollowMail(String s)
    {
        followMail=s;
    }
    public String getFollowMail()
    {
        return followMail;
    }
    public String getFollowingMail()
    {
        return followingMail;
    }
}
