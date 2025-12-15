async function render(cat)
{
    console.log(cat)
    let res=await fetch(`http://localhost:8080/feed/${cat}`)
    let data=await res.json()
    console.log(data)
}