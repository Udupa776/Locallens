let mail=document.getElementById("mail")
let pass=document.getElementById("pass")
let invalidotp=document.getElementById("invalidotp")

mail.addEventListener("input",()=>
{
    invalidotp.style.display="none"
})
pass.addEventListener("input",()=>{
    invalidotp.style.display="none"
})

async function Login(e)
{
    e.preventDefault()
    console.log("clicked")
    let res=await fetch("https://locallens-1.onrender.com/checkpass",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({"mail":mail.value,"pass":pass.value})
    })
    console.log(pass.value)
    let data=await res.json()
    console.log(data)
    
    if(data===true){
        cookieStore.set({name:"mail",value:mail.value,expires:Date.now()+30*60*1000,path:"/"})
         localStorage.setItem("loggedIn",mail.value)
         localStorage.setItem("time",Date.now()+30 * 60 * 1000);
        window.location.href="test.html";
    }
    else
        invalidotp.style.display=""
}
