var count,
    number,
    click,
    sequence = [],
    sequenceAction = [],
    currentPlayer,
    strict = false,
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
    var randomNumber = Math.floor(Math.random() * 4);
    sequence.push(square[randomNumber]);
    sequenceAction.push(actions[randomNumber]);
}

function flash(location, action) {
    var flash = 0;
    var counter = setInterval(function(x, y) {
        return function() {
            flash++;
            if (flash === 2) clearInterval(counter);
            $(x).toggleClass(y);
        }
    }(location, action), 500);
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
    }
}

function numberIncrease() {
    number++;
    console.log("number = " + number);
}

function computerFlash() {
    buildArr();
    flashArr();
    switchUser();
}

function switchUser() {
    if (currentPlayer === 'computer') {
        currentPlayer = 'human';
        userClick();
    } else if (currentPlayer === 'human') {
        currentPlayer = 'computer';
        numberIncrease();
        computerFlash();
    }
}

function startGame() {
    currentPlayer = 'computer';
    number = 1;
    $('.counter').text(twoDigits(number));
    sequence = [];
    sequenceAction = [];
    computerFlash();
}

function userClickOff() {
    $('.square').off('click');
    switchUser();
}

function strictEnable() {
       if (strict == false) {
           alert('Try last click again! Not correct pattern.')
       } else if (strict == true) {
           alert('Try again! Not correct pattern, game will start over');
           startGame();
       }
}

function userClick() {
    click = 0;
    $('.square').on('click', function() {
            if ($(this).hasClass('greenSquare') && sequence[click] == '.greenSquare') {
                flash(square[0], actions[0]);
                click++;
            } else if ($(this).hasClass('redSquare') && sequence[click] == '.redSquare') {
                flash(square[1], actions[1]);
                click++;
            } else if ($(this).hasClass('yellowSquare') && sequence[click] == '.yellowSquare') {
                flash(square[2], actions[2]);
                click++;
            } else if ($(this).hasClass('blueSquare') && sequence[click] == '.blueSquare') {
                flash(square[3], actions[3]);
                click++;
            } else {
                $('.counter').text('!!');
                strictEnable();
            }
            if (click === sequence.length && sequence.length === 20) {
                $('.counter').text('**');
                alert(winner);
            }
            else if (click === sequence.length) userClickOff();
    });
}

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
        }
    });

    /*---(dis)enables strict play---*/
    $('.strictBtn').on('click', function() {
        if (strict == false) {
            strict = true;
        } else if (strict == true) {
            strict = false;
        }
        });

});