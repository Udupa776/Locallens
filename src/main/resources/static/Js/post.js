const fileInput = document.getElementById("imageInput");
const previewImage = document.getElementById("previewImage");
let loc = document.getElementById("loc")
let caption = document.getElementById("caption")
let tag = document.getElementById("tag")
let catg = document.getElementById("catg")
let postbtn=document.getElementById("postbtn")

fileInput.addEventListener("change", (e) => {
    const file = e.target.files[0];

    if (file) {
        previewImage.src = URL.createObjectURL(file);
        previewImage.style.display = "block";
        document.getElementById("upload-text").style.display = "none"
    }
});

async function Post(e) {
      e.preventDefault()
    let mail=await cookieStore.get("mail")
    let post = document.getElementById("post")
     postbtn.disabled=true;
     postbtn.style.background="#E2E0E0"
     postbtn.innerText="Posting....."
  
    const frm = new FormData(post)
    let res = await fetch("https://locallens-1.onrender.com/posts", {
        method: "POST",
        body: frm
    })
    console.log(res)
    let data = await res.text()
    console.log(data)
    let d = JSON.parse(data)
    console.log(d)    
    let key = d["Key"]
    if (key) {
        let res = await fetch("https://locallens-1.onrender.com/issue", {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ "caption": caption.value, "tags": tag.value, "location": loc.value, "image": key ,"catagory":catg.value,"mail":mail.value})
        })
        console.log(res)
        let data = await res.json()
        console.log(data)
       window.location.href='/Html/test.html';
    }


}
