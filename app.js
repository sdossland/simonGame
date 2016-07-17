var count,
    number,
    clickable,
    click,
    sequence = [],
    sequenceAction = [],
    userSequence = [],
    currentPlayer,
    square = {
        0: '.greenSquare',
        1: '.redSquare',
        2: '.yellowSquare',
        3: '.blueSquare'
    },
    actions = {
        0: 'greenSquareLight',
        1: 'redSquareLight',
        2: 'yellowSquareLight',
        3: 'blueSquareLight'
    },
    winner = "Congratulations! You are a winner!";

/*---converts count to two digits---*/
function twoDigits() {
    if (number < 10) {
        count = "0" + number;
    }
}

/*---build sequence of events---*/
function buildArr() {
    //var j = sequence.length;
    //while (j <= (number - 1)) {
    var randomNumber = Math.floor(Math.random() * 4);
    sequence.push(square[randomNumber]);
    sequenceAction.push(actions[randomNumber]);
    //j++;
    //}
}

function flash(location, action) {
    var flash = 0;
    var counter = setInterval(function(x, y) {
        return function() {
            flash++;
            if (flash === 2) clearInterval(counter);
            $(x).toggleClass(y);
        }
    }(location, action), 200);
}

/*---flash sequence---*/
function flashArr() {
    for (var i = 0; i < sequence.length; i++) {
        var delay = 500 + i * 1000;
        setTimeout(
            function(x) {
                return function() {
                    flash(sequence[x], sequenceAction[x]);
                }
            }(i),
            delay
        );
        //clearInterval
    }
    //switchUser();
}

function switchUser() {
    if (currentPlayer === 'computer') {
        currentPlayer = 'human';
        //if ()
        clickable = true;
        //userClick();
    } else if (currentPlayer === 'human') {
        currentPlayer = 'computer';
        clickable = false;
        numberIncrease(); //maybe move location???

        //console.log('number = ' +number);
        //flashArr();
    }
}

function startGame() {
    currentPlayer = 'computer';
    number = 1;
    $('.counter').text(twoDigits(number));
    sequence = [];
    sequenceAction = [];
    buildArr();
    flashArr();
    switchUser();
}

function numberIncrease() {
    // if (number < 20) {
    number++;
    console.log("number = " + number);
    //} else if (number == 20) {
    //  alert(winner); 
    //}
}



function userClick() {
    click = 1;
    $('.square').on('click', function() {
        if (click < sequence.length) {
            //click++;
            //console.log("click = " + click);
            if ($(this).hasClass('greenSquare')) {
                flash(square[0], actions[0]);
                if (square[0] === sequence[(click-1)]) {
                    console.log(sequence[0]);
                    click++;
                } else {
                    var test = click - 1;
                    alert(test);
                }
            } else if ($(this).hasClass('redSquare')) {
                flash(square[1], actions[1]);
                if (square[0] === sequence[(click-1)]) {
                    click++;
                } else {
                    alert('Try again!');
                }
            } else if ($(this).hasClass('yellowSquare')) {
                flash(square[2], actions[2]);
                if (square[0] === sequence[(click-1)]) {
                    click++;
                } else {
                    alert('Try again!');
                }
            } else if ($(this).hasClass('blueSquare')) {
                flash(square[3], actions[3]);
                if (square[0] === sequence[(click-1)]) {
                    click++;
                } else {
                    alert('Try again!');
                }
            }
        } else if (click >= sequence.length) {
            //clickable = false;
            //numberIncrease();
            switchUser();
        }
    });
}

/*!!!everything checked above this line!!!*/

/*
 function advanceGame() {
 if (currentPlayer === 'computer') {
 buildArr();
 flashArr();
 switchUser();
 } else if (currentPlayer === 'human') {
 //userTurn();
 number++;
 }
 }*/

/*
 function userTurn() {
 var i=0;
 while (i<sequence.length) {
 $('.greenSquare').on('click', function() {
 $(this).addClass('greenSquareLight');
 $(this).removeClass('greenSquareLight');
 if ($(this) === sequence[i]) {
 if (sequence.length == 20) {
 alert(winner);
 } else if (i == (sequence.length-1)) {
 number++;
 buildArr();
 switchTurn();
 } else {
 i++;
 }
 }
 });
 $('.redSquare').on('click', function() {
 if ($(this) === sequence[i]) {
 if (sequence.length == 20) {
 alert(winner);
 } else if (i == (sequence.length - 1)) {
 switchTurn();
 } else {
 i++;
 }
 }
 });
 $('.yellowSquare').on('click', function() {
 if ($(this) === sequence[i]) {
 if (sequence.length == 20) {
 alert(winner);
 } else if (i == (sequence.length - 1)) {
 switchTurn;
 } else {
 i++;
 }
 }
 });
 $('.blueSquare').on('click', function() {
 if ($(this) === sequence[i]) {
 if (sequence.length == 20) {
 alert(winner);
 } else if (i == (sequence.length - 1)) {
 switchTurn();
 } else {
 i++;
 }
 }
 });
 }
 }*/

$(document).ready(function() {

    /*---turns game on and off---*/
    $('.sw-slot').on('click', function() {
        $('.switch').toggleClass('switchOn');
        if ($('.switch').hasClass('switchOn') === false) {
            $('.counter').text('--');
        }
    });

    /*---starts game---*/
    $('.startBtn').on('click', function() {
        if ($('.switch').hasClass('switchOn') === false) {
            alert('Turn the game on before proceeding!');
        } else {
            startGame();
            userClick(); //delete!! just a test!
            //console.log(currentUser);
            //alert(sequence);
        }
    });

})