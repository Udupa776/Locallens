let capital = document.getElementById("capital")
let small = document.getElementById("small")
let nums = document.getElementById("nums")
let splc = document.getElementById("splc")
let len = document.getElementById("len");
let pass = document.getElementById("pass");
let subbtn = document.getElementById("subbtn")
let conpass = document.getElementById("conpass")
let para = document.getElementById("para")
let fullname = document.getElementById("fullname")
let phno = document.getElementById("phno")
let mail = document.getElementById("mail")
let verify = document.getElementById("veriform")
let submitfrm = document.getElementById("submitfrm")
let otppara = document.getElementById("otppara")
let invalidotp = document.getElementById("invalidotp")
let otp = document.getElementById("otp")

function capitalCheck(str) {
    return /^[A-Z]+$/.test(str);
}

function smallCheck(str) {
    return /^[a-z]+$/.test(str);
}

function numberCheck(str) {
    return /^[0-9]+$/.test(str);
}

function SpecialCharsCheck(str) {
    return /^[^A-Za-z0-9]+$/.test(str);
}

function EmailFormatCheck(str) {
    return /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(str);
}


let s = 0, n = 0, spl = 0, l = 0, cap = 0;
pass.addEventListener("input", () => {
    for (let i = 0; i < pass.value.length; i++) {
        let str = pass.value[i]
        // console.log(pass.value[pass.value.length - 1])
        if (capitalCheck(str)) {
            cap = 1
            capital.innerHTML = "✔️";
        }
        if (numberCheck(str)) {
            n = 1;
            nums.innerHTML = "✔️";
        }
        if (smallCheck(str)) {
            s = 1
            small.innerHTML = "✔️";
        }
        if (SpecialCharsCheck(str)) {
            spl = 1
            splc.innerHTML = "✔️";
        }
        if (pass.value.length >= 8) {
            l = 1
            len.innerHTML = "✔️"
        }
        if (pass.value.length < 8) {
            l = 0
            len.innerHTML = "◯"
        }
        if (l == 1 && spl == 1 && s == 1 && n == 1 && cap == 1 && pass.value == conpass.value) {
            {

                subbtn.disabled = false;
                subbtn.style.background = "#0b5ed7"

            }

        }
        else {
            subbtn.disabled = true;
            subbtn.style.background = "#ddebe9ff"
            subbtn.style.color = "#999999ff"

        }
    }
})
conpass.addEventListener("input", () => {
    if (pass.value != conpass.value) {
        subbtn.disabled = true;
        subbtn.style.background = "#ddebe9ff"
        subbtn.style.color = "#999999ff"
        para.style.display = "";
    }
    else {
        para.style.display = "none";
        subbtn.disabled = false;
        subbtn.style.background = "#0b5ed7"
    }
})

phno.addEventListener("input", () => {
    if (phno.value.length < 10 || phno.value.length > 10)
        document.getElementById("phcheck").style.display = ""
    else
        document.getElementById("phcheck").style.display = "none"
})

async function signup(e) {
    e.preventDefault();
    console.log(e)
    subbtn.disabled = true;
    subbtn.style.background = "#ddebe9ff"
    subbtn.style.color = "#999999ff"
    try {
        submitfrm.style.display = "none"
        verify.style.display = ""
        otppara.innerHTML = `Otp is sent to ${mail.value}`
        let res = await fetch("http://localhost:8080/sendotp", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ "mail": mail.value })
        })
        console.log(res)
        let data = await res.json()
        console.log(data);

    }
    catch (error) {
        console.log("error", error);
        alert(error);
    }
}

async function Otpverification(e) {
    e.preventDefault()
    verify.style.background = "#ddebe9ff"
    let res = await fetch("http://localhost:8080/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ "mail": mail.value, "otp": otp.value })
    })
    let data = await res.json();
    if (data == true) {
        try {
            let res = await fetch("http://localhost:8080/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ "mail": mail.value, "name": fullname.value, "phone": phno.value, "pass": pass.value })
            })
            window.location.href = "test.html"
        }
        catch (error) {
            console.log("error")
        }
    }
    else {
        invalidotp.style.display = ""

    }
}