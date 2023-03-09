console.log("Welcome");
let go=new Audio("go.mp3");
let music=new Audio("music.mp3");
let gameOver=new Audio("gameover.mp3");
let turn=new Audio("ting.mp3");
let sign="X";
let top1=document.getElementById("top");
let bottom=document.getElementById("bottom");
let over=false;
let click=0;
let boxes=document.getElementsByClassName("box");
let start=document.getElementById("start");
let body=document.querySelector("body");
let line=document.querySelector(".line");
let restart=false;
function change(){
    return (sign==="X"?"O":"X");
}
function checkWin(){
    let boxText=document.getElementsByClassName("textbox");
    let wins=[
        [0,1,2,0,5,0],
        [3,4,5,0,15,0],
        [6,7,8,0,25,0],
        [0,3,6,-10,15,90],
        [1,4,7,0,15,90],
        [2,5,8,10,15,90],
        [0,4,8,0,15,45],
        [2,4,6,0,15,135]
    ]
    wins.forEach(e=>{
        if(boxText[e[0]].innerHTML===boxText[e[1]].innerHTML && boxText[e[0]].innerHTML===boxText[e[2]].innerHTML && boxText[e[0]].innerHTML!==""){
            top1.innerHTML="GAME OVER";
            bottom.innerHTML=boxText[e[0]].innerHTML+" WINS"
            over=true;
            line.style.width="30vw";
            line.style.transform=`translate(${e[3]}vw,${e[4]}vw) rotate(${e[5]}deg)`;
            gameOver.play();
            body.style.backgroundColor="#e51c1c";
            setTimeout(()=>{
                music.play();
                body.style.backgroundColor="#61ffc3";

            },1000);
        }
        
        
    }
    );
    if(click===9){
        top1.innerHTML="GAME OVER";
        bottom.innerHTML="DRAW"
        gameOver.play();
        body.style.backgroundColor="#e51c1c";
        setTimeout(()=>{
            music.play();
            body.style.backgroundColor="#61ffc3";

        },1000);
    }
}

start.addEventListener("click",()=>{
    line.style.width="0";
    line.style.transform=`translate(${0}vw,${0}vw) rotate(${0}deg)`;

    go.play();
    sign="X"

    top1.innerHTML=sign+"'s Turn";
    bottom.innerHTML="";
    console.log("got click");
    if(restart){
        click=0;
        over=false;
        body.style.backgroundColor="white";
        Array.from(boxes).forEach(ele1=>{
            let text1=ele1.querySelector(".textbox");
            text1.innerHTML="";
            music.pause();
            music.currentTime=0;
        });
        
    }
    start.innerHTML="RESTART";
    Array.from(boxes).forEach(ele=>{
        console.log(ele);
        let text=ele.querySelector(".textbox");
        console.log(text);

        ele.addEventListener("click",()=>{
            console.log(click);
            restart=true;
            
            if(!over){
                
                if(text.innerHTML===""){
                    click++;
                    if(click%2===0){
                        top1.innerHTML="X's  Turn";
                        bottom.innerHTML="";
                        
                    }
                    else{
                        bottom.innerHTML="O's  Turn";
                        top1.innerHTML="";
                    }
                    text.innerHTML=sign;
                    sign=change();
                    checkWin();
                    turn.play();
                }
            }
            

        })

    })

})