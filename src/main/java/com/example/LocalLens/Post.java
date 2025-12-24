package com.example.LocalLens;

import java.time.LocalDateTime;

import jakarta.persistence.*;

import java.util.*;
@Entity
@Table(name="post")
public class Post {
    
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private long post_id;
 @Column 
 private String image;
    @Column
    private LocalDateTime posted_at;
    
    @Column 
    private String caption;

    @Column
    private String tags;
    @Column 
    private String mail;
    @Column
    private String location;
    @Column 
    private String catagory;
  public void setImage(String img)
  {
    this.image=img;
  }
  public void setMail(String img)
  {
    this.mail=img;
  }
    public void setLocation(String l)
    {
        this .location=l;
    }
    public void setCaption(String l)
    {
        this .caption=l;
    }
    public void setTags(String l)
    {
        this .tags=l;
    }
    public void setCatagory(String s)
    {
        this.catagory=s;
    }
    public void setPostedAt(LocalDateTime t)
    {
        this.posted_at=t;
    }
    public String getCaption(){
        return caption;
    }
    public String getCatagory()
    {
        return catagory;
    }
    public String getLocation()
    {
        return location;
    }
    public String getTags()
    {
        return tags;
    }
    public LocalDateTime getPostedAt()
    {
        return posted_at;
    }
    public String getImage()
    {
        return image;
    }
  public long getPostId()
  {
    return post_id;
  }
  public String getMail()
  {
    return mail;
  }
}
