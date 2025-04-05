let game_seq = [];
let user_seq = [];
let btns = ["box1","box2","box3","box4"];

let started = false;
let level = 0;
let h2 = document.querySelector('h2');

//step1 - press any key to start the game.
document.addEventListener('keypress',function(){
    if(started == false){
        console.log("game is started");
        started = true;

        levelup();
    }
});


//step2: levelup, flash random button, innertext level1 

function btnflash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    },250);

}

function userflash(btn){
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash");
    },250);

}

function levelup(){
    user_seq = [];
    level++;
    h2.innerText = `level ${level}`;

    //random flash
    let random_idx = Math.floor(Math.random()*3);
    let randomBox = btns[random_idx];
    let randomBtn = document.querySelector(`.${randomBox}`);

    game_seq.push(randomBox);
    console.log("game sequence:",game_seq);

    btnflash(randomBtn);
}

//step3 - button event listener

function checkAns(idx){
    // console.log("current level:",level);
    if(user_seq[idx] === game_seq[idx]){
        if(user_seq.length == game_seq.length){
            setTimeout(levelup,1000);
        }
    }
    else{
        h2.innerHTML = `Game Over! Your Score was <b>${level}</b> <br> Enter any key to start...`;
        document.querySelector('body').style.backgroundColor = "red";
        setTimeout(function(){
            document.querySelector('body').style.backgroundColor = "white";
        },1000);
        reset();
        
    }

}
function btnPress(){
    let btn = this;
    userflash(btn);

    let userBox = btn.getAttribute("id");
    user_seq.push(userBox);
    console.log("user sequence: ",user_seq);


    checkAns(user_seq.length-1);
}

let allBtns = document.querySelectorAll('.btn');
for(let btn of allBtns){
    btn.addEventListener("click",btnPress);

}


//step4 : reset if not match the sequence

function reset(){
    started = false;
    game_seq = [];
    user_seq = [];
    level = 0;
}
