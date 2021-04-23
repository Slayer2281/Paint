let place = document.getElementById("place")
let context = place.getContext("2d")
let color = "black"
let width =30;
let displayWidth = place.clientWidth;
let displayHeight = place.clientHeight;
place.width = displayWidth;
place.height =  displayHeight;

place.onmousedown=()=>{
    place.onmousemove=(event)=>
    {
        context.fillStyle = color;
        context.fillRect(event.offsetX-width/2,event.offsetY-width/2, width,width)
    }
    context.fillStyle = color;
        context.fillRect(event.offsetX-width/2,event.offsetY-width/2, width,width)
    place.onmouseup =() =>{
        place.onmousemove = null;
    }
}