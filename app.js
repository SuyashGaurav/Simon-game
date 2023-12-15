let gameSeq = []
let userSeq = []

let btns = ["red", "yellow", "purple", "green"]

let h2 = document.getElementById("start");
let started = false
let level = 0

function btnFlash(randBtn){
    return new Promise((resolve, reject) => {
        setTimeout(()=>{
            randBtn.classList.add("flash")
        }, 1000)
        setTimeout(()=>{
            randBtn.classList.remove("flash");
        }, 1400)
        setTimeout(()=>{
            resolve(1)
        }, 1500)
    })  
}

let userFlash = (randBtn) => { 
    setTimeout(()=>{
        randBtn.classList.add("user")
    }, 40)
    setTimeout(()=>{
        randBtn.classList.remove("user");
    }, 200)
}

let levelUp = async() => {
    level++
    h2.innerHTML = `Level ${level}`;
    h2.style.color = "green"

    setTimeout(() => {
        h2.style.fontSize = "24px"
    }, 200);
    setTimeout(()=>{
        h2.style.fontSize = "26px"
    }, 300)

    //random btn
    for(let i=0; i<level; i++){
        let randIndx = Math.floor(Math.random() * 4)
        let randBtn = document.getElementsByClassName(btns[randIndx])[0]
        gameSeq.push(btns[randIndx])
        await btnFlash(randBtn)
    }
}

document.addEventListener("keypress", () => {
    if(!started){
        started = true;
        document.querySelector(".start-btn").style.display = "none"
        levelUp()
    }
})

function startGame(){
    if(!started){
        started = true;
        document.querySelector(".start-btn").style.display = "none"
        levelUp()
    }
    else{
        userSeq = []
        gameSeq = []
        level = 0
        started = false
        startGame()
    }
}

function checkMatch() {
    if(userSeq[userSeq.length-1] == gameSeq[userSeq.length-1]){
        // console.log(true)
        return true
    }
    else{
        h2.innerText = `Game Over. Your score: ${level-1}`
        setTimeout(()=>{
            document.body.style.backgroundColor = "red"
            let newBtn = document.querySelector(".start-btn")
            newBtn.style.display = "block"
            newBtn.backgroundColor = "green"
            newBtn.innerText = "New Game"
        })
        setTimeout(()=>{
            document.body.style.backgroundColor = "antiquewhite"
        }, 200)
        return false
    }
}

function btnPressed() {
    let btns = this;
    userFlash(btns)
    let colorPressed = btns.getAttribute("id")
    userSeq.push(colorPressed)
    checkMatch()
    if(checkMatch() && userSeq.length == gameSeq.length){
        gameSeq = []
        userSeq = []
        setTimeout(() => {
            levelUp()
        }, 300);   
    }
}

let allBtns = document.getElementsByClassName("btn")
for(let btns of allBtns){
    btns.addEventListener('click', btnPressed)
}