/*
 * Create a list that holds all of your cards
 */
let icons = ['<i class="fa fa-bomb"></i>', '<i class="fa fa-bomb"></i>', ' <i class="fa fa-bolt"></i>', '<i class="fa fa-bolt"></i>',
    '<i class="fa fa-diamond"></i>', ' <i class="fa fa-diamond"></i>', '<i class="fa fa-paper-plane-o"></i>', ' <i class="fa fa-paper-plane-o"></i>',
    '<i class="fa fa-leaf"></i>', '<i class="fa fa-leaf"></i>', '<i class="fa fa-bicycle"></i>', '<i class="fa fa-bicycle"></i>', '<i class="fa fa-cube"></i>', '<i class="fa fa-cube"></i>', '<i class="fa fa-anchor"></i>', '<i class="fa fa-anchor"></i>'
];
shuffle(icons)
stars = document.querySelector('.stars');
let moves = document.querySelector('.moves')
moves.innerText = 0
let shapes = []
let solve = [];
let obj = document.querySelectorAll('.card')
shapes.push(...obj);
let counter = 0;
let cardsSolved = 0;
let body = document.getElementsByTagName('body')
let modal = document.querySelector('#exampleModal')



console.log(solve.length);
for (let i = 0; i < 16; i++) {
    shapes[i].addEventListener('click', function (e) {
        let xx = shapes[i];
        // let target = e.target.childNodes[2];
        // let xx = e.target;
        // console.log(target);
        console.log(solve.length);
        if (solve.length === 0) {
            console.log(i);
            console.log('harlolo this shit works');
        }
        if (solve.length < 2) {
            shapes[i].setAttribute('class', 'card open show');
            solve.push(xx);

            moves.innerText++;
            if (solve.length === 2) {
                let p1 = solve[0].firstElementChild.classList[1];
                let p2 = solve[1].firstElementChild.classList[1];

                if (solve[0].firstElementChild.classList[1] === solve[1].firstElementChild.classList[1]) {
                    solve[0].setAttribute('class', 'card match')
                    solve[1].setAttribute('class', 'card match')
                    console.log(shapes);
                    solve = []
                    cardsSolved++;
                    console.log(cardsSolved);
                }
                if (p1 !== p2) {
                    solve[0].setAttribute('class', 'card unmatch')
                    solve[1].setAttribute('class', 'card unmatch ')
                    setTimeout(function () {
                        solve[0].classList.remove("unmatch");
                        solve[1].classList.remove("unmatch");
                        solve = []
                    }, 500);
                }
            }
        }
        if (cardsSolved === 8) {
            setTimeout(function () {
                modal.setAttribute('style', 'display: block;')
                modal.setAttribute('class', 'modal fade show')
            }, 800);
        }

    });


}
// let fa = document.querySelectorAll('.fa')
// // let icons = []
// icons.push(...fa);
// icons.splice(0, 4);
// console.log(icons);
function merge() {
    for (let i = 0; i < shapes.length; i++) {
        shapes[i].innerHTML = icons[i];
    }
}
merge();
// // shuffle(icons);
// shuffle(shapes);
// console.log(icons);

btn = document.querySelector('.restart');
console.log(btn);
btn.addEventListener('click', function () {
    moves.innerText = 0;
    cardsSolved = 0;
    shuffle(icons);
    merge();
    for (let i = 0; shapes.length > i; i++) {
        shapes[i].setAttribute('class', 'card');
        solve = [];
    }
});

playAgainbtn = document.querySelector('.btn-primary');
console.log(playAgainbtn);
playAgainbtn.addEventListener('click', function () {
    moves.innerText = 0;
    cardsSolved = 0;
    shuffle(icons);
    merge();
    modal.setAttribute('class', 'modal fade');
    // modal.removeAttribute('style')
    modal.setAttribute('style', 'display: none;')

    for (let i = 0; shapes.length > i; i++) {
        shapes[i].setAttribute('class', 'card');
        solve = [];
    }
})






// Shuffle function from http://stackoverflow.com/a/2450976
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


// /*
//  * set up the event listener for a card. If a card is clicked:
//  *  - display the card's symbol (put this functionality in another function that you call from this one)
//  *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
//  *  - if the list already has another card, check to see if the two cards match
//  *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
//  *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
//  *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
//  *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)