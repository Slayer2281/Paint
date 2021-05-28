let cnv = document.getElementById("canvas");//рисование         
let cnv_bg = document.getElementById("bg_layer");//задник
let ctx = cnv.getContext("2d");
let ctx_bg = cnv_bg.getContext("2d");
let color = document.getElementById("color").value;//цвет кисти
let background = document.getElementById("background");//выбор фона 
let width = 30;//толщина кисти      
let tool = "Кисточка";//инструмент
let button = document.getElementById("tool");// кнопка смены инструмента
let button_clean = document.getElementById("clean");//очистка холста

let displayWidth = cnv.clientWidth;
let displayHeight = cnv.clientHeight;
cnv.width = displayWidth;
cnv.height = displayHeight;

cnv_bg.width = displayWidth;
cnv_bg.height = displayHeight;

ctx_bg.fillStyle = background.value;
ctx_bg.fillRect(0, 0, cnv.width, cnv.height);

document.getElementById("color").oninput = function(){
    color = this.value;
}

document.getElementById("size").oninput = function(){
    width = this.value;
}

document.getElementById("save_image").onclick = function(){
    let cnv_save = document.getElementById("save_images");
    let ctx_save = cnv_save.getContext("2d");
    cnv_save.width = displayWidth;
    cnv_save.height = displayHeight;
    ctx_save.drawImage(cnv,0,0,cnv.width,cnv.height)
    ctx_save.drawImage(cnv_bg,0,0,cnv.width,cnv.height)
    let image = cnv_save.toDataURL("image/jpg");
    this.href = image;
}

cnv.onmousedown = (e) => {
    setTimeout(() => {
        cnv.onmousemove = (event) => {
            if(tool == "Кисточка")
                ctx.fillStyle = color;
            else
                ctx.fillStyle = background.value;
            ctx.fillRect(event.offsetX - width/2, event.offsetY- width/2, width, width);
        };
    }, 1);
    if(tool == "Кисточка")
            ctx.fillStyle = color;
    else
        ctx.fillStyle = background.value;
    ctx.fillRect(e.offsetX - width/2, e.offsetY- width/2, width, width);
    cnv.onmouseup = () => {
        cnv.onmousemove = null;
    };
}
cnv.ontouchmove = (event)=>{
    if(tool == "Кисточка"){
        ctx.fillStyle = color;
        ctx.fillRect(event.changedTouches[0].pageX-width/2,event.changedTouches[0].pageY-width/2, width,width); 

    }else{
        ctx.fillRect(event.changedTouches[0].pageX-width/2,event.changedTouches[0].pageY-width/2,width,width);
    };
    }


background.addEventListener('input', changeBackground);

function changeBackground(){
    ctx_bg.fillStyle = background.value;
    ctx_bg.fillRect(0, 0, cnv.width, cnv.height);
}

button.addEventListener("click", changeTool);

function changeTool(){
    let btn = document.getElementById("tool")
    if(btn.textContent == "Кисточка"){
        btn.textContent = "Ластик";
        tool = "Ластик";
    }
    else{
        btn.textContent = "Кисточка";
        tool = "Кисточка";
    }
}

button_clean.addEventListener("click",resetBackground)

function resetBackground(){
    ctx.clearRect(0,0, cnv.width, cnv.height)
}