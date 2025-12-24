let mail=document.getElementById("mail")
let otppara=document.getElementById("otppara")
let veriform=document.getElementById("veriform")
let otpform=document.getElementById("otpform")
let pass=document.getElementById("pass")
let conpass=document.getElementById("conpass")
let wrongpass=document.getElementById("wrongpass")

// production request fetch 
//https://locallens-1.onrender.com

async function forgotpass(e)
{
    e.preventDefault()
    if(pass.value===conpass.value)
        {
    veriform.style.display=""
    otpform.style.display="none"
    otppara.innerHTML=`OTP is sent to ${mail.value}`;
    let res=await fetch("https://locallens-1.onrender.com/sendotp",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({"mail":mail.value})
    })
    
    let data=await res.json()
     console.log(data)
}
else
{
    wrongpass.style.display=""
}
}
async function Otpverification(e)
{
    e.preventDefault()
    verify.style.background = "#ddebe9ff"
    let res = await fetch("https://locallens-1.onrender.com/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ "mail": mail.value, "otp": otp.value })
    })
    let data = await res.json();
    if (data == true) {
        let res=await fetch("https://locallens-1.onrender.com/updatepass",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({"mail":mail.value,"pass":pass.value})
        })
        let data=await res.json()
        console.log(data)
        if(data===1)
            window.location.href="login.html"
        else{
            invalidotp.style.display = ""
             invalidotp.innerHTML=`Sorry!! You hven't Signup yet please SignUp first `
             
            }

        
    }
    else {
        invalidotp.style.display = ""
        verify.style.background = "#0b5ed7"
    }
}
