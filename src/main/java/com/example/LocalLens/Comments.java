package com.example.LocalLens;

import jakarta.persistence.*;


@Entity
@Table(name="comments")
public class Comments {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private long comment_id;
    @Column
    private long post_id;
    @Column 
    private String comment ;
    @Column 
    private String name;
    public void setMail(String m)
    {
        this.name=m;
    }
    public void setComment(String s)
    {
        this.comment=s;
    }
    public void setPostId(long p)
    {
        this.post_id=p;
    }
    public String getComment()
    {
        return comment;
    }
    public String getName()
    {
        return name;
    }
    public long getCommentId()
    {
        return comment_id ;
    }
     public long getPostId()
    {
        return post_id ;
    }
   
}
