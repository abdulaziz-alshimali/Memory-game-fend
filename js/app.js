// I shuffled the icons here
let icons = ['<i class="fa fa-bomb"></i>', '<i class="fa fa-bomb"></i>', ' <i class="fa fa-bolt"></i>', '<i class="fa fa-bolt"></i>',
    '<i class="fa fa-diamond"></i>', ' <i class="fa fa-diamond"></i>', '<i class="fa fa-paper-plane-o"></i>', ' <i class="fa fa-paper-plane-o"></i>',
    '<i class="fa fa-leaf"></i>', '<i class="fa fa-leaf"></i>', '<i class="fa fa-bicycle"></i>', '<i class="fa fa-bicycle"></i>', '<i class="fa fa-cube"></i>', '<i class="fa fa-cube"></i>', '<i class="fa fa-anchor"></i>', '<i class="fa fa-anchor"></i>'
];
shuffle(icons);

//declaring varibels 
let moves = document.querySelector('.moves');
moves.innerText = 0;
// this array will contain the card *not the icons*
let shapes = [];
let obj = document.querySelectorAll('.card');
shapes.push(...obj);
// this array to check if the cards or icons match
let solve = [];
//other varibels
let counter = 0;
let cardsSolved = 0;
const modal = document.querySelector('#exampleModal')
const btn = document.querySelector('.restart');
const playAgainbtn = document.querySelector('.btn-primary');
const timer = document.querySelector('.timer')
let fElm = -1;
let sElm = -2;
let start = Date.now();
let end = 0;
let mins = 0;
let init;
//the main loop that does everthing
//opens the cards
//checking if the cards match


for (let i = 0; i < shapes.length; i++) {
    shapes[i].addEventListener('click', function (e) {
        let xx = shapes[i];

        if (solve.length === 0) {
            fElm = i;
        }
        if (solve.length === 1) {
            sElm = i;
        }
        //pushing the cards to the solve array and check if its correct 
        if (solve.length < 2) {
            shapes[i].setAttribute('class', 'card open show');

            if (fElm != sElm) {
                solve.push(xx);
                moves.innerText++;
                stars();
            }

            if (solve.length === 2) {
                let p1 = solve[0].firstElementChild.classList[1];
                let p2 = solve[1].firstElementChild.classList[1];
                if (p1 === p2) {
                    solve[0].setAttribute('class', 'card match');
                    solve[1].setAttribute('class', 'card match');
                    solve = [];
                    //a checker for when the game ends
                    cardsSolved++;
                }
                if (p1 !== p2) {
                    solve[0].setAttribute('class', 'card unmatch')
                    solve[1].setAttribute('class', 'card unmatch ')
                    setTimeout(function () {
                        solve[0].classList.remove("unmatch");
                        solve[1].classList.remove("unmatch");
                        solve = [];
                    }, 400);
                }

            }

        }
        if (cardsSolved === 8) {
            end = Date.now();
            time = Math.floor((end - start) * 0.001);

            setTimeout(function () {
                timeE = document.querySelector('.timeE');
                timeE.innerHTML = time;
                modal.setAttribute('style', 'display: block;')
                modal.setAttribute('class', 'modal fade show')
            }, 500);
        }

    });


}
//this is weird i know, but i shuffled the icons and then i merged them with the cards
function merge() {
    for (let i = 0; i < shapes.length; i++) {
        shapes[i].innerHTML = icons[i];
    }
}
merge();
// the restarting feature
function restart() {
    moves.innerText = 0;
    cardsSolved = 0;
    shuffle(icons);
    merge();
    stars();
    stop(init);
    T();
    for (let i = 0; shapes.length > i; i++) {
        shapes[i].setAttribute('class', 'card');
        solve = [];
    }
}
btn.addEventListener('click', restart);

playAgainbtn.addEventListener('click', function () {
    modal.setAttribute('class', 'modal fade');
    modal.setAttribute('style', 'display: none;')
    restart();
});

// controling stars
function stars() {
    let stars = document.querySelector('.stars')
    if (moves.innerText == 0) {
        stars.innerHTML = '<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li> '
    }
    if (moves.innerText == 20) {
        stars.innerHTML = '<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li><i class="far fa-star"></i>'
    }
    if (moves.innerText == 25) {
        stars.innerHTML = '<li><i class="fa fa-star"></i></li><i class="far fa-star"></i><i class="far fa-star"></i> '
    }
    if (moves.innerText == 35) {
        stars.innerHTML = '<li><i class="far fa-star"></i></li><i class="far fa-star"></i><i class="far fa-star"></i> '
    }
}
stars();

//timer 
function T() {
    let start = Date.now();
    init = setInterval(function () {
        end = Date.now();
        time = Math.floor((end - start) * 0.001);
        if (time % 60 == 0) {
            start = Date.now();
            time = 0;
            mins++;
        }


        timer.innerHTML = mins + ':' + time;
    }, 1000);
}
T();

function stop(t) {
    clearInterval(t);
}

function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}