function luxrayHandler() {
    let luxray = document.getElementById('luxray');

    startMoving();
    startJumping();

     function startMoving(currentPos = 50,speed = 25) {
        let luxDirection = Math.random() > 0.5 ? 'left' : 'right';
        if(luxDirection === 'left'){ 
            luxray.style.transform = "scaleX(1)";
        }else {
            luxray.style.transform = "scaleX(-1)";
        };
        let luxPos = currentPos;
        let movementInteval = setInterval(async () => {
                if(luxPos > 170) {
                    luxDirection = 'left';
                    luxray.style.transform = "scaleX(1)"
                }else if(luxPos < 10) {
                    luxDirection = 'right';
                    luxray.style.transform = "scaleX(-1)";
                }
                luxray.style.left = `${luxPos}px`
                luxPos = luxDirection === 'right' ? luxPos + 2 : luxPos - 2;
                if(Math.random()*100 < 2) {
                    wait(movementInteval);
                }
        
            }, speed)
    }

    function wait(interval) {
        if(isJumping()) {
            return;
        }
        clearInterval(interval);
        setTimeout(() => {
            let currentPos = parseInt(luxray.style.left.split('px')[0]);
            let speeds = [10,25,40];
            let speed = speeds[Math.floor((Math.random()*speeds.length))]
            startMoving(currentPos,speed);
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
}

function main () {
    luxrayHandler();
}



main();