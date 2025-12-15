
let ne = document.createElement("div")
let di = document.getElementById("di")
window.addEventListener("load", async () => {
    let uname = await cookieStore.get("mail")
    if (uname) {
        let res = await fetch("http://localhost:8080/feed/All")
        let data = await res.json()
        console.log(data)
        let d = {}
        let commentss = await fetch("http://localhost:8080/comments")
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

`}
        })

    }
    else {
        alert("You have to login or signup first")
        window.location.href = "landing.html"
    }
})

async function DeleteComment(comment) {
    let res = await fetch(`http://localhost:8080/deletecomment?comment=${encodeURIComponent(comment)}`, {
        method: "DELETE"
    })
    window.location.reload()
}
async function Postcommet(id) {
    console.log(id)
    let uname = await cookieStore.get("mail")
    let commentsec = document.getElementById(`commentsec-${id}`);
    let nme = "@" + uname.value.split("@")[0]
    if (commentsec.value) {
        let res = await fetch("http://localhost:8080/storecomment", {
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
    let res = await fetch(`http://localhost:8080/feed/${cat}`)
    let data = await res.json()
    console.log(data)
    let d = {}
    if (data) {
        let commentss = await fetch("http://localhost:8080/comments")
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

`}
    })

}