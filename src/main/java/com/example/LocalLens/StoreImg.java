package com.example.LocalLens;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.reactive.function.client.WebClient;

import jakarta.mail.Multipart;

@Service
public class StoreImg {

    @Value("${supabase.url}")
    private String url;

    @Value("${supabase.key}")
    private String key;

    @Value("${supabase.bucket}")
    private String bucket;

    private final WebClient webClient;

     public StoreImg() {
    this.webClient = WebClient.builder().build();
}

    public String upload(MultipartFile file, String path) {
           try{
               String furl =url+"/storage/v1/object/"+bucket+"/"+path;

               ByteArrayResource resource = new ByteArrayResource(file.getBytes())
               {
                @Override 
                public String getFilename()
                {
                  return file.getOriginalFilename();
                }
               };
               String res = webClient.put()
             
               .uri(furl)
               .header("Authorization", "Bearer " + key) 
               .header("Content-Type",file.getContentType())
               .bodyValue(resource)
               .retrieve()
               .bodyToMono(String.class)
               .block();

               return res;
           }
           catch(Exception e)
            {
              return "error "+e;
            }
    }
}
