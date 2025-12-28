
let ne = document.createElement("div")
let di = document.getElementById("di")

function Logout()
{
    localStorage.setItem("loggedIn","")
    window.location.href="landing.html"
}

window.addEventListener("load", async () => {
 let t=localStorage.getItem("time")
   let dif=Date.now()-t
   if(dif>0)
    localStorage.setItem("loggedIn","")
    let uname = localStorage.getItem("loggedIn")
    if (uname) {
        let res = await fetch("https://locallens-1.onrender.com/feed/All")
        let data = await res.json()
        console.log(data)
        let d = {}
        let commentss = await fetch("https://locallens-1.onrender.com/comments")
        let comentdata = await commentss.json()
        console.log(comentdata)
        for (let i = 0; i < comentdata.length; i++) {
            const postId = comentdata[i]["postId"];
            const username = comentdata[i]["name"];
            const comment = comentdata[i]["comment"];

            d[postId] ??= { "comments": [] };
            d[postId]["comments"].push({ "user": username, "comment": comment })

        }
        console.log(d)
        
        data.map((k, v) => {
            console.log(k)
            if (k["image"]) {
                di.innerHTML += `
<div class="post-header" >
  <img src="https://api.dicebear.com/7.x/personas/png?seed=${k["postId"]}" alt="User" class="post-avatar">

  <div class="post-user">
    <div class="post-name" id="post-name" onclick="profileClick('${k['mail']}')">${k["mail"].split('@')[0]}</div>
    <div class="post-time">${k["postedAt"].split('T')[0]}</div>
  </div>
   <button class="follow-btn ${k['mail']}"
         id="follow"
          onclick="follow('${k['mail']}')">
    Follow
  </button>
</div>

    <!-- IMAGE -->
    <div class="ig-image">
        <img src="https://mtokaddjliauakhkgdqb.supabase.co/storage/v1/object/public/${k["image"]}" alt="">
    </div>

    <!-- ACTIONS -->
      <div class="post-actions">
                <span onclick="toggleLike(1)" id="like-1">❤️ Like</span>
                <span onclick="toggleComments(${k['postId']})">💬 Comment</span>
                <span>🔄 Share</span>
            </div>

    <!-- LOCATION -->
    <div class="ig-location">📍 ${k["location"]}</div>

    <!-- CAPTION -->
    <div class="ig-caption">
        ${k["caption"]}
    </div>

    <!-- TAGS -->
    <div class="ig-tags">
        <span>${k["tags"]}</span>
        <span>#government</span>
    </div>

    <!-- POSTED AT -->
    <div class="ig-posted-time">
        ${k["postedAt"]}
    </div>
<div class="comment-section" id="comments-${k['postId']}">
  ${d[k['postId']]?.comments.map(c => `
        <div class="comment-item">
        <div>
            <strong>${c["user"]}</strong> ${c["comment"]} </div>
            <strong class="delcom" onclick="DeleteComment('${c['comment']}')">🗑</strong>
        </div>
    `).join("") || `<div class="comment-item">
            <strong>no comments yet</strong>
        </div>`}
     <input type="text" placeholder="Add a comment..." class="comment-input" id="commentsec-${k['postId']}">
     <button class="comment-btn" onclick="Postcommet(${k['postId']})">Post</button>
   </div>
</div>
 <br>
`}
        })
        showfollow()
        getfollowers()
      
    }
    else {
        alert("You have to login or signup first")
        window.location.href = "landing.html"
    }
})
function getcookie()
{
   let t=localStorage.getItem("time")
   let dif=Date.now()-t
   if(dif>0)
    localStorage.setItem("loggedIn","")
   let res =localStorage.getItem("loggedIn");
  return res
}
async function showfollow()
{
    let c=document.getElementsByClassName(getcookie())
    console.log(c)
    for(let i=0;i<c.length;i++)
        c[i].style.display="none"

}
async function getfollowers()
{
    
    let followmail=getcookie()
    let res=await fetch(`https://locallens-1.onrender.com/getfollowers/${followmail}`)
    let data=await res.json()
    
        for(let i=0;i<data.length;i++)
        {
            let c=document.getElementsByClassName(data[i].followingMail)
            for(let j=0;j<c.length;j++)
            {
                c[j].innerHTML="Following"
        c[j].style.background="gray";
        c[j].disabled=true
            }
        }
    
}

async function DeleteComment(comment) {
    let res = await fetch(`https://locallens-1.onrender.com/deletecomment?comment=${encodeURIComponent(comment)}`, {
        method: "DELETE"
    })
    window.location.reload()
}

