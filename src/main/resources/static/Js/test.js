
const ne=document.createElement("div")
let di=document.getElementById("di")
window.addEventListener("load",async ()=>
{
  let res=await fetch("http://localhost:8080/feed")
    let data=await res.json()
    console.log(data)

    data.map((k,v)=>{
        console.log(k)
        if(k["image"]){
        di.innerHTML+=`


    <!-- IMAGE -->
    <div class="ig-image">
        <img src="https://mtokaddjliauakhkgdqb.supabase.co/storage/v1/object/public/${k["image"]}" alt="">
    </div>

    <!-- ACTIONS -->
    <div class="ig-actions">
        <span>❤️  Like </span>
       <span> 💬  Comment   </span>
       <span> 🔄  Share   </span>
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


`}
    })
})