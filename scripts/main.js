function luxrayHandler() {
    let luxray = document.getElementById('luxray');
    let food = document.getElementById('food');
    var movementInterval;
    document.querySelector(".btn").addEventListener('click', dropFood)
    
    startMoving(50,25,'main');
    startJumping();


    function dropFood() {
        if(foodExists()) {
            return;
        }
        clearInterval(movementInterval);
        food.style.left = `${Math.floor(Math.random()*150)}px`
        food.style.bottom = '150px';
        food.style.display = 'block';
        let foodPos = 150;
        let dropInterval = setInterval(() => {
            if(foodPos > 0) {
                food.style.bottom = `${foodPos}px`
                foodPos -=2;
            }
        },15);
        eatFood();
    }

    function eatFood() {
        let foodPos = parseInt(food.style.left.split('px')[0]);
        let luxPos = parseInt(luxray.style.left.split('px')[0]);
        let travelDir = -1;
        if(foodPos > luxPos) {
            travelDir = 1;
            luxray.style.transform = "scaleX(-1)";
        }else {
            luxray.style.transform = "scaleX(1)";
        }
        let goToFoodInterval = setInterval(() => {
            if(luxPos === foodPos) {
                clearInterval(goToFoodInterval);
            }
            luxray.style.left = `${luxPos}px`;
            luxPos += travelDir;
        },25)
    }

    function startMoving(currentPos = 50,speed = 25,call) {
        if(foodExists()) {
            return;
        }
        let luxDirection = Math.random() > 0.5 ? 'left' : 'right';
        if(luxDirection === 'left'){ 
            luxray.style.transform = "scaleX(1)";
        }else {
            luxray.style.transform = "scaleX(-1)";
        };
        let luxPos = currentPos;
        movementInterval = setInterval(async () => {
                if(luxPos >= 170) {
                    luxDirection = 'left';
                    luxray.style.transform = "scaleX(1)"
                }else if(luxPos <= 10) {
                    luxDirection = 'right';
                    luxray.style.transform = "scaleX(-1)";
                }
                luxray.style.left = `${luxPos}px`
                luxPos = luxDirection === 'right' ? luxPos + 2 : luxPos - 2;
     
                if(Math.random()*100 < 2) {
                    clearInterval(movementInterval);
                    wait();
                }
        
            }, speed)
    }

    function wait() {
        let currentPos = parseInt(luxray.style.left.split('px')[0]);
        let speeds = [10,25,40];
        let speed = speeds[Math.floor((Math.random()*speeds.length))]
        if(isJumping()) {
            startMoving(currentPos,speed,'wait1');
            return;
        }
        clearInterval(movementInterval);
        setTimeout(() => {
            startMoving(currentPos,speed,'wait2');
        },2000)
    }

    function startJumping() {
        setInterval(() => {
            if(Math.random()*10 > 6) {
                jump();
            }
        }, 2500)
    }

    function jump() {
        if(isJumping()) {
            return;
        }
        let height = 0;
        let dir = 'up';
        let jumpInterval = setInterval(() => {
            if (height > 25) {
                dir = 'down';
            }else if(height == 0 && dir === 'down'){
                clearInterval(jumpInterval);
            }
            luxray.style.bottom = `${height}px`
            height = dir === 'up' ? height + 2 : height - 2;
        }, 15)
        if(Math.random()*10 > 5){
            jump();
        }
    }

    function isJumping() {
        return luxray.style.bottom && luxray.style.bottom != '0px'
    }

    function foodExists() {
        return food.style.display && food.style.display != 'none';
    }
}

function main () {
    luxrayHandler();
}



main();
