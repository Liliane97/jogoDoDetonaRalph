const state = {

    view:{
        squares: document.querySelectorAll(".square"),
        enemy:document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
        modal :document.querySelector('.modal'),
        closer: document.querySelector(".closer"),
        title: document.querySelector("#title"),
        result: document.querySelector('#result'),
        btnStart: document.querySelector('#start'),
        newBtn: document.createElement("button"),
        btnPlay: document.querySelector("#play")
    },

    values:{
        hitPosition: 0,
        result: 0,
        curretTime : 60,
        countDownTimeId: 0,
        timerId: 0
    },
};

const playSound = (audioName) => {
    let audio = new Audio(`./src/audios/${audioName}.m4a`)
    audio.volume = 0.2
    audio.play()
}

const randomSquare = () => {

    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    })

    let randomNumber = Math.floor(Math.random() * 9 );
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy")
    state.values.hitPosition = randomSquare.id
   
}

const addListenerHitBox = () => {
   
    state.view.squares.forEach((square) =>{
        square.addEventListener("click" , () =>{
            if(square.id === state.values.hitPosition){
                state.values.result++
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound("hit");
               
            }
        })
    })
}

const  initialize = ( )=> {

    addListenerHitBox()

}

const startGame = () => {

    let actualStyle = state.view.modal.style.display

    if(actualStyle == "block") {

        state.view.modal.style.display="none"
        initialize ()
        state.values.countDownTimeId = setInterval(countDown, 1000)
        state.values.timerId = setInterval(randomSquare,1000)

    }else{

        state.view.modal.style.display="block"  
    }
}

state.view.btnStart.addEventListener('mousedown',startGame)

const closer = () => {
    state.view.modal.style.display="none"
    state.view.score.textContent="0"
    state.values.result="0"
    state.view.btnPlay.style.display = "block"
}

state.view.closer.addEventListener('click',closer)

const newGame = () => {

    if (state.view.modal.style.display === "block") {

        state.view.modal.style.display = "none";
        state.view.score.textContent="0"
        state.values.result="0"
        state.values.curretTime ="60"
        state.values.countDownTimeId = setInterval(countDown, 1000)
        state.values.timerId = setInterval(randomSquare,1000)

    } else {

        state.view.modal.style.display = "block";
    }
}

state.view.newBtn.id = "newGame"
state.view.newBtn.addEventListener("click", newGame);

const modalEndGame = () =>{
       
    state.view.modal.classList.add("modalEndGame")
    state.view.modal.style.display="block"   
    state.view.title.textContent = "Fim de jogo!!!"
    state.view.result.textContent="Sua pontuação foi: " + state.values.result 
    state.view.result.style.padding="20px" 
    state.view.btnStart.style.display="none"  
    state.view.newBtn.style.display = "flex" 
    state.view.newBtn.innerHTML = "Jogar novamente!" 
    document.querySelector('.start').appendChild( state.view.newBtn)
}

const countDown = () => {

    state.values.curretTime--;
    state.view.timeLeft.textContent = state.values.curretTime;

    if (state.values.curretTime <= 0) {

        clearInterval(state.values.countDownTimeId);
        clearInterval(state.values.timerId);
        modalEndGame()
    }
  }
state.view.btnPlay.style.display = "none"

  const playGame = () => {

        clearInterval(state.values.countDownTimeId);
        clearInterval(state.values.timerId);
        initialize ()
        state.view.score.textContent="0"
        state.values.result="0"
        state.values.curretTime ="60"
        state.values.countDownTimeId = setInterval(countDown, 1000)
        state.values.timerId = setInterval(randomSquare,1000)

  }
