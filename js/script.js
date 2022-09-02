let clickIndex = []
let pairCounter = 0
var timerId
let started=false

const AddClickHandle = () => {
    let cards = document.querySelectorAll(".card");
    for (i = 0; i < cards.length; i = i + 1) {
        cards[i].addEventListener("click", Clickhandler);
    }
}

const AddClickHandleSpec = function () {
    let cards = document.querySelectorAll(".card");
    for (i = 0; i < cards.length; i = i + 1) {
        if (!clickIndex.includes(i))
            cards[i].addEventListener("click", Clickhandler);
    }
}

function removeClickHandle() {
    let cards = document.querySelectorAll(".card");
    for (i = 0; i < cards.length; i = i + 1) {
        cards[i].removeEventListener("click", Clickhandler);
    }
}

function foldBack() {
    let cards = document.querySelectorAll(".card");
    for (i = 0; i < cards.length; i = i + 1) {
        if (!clickIndex.includes(i))
            cards[i].style.backgroundColor = 'silver';
    }
    window.setTimeout(AddClickHandleSpec, 500)


}

function endFoldBack() {
    let cards = document.querySelectorAll(".card");
    for (i = 0; i < cards.length; i = i + 1) {
        if (!clickIndex.includes(i))
            cards[i].style.backgroundColor = 'silver';
    }
    window.setTimeout(shuffleLettes, 1000)
    window.setTimeout(AddClickHandleSpec, 1000)
    document.querySelector(".pairs h3").innerHTML="CLICK ANY CARD TO BEGIN"
    started=false


}

const Clickhandler = function () {
    if(!started)
    {
        startCounter()
        started=true;
    }
    

    clickIndex.unshift(parseInt(this.id) - 1)
    this.removeEventListener("click", Clickhandler)
    this.style.backgroundColor = 'red'

    if ((clickIndex.length % 2 == 0) && (clickIndex.length >= 2)) {
        removeClickHandle()
        if (letterArr[clickIndex[0]] == letterArr[clickIndex[1]]) {
            window.setTimeout(AddClickHandleSpec, 500)
            pairCounter++
            if (pairCounter == 5) {
                console.log("finish")
                clickIndex.splice(0, clickIndex.length)
                //shuffleLettes()
                window.setTimeout(endFoldBack, 5000)
                pairCounter = 0
                window.clearInterval(timerId)
            }
        }
        else {
            clickIndex.shift()
            clickIndex.shift()
            window.setTimeout(foldBack, 500)
        }
    }

}


function fyShuffle(arr) {
    let i = arr.length;
    while (--i > 0) {
        let randIndex = Math.floor(Math.random() * (i + 1));
        [arr[randIndex], arr[i]] = [arr[i], arr[randIndex]];
    }
    return arr;
}

function shuffleLettes() {
    letterArr = fyShuffle(letterArr)

    let cardH1 = document.querySelectorAll(".card h1");
    /*let cardDiv=document.getElementById("1");*/
    for (let i = 0; i < cardH1.length; i = i + 1) {
        cardH1[i].innerHTML = letterArr[i]
    }
}

function startCounter(){
const countDate = new Date();
timerId= window.setInterval(function () {
    var now = new Date().getTime();
    var distance = now - countDate;
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    document.querySelector(".pairs h3").innerHTML = minutes + "m " + seconds + "s ";
}, 1000);
}



//let letterArr = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E']
let letterArr = ["<i class='fa-solid fa-user'></i>",
                 "<i class='fa-solid fa-user'></i>",
                 "<i class='fa-solid fa-magnifying-glass'></i>",
                 "<i class='fa-solid fa-magnifying-glass'></i>",
                 "<i class='fa-solid fa-heart'></i>",
                 "<i class='fa-solid fa-heart'></i>",
                 "<i class='fa-solid fa-music'></i>",
                 "<i class='fa-solid fa-music'></i>",
                 "<i class='fa-solid fa-house'></i>",
                 "<i class='fa-solid fa-house'></i>"]

shuffleLettes()


AddClickHandle()
