async function getcookie()
{
    let res=await cookieStore.get("profile")
    return res?res.value:""
}
let uavatar=document.getElementById("uavatar")
let uname=document.getElementById("uname")
let mail=document.getElementById("mail")
let numposts=document.getElementById("numposts")
let fname=document.getElementById("fname")
let phno=document.getElementById("phno")
window.addEventListener("load",async ()=>{
   let umail=await getcookie();
   console.log(umail)
   if(umail){
   let res1=await fetch(`https://locallens-1.onrender.com/getcount/${umail}`)
   let postcount=await res1.json()
   console.log(postcount)
   let res2=await fetch(`https://locallens-1.onrender.com/profile/${umail}`)
   let prof=await res2.json()
   console.log(prof)
   phno.innerHTML=prof.phone;
   fname.innerHTML=prof.name;
   numposts.innerHTML=postcount;
   mail.innerHTML=prof.mail;
   let createduname=prof.name.split(" ")[0]+prof.id+(prof.id+14)
   uname.innerHTML=createduname;
   uavatar.innerHTML=prof.name[0]
   }else
   {
    window.location.href="landing.html"
   }

})
