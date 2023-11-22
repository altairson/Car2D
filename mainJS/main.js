$(document).ready(function() {

    var randObjIntervalId;
    var checkColIntervalID;

    var colision_rigt = -10;
    var colision_left = 10;

    $("#colision1").change(function() {
        colision_rigt = parseFloat($("#colision1").val());
    })

    $("#colision2").change(function() {
        colision_left = parseFloat($("#colision2").val());
    })
    $("#startStop").click(function() {
        $("#mainroad").toggleClass("started");
        $("#startStop").toggleClass("stopped");
        if(!$("#startStop").hasClass("stopped")) {
                randObjIntervalId = setInterval(function() {
                checkColIntervalID = setInterval(checkCollision, 100);
                spawnRandomObject();
            }, 500);
        }
        else {
            clearInterval(randObjIntervalId);
            clearInterval(checkColIntervalID);
        }
    })

    function checkCollision() {
        let car = $("#car");
        let cars = $(".object");

        for (let i = 0; i < cars.length; i++) {
            let carRect = car[0].getBoundingClientRect();
            let objectRect = cars[i].getBoundingClientRect();

            if (
                (carRect.left + colision_left) < objectRect.right &&
                (carRect.right + colision_rigt) > objectRect.left &&
                carRect.top < objectRect.bottom &&
                carRect.bottom > objectRect.top
            ) {
                // Collision detected, handle it as needed
                console.log("Collision with object " + i);
                gameOver();
                // Add your collision logic here, such as game over or score update
            }
        }
    }

    $("#newgame").click(function () {
        $(".game-over").addClass("hidden");
        $("#startStop").click();
    });

    function gameOver() {
        $(".game-over").removeClass("hidden");
        // $(".object").removeClass("moveObject");
        $("#startStop").click();
    }


    const leftBorder = 30.5;
    const rightBorder = 64.5;
    const increment = 0.1;
    let intervalId;
    let isKeyPressed = false;
    const moveSpeed = 7; // adjust the speed as needed

    // Arrow key press events
    $(document).keydown(function(e) {
        if ((e.key === "ArrowLeft" || e.key === "ArrowRight") && !isKeyPressed) {
            isKeyPressed = true;
            intervalId = setInterval(function() {
                moveCar(e.key === "ArrowLeft" ? "left" : "right");
            }, moveSpeed);
        }
    }).keyup(function(e) {
        if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
            isKeyPressed = false;
            clearInterval(intervalId);
        }
    });

    // Mouse events
    $("#turnLeft").mousedown(function() {
        if (!isKeyPressed) {
            isKeyPressed = true;
            intervalId = setInterval(function() {
                moveCar("left");
            }, moveSpeed);
        }
    }).mouseup(function() {
        isKeyPressed = false;
        clearInterval(intervalId);
    });

    $("#turnRight").mousedown(function() {
        if (!isKeyPressed) {
            isKeyPressed = true;
            intervalId = setInterval(function() {
                moveCar("right");
            }, moveSpeed);
        }
    }).mouseup(function() {
        isKeyPressed = false;
        clearInterval(intervalId);
    });

    function moveCar(direction) {
        let car = $("#car");
        var pos = car[0].style.left.includes("%") ? parseFloat(car[0].style.left.split("%")[0]) : 47.5;

        if (direction === "left" && pos > leftBorder) {
            let newPos = (pos - increment) + "%";
            car.css("left", newPos);
        } else if (direction === "right" && pos < rightBorder) {
            let newPos = (pos + increment) + "%";
            car.css("left", newPos);
        }
    }

    function removeClass(row) { 
        let cars = $(".object");
        cars[row].classList.remove("moveObject");
        console.log("removed class " + row);

    }

    function spawnRandomObject() {
        let randRow = Math.floor(Math.random() * 6);
        let cars = $(".object");
        if(!cars[randRow].classList.contains("moveObject")) {
            cars[randRow].classList.add("moveObject");
            console.log("added class " + randRow);
            setTimeout(function() {
                removeClass(randRow);
            }, 3100);
        }
    }

    checkColIntervalID = setInterval(checkCollision, 100);


});