var context = canvas.getContext("2d");
var shape = new Object();
var smail = new Object();
var ghost = new Object();
var ghost2 = new Object();
var ghost3 = new Object();
var medication = new Object();
var clock = new Object();
var heart = new Image();
var clockImg = new Image();
var theGameIsStarted=false;
heart.src="heart-image.png";
clockImg.src="alarm-clock.png";
myMusic = new sound("mns_zelmerlw_-_heroes_evrovidenie_2015_shvecija_(zvukoff.ru).mp3");
winMusic = new sound("Queen-We-Are-The-Champions-cut.mp3");
var board;
var disq = 3;
var score;
var pac_color;
var start_time;
var time_elapsed;
var interval;
var intervalSmail;
var intervalGhost;
var intervalMedication;
var intervalStopMedication;
var whatWasBeforeG1 = 0;
var whatWasBeforeG2 = 0;
var whatWasBeforeG3 = 0;
var whatWasBeforeS = 0;
var users_arr = [];
var diraction_pacman;
var stopTheSmail = false;
var food_remain;
var secondOfGame;
var upB;
var downB;
var rightB;
var leftB;
var extraTime=0;
var ballsLeft=0

//for their test
users_arr.push('a');
users_arr.push('a');

    var contains = function(needle) {
        var findNaN = needle !== needle;
        var indexOf;
        if(!findNaN && typeof Array.prototype.indexOf === 'function') {
            indexOf = Array.prototype.indexOf;
        } else {
            indexOf = function(needle) {
                var i = -1, index = -1;
                for(i = 0; i < this.length; i++) {
                    var item = this[i];

                    if((findNaN && item !== item) || item === needle) {
                        index = i;
                        break;
                    }
                }
                return index;
            };
        }
        return indexOf.call(this, needle) > -1;
    };

    welcome(); //????????

    function checkFieldsToSubmit(){
        if($("#uname").val()==''){
            alert("userName is a required field");
            return false;
        }
        if($("#pass").val()==''){
            alert("password is a required field");
            return false;
        }
        if(contains.call(users_arr, $("#uname").val())){
            alert("This user name already exists in the system, please choose another user name");
            return false;
        }

        var check=validatePass(document.getElementById("pass").value)
        if(check=="short"){
            alert("This password address is too short");
            return false;
        }
        if(check=="invalid"){
            alert("This password address contains invalid characters");
            return false;
        }
        
        if($("#fname").val()==''){
            alert("firstName is a required field");
            return false;
        }
        var first= validateName(document.getElementById("fname").value)
        if(first=="numbers" || first=="invalid"){
            alert("your first name can not include characters that are different from letters")
            return false;
        }
        
        if($("#lname").val()==''){
            alert("lastName is a required field");
            return false;
        }

        var second= validateName(document.getElementById("lname").value)
        if(second=="numbers" || second=="invalid"){
            alert("your last name can not include characters that are different from letters")
            return false;
        }

        if($("#em").val()==''){
            alert("email is a required field");
            return false;
        }
        if(!validateEmail(document.getElementById("em").value)){
            alert("This email address is invalid");
            return false;
        }
        if($("#bd").val()==''){
            alert("birth date is a required field");
            return false;
        }
        return true;
    
    }

    function validateEmail(email) {
        var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        return emailReg.test( email );
    }
    function validateName(name) {
        var numbers =/[0-9]/;
        var letters =/[A-Za-z]/;
        var another =/[@$!%*#?&^+|/~><.'";,=/`{}]/;
        var bool1=numbers.test(name)
        var bool2=another.test(name)
        if(bool1)
            return "numbers"
        if(bool2)
            return "invalid"
    }
    function validatePass(pass) {
        console.log(pass)
        var numbers =/[0-9]/;
        var letters =/[A-Za-z]/;
        var another =/[@$!%*#?&^+|/~><.'";,=/`]/;
        var value = $("#pass").val();
        if(value.length < 8)
            return "short"
        var bool2=numbers.test(pass)
        var bool=letters.test(pass)
        var bool3=another.test(pass)
        if(bool3)
            return "invalid"
        return "good";
    }

    function drawGhost(center, color){
        context.beginPath();
        context.fillStyle = color;
        context.arc(center.x, center.y, 25, Math.PI, 0, false);
        context.moveTo(center.x-25, center.y);
        context.fill();
        context.lineTo(center.x-25, center.y+25-25/4);
        context.lineTo(center.x-25+25/3, center.y+25);
        context.lineTo(center.x-25+25/3*2, center.y+25-25/4);
        context.lineTo(center.x, center.y+25);
        context.lineTo(center.x+25/3, center.y+25-25/4);
        context.lineTo(center.x+25/3*2, center.y+25);
        context.lineTo(center.x+25, center.y+25-25/4);
        context.lineTo(center.x+25, center.y);
        context.fill();
        // EYES
        context.fillStyle = "white"; //left eye
        context.beginPath();
        context.arc(center.x-25/2.5, center.y-25/4, 25/4, 0, Math.PI*2, true); // white
        context.fill();
        context.fillStyle = "white"; //right eye
        context.beginPath();
        context.arc(center.x+25/2.5, center.y-25/4, 25/4, 0, Math.PI*2, true); // white
        context.fill();
        //mouth
        context.beginPath();
        context.lineWidth=1;
        context.moveTo(center.x-20+20/5, center.y+20/2);
        context.lineTo(center.x-20+20/3, center.y+20/4);
        context.lineTo(center.x-20+20/3*2, center.y+20/2);
        context.lineTo(center.x, center.y+20/4);
        context.lineTo(center.x+20/3, center.y+20/2);
        context.lineTo(center.x+20/3*2, center.y+20/4);
        context.lineTo(center.x+20-20/5, center.y+20/2);
        context.stroke();
        //eyeball Center
        context.fillStyle="black"; //left eyeball
        context.beginPath();
        context.arc(center.x-25/2.5, center.y-25/4, 25/7, 0, Math.PI*2, true); //black
        context.fill(); 
        context.fillStyle="black"; //right eyeball
        context.beginPath();
        context.arc(center.x+25/2.5, center.y-25/4, 25/7, 0, Math.PI*2, true); //black
        context.fill();
    }

    function drawPacman(center){
        context.beginPath();
        context.arc(center.x, center.y, 30, 0.15 * Math.PI, 1.85 * Math.PI); // half circle
        context.lineTo(center.x, center.y);
        context.fillStyle = pac_color; //color
        context.fill();
        context.beginPath();
        context.arc(center.x + 5, center.y - 15, 5, 0, 2 * Math.PI); // circle
        context.fillStyle = "black"; //color
        context.fill();
        switch(diraction_pacman){
            case 1: //up
            context.beginPath();
            context.arc(center.x, center.y, 30, 0.15 * Math.PI + Math.PI, 1.85 * Math.PI + Math.PI); // half circle
            context.lineTo(center.x, center.y);
            context.fillStyle = "rgb(4, 68, 121)"; //color
            context.fill();
            context.beginPath();
            context.arc(center.x, center.y, 30, 0.15 * Math.PI - Math.PI/2, 1.85 * Math.PI - Math.PI/2); // half circle
            context.lineTo(center.x, center.y);
            context.fillStyle = pac_color; //color
            context.fill();
            context.beginPath();
            context.arc(center.x + 15, center.y - 5, 5, 0, 2 * Math.PI); // circle
            context.fillStyle = "black"; //color
            context.fill();
            break
    
            case 2: //down
            context.beginPath();
            context.arc(center.x, center.y, 30, 0.15 * Math.PI + Math.PI, 1.85 * Math.PI + Math.PI); // half circle
            context.lineTo(center.x, center.y);
            context.fillStyle = "rgb(4, 68, 121)"; //color
            context.fill();
            context.beginPath();
            context.arc(center.x, center.y, 30, 0.15 * Math.PI + Math.PI/2, 1.85 * Math.PI + Math.PI/2); // half circle
            context.lineTo(center.x, center.y);
            context.fillStyle = pac_color; //color
            context.fill();
            context.beginPath();
            context.arc(center.x + 15, center.y + 5, 5, 0, 2 * Math.PI); // circle
            context.fillStyle = "black"; //color
            context.fill();
            break;

            case 3: //left
            context.beginPath();
            context.arc(center.x, center.y, 30, 0.15 * Math.PI, 1.85 * Math.PI); // half circle
            context.lineTo(center.x, center.y);
            context.fillStyle = "rgb(4, 68, 121)"; //color
            context.fill();
            context.beginPath();
            context.arc(center.x, center.y, 30, 0.15 * Math.PI + Math.PI, 1.85 * Math.PI + Math.PI); // half circle
            context.lineTo(center.x, center.y);
            context.fillStyle = pac_color; //color
            context.fill();
            context.beginPath();
            context.arc(center.x - 5, center.y -15, 5, 0, 2 * Math.PI); // circle
            context.fillStyle = "black"; //color
            context.fill();
            //co.arc(this.x, this.y, this.radius, 2*Math.PI-Math.PI*7/9, 2*Math.PI-Math.PI*2/9, true);
            break;

            case 4:
            context.beginPath();
            context.arc(center.x, center.y, 30, 0.15 * Math.PI, 1.85 * Math.PI); // half circle
            context.lineTo(center.x, center.y);
            context.fillStyle = pac_color; //color
            context.fill();
            context.beginPath();
            context.arc(center.x + 5, center.y - 15, 5, 0, 2 * Math.PI); // circle
            context.fillStyle = "black"; //color
            context.fill();
            break;

            default:
            break;

        }   
    }


    function drawMedication(i, j){
        context.drawImage(heart, 60 * i, 60 * j, 60, 60);
    }

    function drawClock(i, j){
        context.drawImage(clockImg, 60 * i, 60 * j, 60, 60);
    }

    function drawSmiley(center){
        context.beginPath();
        context.arc(center.x, center.y, 25, 0, Math.PI*2, true);
        context.fillStyle = "pink";
        context.fill();
        context.beginPath();
        context.arc(center.x-10, center.y-10, 5, 0, Math.PI*2, true);  
        context.fillStyle = "black";
        context.fill();
        context.beginPath();
        context.arc(center.x + 12, center.y - 10, 5, 0, Math.PI*2, true);  
        context.fillStyle = "black";
        context.fill();
        context.beginPath();
        context.arc(center.x - 10, center.y - 8, 2, 0, Math.PI*2, true);
        context.fillStyle = "white";
        context.fill();
        context.beginPath();
        context.arc(center.x + 12, center.y - 8, 2, 0, Math.PI*2, true);
        context.fillStyle = "white";
        context.fill();
        context.beginPath();
        context.lineWidth = 2;
        context.arc(center.x, center.y + 3, 17, 0, Math.PI, false);
        context.stroke();
    }

    function gameOver(){
        window.clearInterval(interval);
        window.clearInterval(intervalGhost);
        window.clearInterval(intervalMedication);  
        window.clearInterval(intervalClock);
        window.clearInterval(intervalStopMedication);
        myMusic.stop();
        theGameIsStarted=false;
        window.alert("You lost!");
    }

    function restart(){
        lblDisq.value = 3;
        window.clearInterval(interval);
        window.clearInterval(intervalGhost);
        window.clearInterval(intervalMedication);
        window.clearInterval(intervalClock);
        window.clearInterval(intervalStopMedication);
        window.clearInterval(intervalStopClock);
        stopTheSmail=false;
        theGameIsStarted=false;
        Start();
    }
    function againGhost(selectedGhost, flag){
        if(flag === -1){
            selectedGhost.i = 0;
            selectedGhost.j = 9;
        }
        if(flag === -2){
            selectedGhost.i = 9;
            selectedGhost.j = 9;
        }
        if(flag === -3){
            selectedGhost.i = 9;
            selectedGhost.j = 0;
        }
    }
    function randomPacman(){
        if(disq === 0){
            lblDisq.value = disq;
            gameOver();
        }
        var added = false;
        while(added === false){
            var y = Math.floor(Math.random() * 10);  
            var x = Math.floor(Math.random() * 10);  
            shape.i = x;
            shape.j = y;
            if(board[x][y] !== 4 && board[x][y] !== -1 && board[x][y] !== -2 && board[x][y] !== -3 && board[x][y] !== 5){
                board[x][y] = 2;
                added = true;
            }
        }
    }
    //**********
    function random(){
        firstColor.value = getRandomColor();
        secondColor.value = getRandomColor();
        thirdColor.value = getRandomColor();
        down.value = "ArrowDown"; 
        up.value = "ArrowUp"; 
        right.value = "ArrowRight"; 
        left.value = "ArrowDown"; 
        var random = Math.random();
        //random balls
        while(random < 10)
            random = random * 10
        random = parseInt(random);
        if (random < 50) 
            ballsNum.value = 50; 
        if(random > 90)
            ballsNum.value = 90; 
        if(50 <= random && random <= 90)
            ballsNum.value = random;
        //random time
        random = Math.random();
        while(random < 10)
            random = random * 10
        random = parseInt(random);
        seconds.value = random + 60; 
        //random ghost
        var random = Math.random();
        while(random < 10)
            random = random * 10
        random = parseInt(random);
        if (random < 33)
            monsters.value = 1; 
        if (random >= 33 && random < 66)
            monsters.value = 2;  
        if (random >= 66)
            monsters.value = 3;  
    }

    function checkParameters(){
        if(document.getElementById("firstColor").value.length === 0 || document.getElementById("secondColor").value.length===0 ||
        document.getElementById("thirdColor").value.length===0 || document.getElementById("up").value.length===0 ||
        document.getElementById("down").value.length===0 || document.getElementById("right").value.length===0 ||
        document.getElementById("left").value.length===0 || document.getElementById("seconds").value.length===0 ||
        document.getElementById("monsters").value.length===0 || document.getElementById("ballsNum").value.length===0 ){
            window.alert("Please select the values ​​for all variables or click on a Random button")
            return;
        }
        if(document.getElementById("ballsNum").value<50 || document.getElementById("ballsNum").value>90){
            window.alert("The number of balls possible is between 60 and 90")
            return;
        }
        if(document.getElementById("seconds").value<60){
            window.alert("The minimum game time is 60")
            return;
        }
        if(document.getElementById("monsters").value<1 || document.getElementById("monsters").value>3){
            window.alert("The number of monsters possible is 1, 2 or 3")
            return;
        }
        myMusic.stop();
        Start();
    }

    function Start() {
        var w = document.getElementById("game");
        w.style.display = "block";
        var y = document.getElementById("welcome");
        y.style.display = "none";
        var x = document.getElementById("login");
        x.style.display = "none";
        var z = document.getElementById("signUp");
        z.style.display = "none";
        var k = document.getElementById("setting");
        k.style.display = "none";
        board = new Array();
        score = 0;
        disq = 3;
        pac_color = "yellow";
        var cnt = 100;
        var pacmanAdded = false;
        var pacman_remain = 1;  
        secondOfGame=document.getElementById("seconds").value;
        food_remain = document.getElementById("ballsNum").value;
        ballsLeft=food_remain;
        var firstCounter = Math.floor(food_remain*0.1);
        var secondCounter = Math.floor( food_remain*0.3);
        var thirdCounter = food_remain - firstCounter - secondCounter;
        start_time = new Date();
        theGameIsStarted=true;
        medication.i = 0;
        medication.j = 0;
        clock.i = 0;
        clock.j = 0;
        for (var i = 0; i < 10; i++) {
            board[i] = new Array();
            //put obstacles in (i=3,j=3) and (i=3,j=4) and (i=3,j=5), (i=6,j=1) and (i=6,j=2)
            for (var j = 0; j < 10; j++) {
                if ((i === 3 && j === 3) || (i === 3 && j === 4) || (i === 3 && j === 5) || (i === 6 && j === 1) || (i === 6 && j === 2)) {
                    board[i][j] = 4;
                }
                else if((i===0 && j===0)|| (i===0 && j===9)|| (i===9 && j===0)|| (i===9 && j===9)){
                    continue;
                }
                else {
                    var randomNum = Math.random();
                    if (randomNum <= 1.0 * food_remain / cnt) {   
                        var toReturn = putBall(i, j, firstCounter, secondCounter, thirdCounter);
                        if(toReturn === "first")
                            firstCounter--;
                        if(toReturn === "second")
                            secondCounter--;
                        if(toReturn === "third")
                            thirdCounter--;
                        food_remain--;       
                    } else if (randomNum < 1.0 * (pacman_remain + food_remain) / cnt) {
                        shape.i = i;
                        shape.j = j;
                        pacman_remain--;
                        board[i][j] = 2;
                        pacmanAdded=true;
                    } else {
                        board[i][j] = 0;
                    }
                    cnt--;
                }
            }
        }
        initGhost();
       
        if(pacmanAdded === false){
            var emptyCell = findRandomEmptyCell(board);
            board[emptyCell[0]][emptyCell[1]] = 2;
            shape.i = emptyCell[0];
            shape.j = emptyCell[1];
        }
        while (food_remain > 0) {
            var emptyCell = findRandomEmptyCell(board);
            var toReturn = putBall(emptyCell[0], emptyCell[1], firstCounter, secondCounter, thirdCounter);
            if(toReturn === "first")
                firstCounter--;
            if(toReturn === "second")
                secondCounter--;
            if(toReturn === "third")
                thirdCounter--;
            food_remain--;
        }
        keysDown = {};
        addEventListener("keydown", function (e) {
            keysDown[e.code] = true;
        }, false);
        addEventListener("keyup", function (e) {
            keysDown[e.code] = false;
        }, false);
        interval = setInterval(UpdatePosition, 200);
        //intervalSmail = setInterval(moveSmail, 550);
        intervalGhost = setInterval(moveAllGhousts, 400);
        //intervalGhost = setInterval(moveGhost, 250);
        intervalMedication = setInterval(addMedication, 14000);
        intervalStopMedication = setInterval(stopMedication, 16000);
        intervalClock = setInterval(addClock, 15000);
        intervalStopClock = setInterval(stopClock, 17000);
        myMusic.stop();
        myMusic = new sound("mns_zelmerlw_-_heroes_evrovidenie_2015_shvecija_(zvukoff.ru).mp3");
        myMusic.play(); 
    }

    function initGhost(){
        console.log(monsters.value);
        if(monsters.value >= 1){
            board[0][9] = -1;
            ghost.i = 0;
            ghost.j = 9;
        }
        if(monsters.value >= 2){
            board[9][9] = -2;
            ghost2.i = 9;
            ghost2.j = 9;
        }
        if(monsters.value >= 3){
            board[9][0] = -3;
            ghost3.i = 9;
            ghost3.j = 0;
        }
        board[0][0]=5;
        smail.i=0;
        smail.j=0;
    }

    function stopMedication(){
        board[medication.i][medication.j]=0;
    }

    function stopClock(){
        board[clock.i][clock.j]=0;
    }

    function addMedication(){
        var finish = false;
        while(finish === false){
            var i = Math.floor(Math.random() * 10);
            var j = Math.floor(Math.random() * 10);
            if(board[i][j] != 2 && board[i][j] != 5 && board[i][j] != -1 && board[i][j] != -2 && board[i][j] != -3 
                && board[i][j] != 8 && board[i][j] != 9 && board[i][j] != 10 && board[i][j] != 4 && board[i][j] != 30){
                if(board[medication.i][medication.j] === 20){
                    board[medication.i][medication.j] = 0;
                }
                board[i][j] = 20;
                medication.i = i;
                medication.j = j;
                finish = true;
            }
        }
    }

    function addClock(){
        var finish = false;
        while(finish === false){
            var i = Math.floor(Math.random() * 10);
            var j = Math.floor(Math.random() * 10);
            if(board[i][j] != 2 && board[i][j] != 5 && board[i][j] != -1 && board[i][j] != -2 && board[i][j] != -3 
                && board[i][j] != 8 && board[i][j] != 9 && board[i][j] != 10 && board[i][j] != 4 && board[i][j] != 20){
                if(board[clock.i][clock.j] === 30){
                    board[clock.i][clock.j] = 0;
                }
                board[i][j] = 30;
                clock.i = i;
                clock.j = j;
                finish = true;
            }
        }
    }

    function putBall(i, j, firstCounter, secondCounter, thirdCounter){

        var random = Math.floor(Math.random() * (10 - 1) ) + 1;
        if(random < 4){
            if(firstCounter > 0){
                board[i][j] = 8;
                return "first";
            }
            else{
                random = Math.floor(Math.random() * (10 - 0) ) + 0;
                if(random < 5){
                    if(secondCounter > 0){
                    board[i][j] = 9;
                    return "second";
                    }
                    else{
                        board[i][j] = 10;
                        return "third"
                    }
                }
                else{
                    if(thirdCounter >0){
                    board[i][j] = 10;
                    return "third";
                    }
                    else{
                        board[i][j] = 9;
                        return "second"
                    }
                }
            }
        }

        if(4 <= random && random < 7){
            if(secondCounter > 0){
                board[i][j] = 9;
                return "second";
            }
            else{
                random = Math.floor(Math.random() * (10 - 0) ) + 0;
                //console.log(random+" seconddddddddddddd")
                if(random < 5){
                    if(thirdCounter > 0){
                    board[i][j] = 10;
                    return "third";
                    }
                    else{
                        board[i][j] = 8;
                        return "first"
                    }
                }
                else{
                    if(firstCounter > 0){
                    board[i][j] = 8;
                    return "first";
                    }
                    else{
                        board[i][j] = 10;
                        return "third"
                    }
                }
            }
        }
        if(7 <= random && random < 10){
            if(thirdCounter > 0){
                board[i][j] = 10;
                return "third";
            }
            else{
                random = Math.floor(Math.random() * (10 - 0) ) + 0;
                //console.log(random+" thirdddddddddddddddd")
                if(random < 5){
                    if(firstCounter > 0){
                    board[i][j] = 8;
                    return "first";
                    }
                    else{
                        board[i][j] = 9;
                        return "second"
                    }
                }
                else{
                    if(secondCounter > 0){
                    board[i][j] = 9;
                    return "second";
                    }
                    else{
                        board[i][j] = 8;
                        return "first"
                    }
                }
            }
        }
    }

    function stopMusic(){
        myMusic.stop();
    }

    function playMusic(){
        myMusic.play();
    }

    function sound(src) {
        this.sound = document.createElement("audio");
        this.sound.src = src;
        this.sound.setAttribute("preload", "auto");
        this.sound.setAttribute("controls", "none");
        this.sound.style.display = "none";
        document.body.appendChild(this.sound);
            this.play = function(){
                this.sound.play();
            }
            this.stop = function(){
                this.sound.pause();
            }    
    }

    function start_game(){
        var name = document.getElementById("userid").value;
        lblName.value=name;
        var password = document.getElementById("psw").value;
        if(contains.call(users_arr, name)){
            var index = users_arr.indexOf(name);
            if(users_arr[index + 1] == password){
                //console.log("user name: " + users_arr[index] + "paa: " + users_arr[index + 1]);
                setting();
            }
            else{
                alert("password incorrect");
            }
        }
        else{
            alert("user name not exist. Please sign up first");
        }
        var doc_val_check =$("#userid").val(doc_val_check);
        if (doc_val_check.length) {
            doc_val_check = ""; 
        }
        var doc_val_check =$("#psw").val(doc_val_check);
        if (doc_val_check.length) {
            doc_val_check = ""; 
        }
    }

    function isValidPos(i, j, flag){
        if( i > 9 || i < 0 || j > 9 || j < 0)
            return false;
        if(flag === -1 && (board[i][j] === -2 ||  board[i][j] === -3 ))
            return false; 
        if(flag === -2 && (board[i][j] === -1 ||  board[i][j] === -3))
            return false; 
        if(flag === -3 && (board[i][j] === -1  ||  board[i][j] === -2 ))
            return false; 
        if(board[i][j] === 4 ||  board[i][j] === 5 || board[i][j] === 20 || board[i][j] === 30)
            return false;
        else
            return true;
    }

    function moveGhost(selectedGhost, flag){
        var whatWasBefore = 0;
        if(flag === -1){
            board[9][0] = 0;
            board[selectedGhost.i][selectedGhost.j] = whatWasBeforeG1;
        }
        else if(flag === -2){
            board[9][9] = 0;
            board[selectedGhost.i][selectedGhost.j] = whatWasBeforeG2;
        }
        else if(flag === -3){
            board[0][9] = 0;
            board[selectedGhost.i][selectedGhost.j] = whatWasBeforeG3;
        }
        var dis_up = Infinity;
        var dis_down = Infinity;
        var dis_right = Infinity;
        var dis_left = Infinity;
        if(isValidPos(selectedGhost.i - 1, selectedGhost.j, flag))
            dis_up = Math.sqrt(Math.pow(shape.i - (selectedGhost.i-1), 2) + Math.pow(shape.j - selectedGhost.j, 2));
        if(isValidPos(selectedGhost.i + 1, selectedGhost.j, flag))
            dis_down = Math.sqrt(Math.pow(shape.i - (selectedGhost.i+1), 2) + Math.pow(shape.j - selectedGhost.j, 2));
        if(isValidPos(selectedGhost.i, selectedGhost.j + 1, flag))
            dis_right = Math.sqrt(Math.pow(shape.i - selectedGhost.i, 2) + Math.pow(shape.j - (selectedGhost.j + 1), 2));
        if(isValidPos(selectedGhost.i, selectedGhost.j - 1, flag))
            dis_left = Math.sqrt(Math.pow(shape.i - selectedGhost.i, 2) + Math.pow(shape.j - (selectedGhost.j - 1), 2));
        
        //console.log(dis_up + " " + dis_down + " " + dis_left + " " + dis_right);
        if(dis_up === 0 || dis_down === 0 || dis_left === 0 || dis_right === 0){
            board[shape.i][shape.j] = 0;
            disq--;
            score=score-10;
            randomPacman();
            againGhost(selectedGhost, flag);
        }
        if(Math.min(dis_up, dis_down, dis_left, dis_right) === dis_up){
            whatWasBefore = board[selectedGhost.i-1][selectedGhost.j];
            selectedGhost.i--;
        }else if(Math.min(dis_up, dis_down, dis_left, dis_right) === dis_down){
            whatWasBefore = board[selectedGhost.i+1][selectedGhost.j];
            selectedGhost.i++;
        }else if(Math.min(dis_up, dis_down, dis_left, dis_right) === dis_left){
            whatWasBefore = board[selectedGhost.i][selectedGhost.j-1];
            selectedGhost.j--;
        }else{ //right
            whatWasBefore = board[selectedGhost.i][selectedGhost.j+1];
            selectedGhost.j++;
        }

        if(flag === -1)
            whatWasBeforeG1 = whatWasBefore;
        else if(flag === -2)
            whatWasBeforeG2 = whatWasBefore;
        else if(flag === -3)
            whatWasBeforeG3 = whatWasBefore;

        board[selectedGhost.i][selectedGhost.j] = flag;

    }

    function moveAllGhousts(){
        if(monsters.value >= 1){
            moveGhost(ghost, -1, whatWasBeforeG1);
        }
        if(monsters.value >= 2){
            moveGhost(ghost2, -2, whatWasBeforeG2);
        }
        if(monsters.value >= 3){
            moveGhost(ghost3, -3, whatWasBeforeG3);
        }
        if(stopTheSmail===false)
            moveSmail();
    }

    function moveSmail(){
        if(stopTheSmail === true)
            return;
        board[0][0] = 0;
        board[smail.i][smail.j] = whatWasBeforeS;
        var add = false;
        while(add === false){
            var forTheSmail = Math.random();
            if(forTheSmail <= 0.25){//down
                    if(smail.i < 9 && board[smail.i + 1][smail.j] !== 2 && board[smail.i + 1][smail.j] !== 4 && board[smail.i + 1][smail.j] !== -1 && board[smail.i + 1][smail.j] !== -2 && board[smail.i + 1][smail.j] !== -3){
                        whatWasBeforeS = board[smail.i+1][smail.j];
                        smail.i++;
                        add = true;
                    }
            }

            if(0.25 < forTheSmail && forTheSmail <= 0.5){//left
                    if(smail.j<9 && board[smail.i][smail.j+1] !== 2 && board[smail.i][smail.j+1] !== 4 && board[smail.i][smail.j+1] !== -1 && board[smail.i][smail.j+1] !== -2 && board[smail.i][smail.j+1] !== -3){
                        whatWasBeforeS = board[smail.i][smail.j+1];
                        smail.j++;
                        add = true;
                    }
            }

            if(0.5<forTheSmail && forTheSmail<=0.75){//up
                    if(smail.i>0 && board[smail.i - 1][smail.j] !== 2 && board[smail.i - 1][smail.j] !== 4 && board[smail.i - 1][smail.j] !== -1 && board[smail.i - 1][smail.j] !== -2 && board[smail.i - 1][smail.j] !== -3){
                        whatWasBeforeS = board[smail.i-1][smail.j];
                        smail.i--;
                        add = true;
                    }
            }

            if(0.75<forTheSmail && forTheSmail<=1){//right
                if(smail.j > 0 && board[smail.i ][smail.j-1] !== 2 && board[smail.i][smail.j-1] !== 4 && board[smail.i ][smail.j-1] !== -1 && board[smail.i][smail.j-1] !== -2 && board[smail.i][smail.j-1] !== -3){
                    whatWasBeforeS = board[smail.i][smail.j-1];
                    smail.j--;
                    add = true;
                }
            }
        }
        board[smail.i][smail.j] = 5;
    }

    function UpdatePosition() {
        board[shape.i][shape.j] = 0;
        var x = GetKeyPressed();
        if (x === 1) {
            if (shape.j > 0 && board[shape.i][shape.j - 1] !== 4) {
                shape.j--;
            }
            diraction_pacman = 1;
        }
        if (x === 2) {
            if (shape.j < 9 && board[shape.i][shape.j + 1] !== 4) {
                shape.j++;
            }
            diraction_pacman = 2;
        }
        if (x === 3) { //left
            if (shape.i > 0 && board[shape.i - 1][shape.j] !== 4) {
                shape.i--;
            }
            diraction_pacman = 3;
        }
        if (x === 4) {
            if (shape.i < 9 && board[shape.i + 1][shape.j] !== 4) {
                shape.i++;
            }
            diraction_pacman = 4;
        }        
        if (board[shape.i][shape.j] === 8) {
            score = score + 25;
            ballsLeft--;
        }
        if (board[shape.i][shape.j] === 9) {
            score = score + 15;
            ballsLeft--;
        }
        if (board[shape.i][shape.j] === 10) {
            score = score + 5;
            ballsLeft--;
        }
        if(board[shape.i][shape.j] === 5){
            score = score + 50;
            board[shape.i][shape.j]=0;
            stopTheSmail = true;
            
        }
        if(board[shape.i][shape.j] === 20){
            disq++;
        }
        if(board[shape.i][shape.j] === 30){
            extraTime = extraTime + 15;
        }
        board[shape.i][shape.j] = 2;
        var currentTime = new Date();
        time_elapsed =parseFloat((currentTime - start_time) / 1000);
        time_elapsed=parseInt(time_elapsed-extraTime);
        Draw();
        if(secondOfGame <= time_elapsed){
            timeIsUp();
        }

        if(ballsLeft===0){
            finishGame();
        }
    }

    function finishGame(){
        window.clearInterval( interval);
        window.clearInterval(intervalGhost);
        window.clearInterval(intervalMedication);
        window.clearInterval(intervalClock);
        window.clearInterval(intervalStopMedication);
        window.clearInterval(intervalStopClock);
        myMusic.stop();
        winMusic.play();
        setTimeout(function() {
            alert("We have a Winner!!!");
        },10)
    }

    function timeIsUp(){
        window.clearInterval( interval);
        window.clearInterval(intervalGhost);
        window.clearInterval(intervalMedication);
        window.clearInterval(intervalClock);
        window.clearInterval(intervalStopMedication);
        window.clearInterval(intervalStopClock);
        myMusic.stop();
        if(score < 150){
            //console.log(document.getElementById("seconds").value);
            window.alert("You can do better");
        }
        else{
            winMusic.play();
            setTimeout(function() {
                alert("We have a Winner!!!");
            },10)
            //window.alert("We have a Winner!!!" );
        }
    }

    function getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    function welcome(){
        if(theGameIsStarted)
            gameOver()
        var w = document.getElementById("welcome");
        w.style.display = "block";
        var z = document.getElementById("signUp");
        z.style.display = "none";
        var y = document.getElementById("game");
        y.style.display = "none";
        var x = document.getElementById("login");
        x.style.display = "none";
        var s = document.getElementById("setting");
        s.style.display = "none"; 
        myMusic.stop();
    }

    function signUp(){
        if(theGameIsStarted)
            gameOver();
        var w = document.getElementById("signUp");
        w.style.display = "block";
        var y = document.getElementById("welcome");
            y.style.display = "none";
        var x = document.getElementById("login");
            x.style.display = "none";
        var z = document.getElementById("game");
            z.style.display = "none";
        var s = document.getElementById("setting");
        s.style.display = "none";
        myMusic.stop();

    }

    function login(){
        diraction_pacman = 4;
        if(theGameIsStarted)
            gameOver();
        var w = document.getElementById("login");
        w.style.display = "block";
        var y = document.getElementById("welcome");
        y.style.display="none";
        var x = document.getElementById("signUp");
        x.style.display="none";
        var z = document.getElementById("game");
        z.style.display="none";
        var s = document.getElementById("setting");
        s.style.display="none";
        myMusic.stop();
        
    }

    function setting(){

        if(document.getElementById("userid").value.length === 0){
            window.alert("You must login before start playing")
            return;
        }
        var s = document.getElementById("setting");
        s.style.display = "block";
        var w = document.getElementById("login");
        w.style.display = "none";
        var y = document.getElementById("welcome");
        y.style.display="none";
        var x = document.getElementById("signUp");
        x.style.display="none";
        var z = document.getElementById("game");
        z.style.display="none";
    }

    function submit(){
        var bool =checkFieldsToSubmit();
        if(!bool)
            return;   
        var name = document.getElementById("uname").value;
        var password = document.getElementById("pass").value;
        users_arr.push(name);
        users_arr.push(password);

        var doc_val_check =$("#pass").val(doc_val_check);
        if (doc_val_check.length) {
            doc_val_check = ""; 
        }
        var doc_val_check =$("#uname").val(doc_val_check);
        if (doc_val_check.length) {
            doc_val_check = ""; 
        }
        var doc_val_check =$("#lname").val(doc_val_check);
        if (doc_val_check.length) {
            doc_val_check = ""; 
        }
        var doc_val_check =$("#fname").val(doc_val_check);
        if (doc_val_check.length) {
            doc_val_check = ""; 
        }
        var doc_val_check =$("#em").val(doc_val_check);
        if (doc_val_check.length) {
            doc_val_check = ""; 
        }
        var doc_val_check =$("#bd").val(doc_val_check);
        if (doc_val_check.length) {
            doc_val_check = ""; 
        }
        
        var x = document.getElementById("welcome");
        x.style.display="block";

        var y = document.getElementById("signUp");
        y.style.display="none";
    }


    function findRandomEmptyCell(board) {
        var i = Math.floor((Math.random() * 9) + 1);
        var j = Math.floor((Math.random() * 9) + 1);
        while (board[i][j] !== 0) {
            i = Math.floor((Math.random() * 9) + 1);
            j = Math.floor((Math.random() * 9) + 1);
        }
        return [i, j];
    }

    function setUButton(event){
        upB = event;
        up.value =  event.key;
    }

    function setDButton(event){
        downB = event;
        down.value = event.key;
    }

    function setLButton(event){
        leftB = event;
        left.value = event.key;
    }

    function setRButton(event){
        rightB = event;
        right.value = event.key;
    }

    function GetKeyPressed() {
        if(randomButton.checked === true){
            if (keysDown['ArrowUp']) {
                return 1;
            }
            if (keysDown['ArrowDown']) {
                return 2;
            }
            if (keysDown['ArrowLeft']) {
                return 3;
            }
            if (keysDown['ArrowRight']) {
                return 4;
            }
        }
        else{
            if (keysDown[upB.code]) {
                return 1;
            }
            if (keysDown[downB.code]) {
                return 2;
            }
            if (keysDown[leftB.code]) {
                return 3;
            }
            if (keysDown[rightB.code]) {
                return 4;
            }
        }
    }

    function Draw() {
        context.clearRect(0, 0, canvas.width, canvas.height); //clean board
        lblScore.value = score;
        lblTime.value = time_elapsed;
        lblDisq.value = disq;
        for (var i = 0; i < 10; i++) {
            for (var j = 0; j < 10; j++) {
                var center = new Object();
                center.x = i * 60 + 30;
                center.y = j * 60 + 30;
                if(board[i][j] === -1) { //Ghost
                    drawGhost(center, "red");
                } else if (board[i][j] === -2) {
                    drawGhost(center, "green");
                } else if (board[i][j] === -3) {
                    drawGhost(center, "blue");
                } else if (board[i][j] === 2) { //Pacman
                    drawPacman(center);
                } else if (board[i][j] === 8) {
                    context.beginPath();
                    context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
                    context.fillStyle = firstColor.value; //color
                    context.fill();
                } else if (board[i][j] === 9) {
                    context.beginPath();
                    context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
                    context.fillStyle = secondColor.value; //color
                    context.fill();
                } else if (board[i][j] === 10) {
                    context.beginPath();
                    context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
                    context.fillStyle = thirdColor.value; //color
                    context.fill();
                } else if (board[i][j] === 4) {
                    context.beginPath();
                    context.rect(center.x - 30, center.y - 30, 60, 60);
                    context.fillStyle = "grey"; //color
                    context.fill();
                } else if(board[i][j] === 5){
                   drawSmiley(center); 
                }
                else if(board[i][j] === 20){
                    drawMedication(i, j);
                } else if(board[i][j] === 30){
                    drawClock(i, j);
                }
            }
        }
    }

    function about(){
        document.getElementById("myDialog").showModal(); 
    }