async function follow(m)
{  
    
    let umail=getcookie()
    console.log(m)
    console.log(umail)
    
    let c=document.getElementsByClassName(m)
    
          if(c[0].innerText==="Follow"){
    for(let i=0;i<c.length;i++){
        c[i].innerHTML="Following"
        c[i].style.background="gray";
       
    }
    let res1=await fetch("https://locallens-1.onrender.com/follow",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({"followingMail":m,"followMail":umail})
    })
    let data1=await res1.json();
    console.log(data1)
}
else
{
    console.log("unfollow");
    for(let i=0;i<c.length;i++){
     c[i].innerHTML="Follow"
        c[i].style.background="#2750e6";
    }
    let res=await fetch ("https://locallens-1.onrender.com/unfollow",
        {
            method:"POST",
            headers:{"Content-Type":"application/json"},
             body:JSON.stringify({"followingMail":m,"followMail":umail})
        }
      
    )
      console.log(res);
}
}

async function Postcommet(id) {
    console.log(id)
    let uname = getcookie()
    let commentsec = document.getElementById(`commentsec-${id}`);
    let nme = "@" + uname.split("@")[0]
    if (commentsec.value) {
        let res = await fetch("https://locallens-1.onrender.com/storecomment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ "name": nme, "comment": commentsec.value, "postId": id })
        })
        let data = await res.json()
        console.log(data)
        window.location.reload()
    }
}

function toggleLike(id) {
    let btn = document.getElementById("like-" + id);
    btn.classList.toggle("liked");
}

// COMMENT TOGGLE
function toggleComments(id) {
    console.log(id)
    let box = document.getElementById(`comments-${id}`);
    box.style.display = box.style.display === "block" ? "none" : "block";
}

async function render(cat) {
    console.log(cat)
    let res = await fetch(`https://locallens-1.onrender.com/feed/${cat}`)
    let data = await res.json()
    console.log(data)
    let d = {}
    if (data) {
        let commentss = await fetch("https://locallens-1.onrender.com/comments")
        let comentdata = await commentss.json()
        console.log(comentdata)
        for (let i = 0; i < comentdata.length; i++) {
            const postId = comentdata[i]["postId"];
            const username = comentdata[i]["name"];
            const comment = comentdata[i]["comment"];

            d[postId] ??= { "comments": [] };
            d[postId]["comments"].push({ "user": username, "comment": comment })


        }
    }

    console.log(d)

    di.innerHTML = ""
    data.map((k, v) => {
        console.log(k)
        if (k["image"]) {
            di.innerHTML += `

    <div class="post-header" >
  <img src="https://api.dicebear.com/7.x/personas/png?seed=${k["postId"]}" alt="User" class="post-avatar">

  <div class="post-user">
    <div class="post-name" id="post-name" onclick="profileClick('${k['mail']}')">${k["mail"].split('@')[0]}</div>
    <div class="post-time">${k["postedAt"].split('T')[0]}</div>
  </div>
   <button class="follow-btn ${k['mail']}"
         id="follow"
          onclick="follow('${k['mail']}')">
    Follow
  </button>
</div>

    <!-- IMAGE -->
    <div class="ig-image">
        <img src="https://mtokaddjliauakhkgdqb.supabase.co/storage/v1/object/public/${k["image"]}" alt="">
    </div>

    <!-- ACTIONS -->
      <div class="post-actions">
                <span onclick="toggleLike(1)" id="like-1">❤️ Like</span>
                <span onclick="toggleComments(${k['postId']})">💬 Comment</span>
                <span>🔄 Share</span>
            </div>

    <!-- LOCATION -->
    <div class="ig-location">📍 ${k["location"]}</div>

    <!-- CAPTION -->
    <div class="ig-caption">
        ${k["caption"]}
    </div>

    <!-- TAGS -->
    <div class="ig-tags">
        <span>${k["tags"]}</span>
        <span>#government</span>
    </div>

    <!-- POSTED AT -->
    <div class="ig-posted-time">
        ${k["postedAt"]}
    </div>
<div class="comment-section" id="comments-${k['postId']}">
  ${d[k['postId']]?.comments.map(c => `
        <div class="comment-item">
        <div>
            <strong>${c["user"]}</strong> ${c["comment"]} </div>
            <strong class="delcom" onclick="DeleteComment('${c['comment']}')">🗑</strong>
        </div>
    `).join("") || `<div class="comment-item">
            <strong>no comments yet</strong>
        </div>`}
     <input type="text" placeholder="Add a comment..." class="comment-input" id="commentsec-${k['postId']}">
     <button class="comment-btn" onclick="Postcommet(${k['postId']})">Post</button>
   </div>
</div>
 <br>
`}
    })
showfollow();
        getfollowers();
}

async function profileClick(mail)
{
    console.log(mail)
    localStorage.setItem("fetchprofile",mail)
    window.location.href="profile.html"
}
   
