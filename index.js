


//  Setting up canvas
const canvasWidth = 900;
const canvasHeight = 600;
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = canvasWidth;
canvas.height = canvasHeight;
ctx.imageSmoothingEnabled = false;// FOR PIXEL ART!

// Player images for upgrades
const PlayerUpgrades = [
    './img/Task.png',
    './img/Task-2.png',
    './img/Task-3.png',
    './img/Task-4.png'
]


// Creating image of mole
const moleIMG = new Image();
let btnUpTask = 0;
moleIMG.src = PlayerUpgrades[btnUpTask];
const spriteWidth = 32;
const spriteHeight = 32;
let frameX = 3;
let frameY = 0; 

// Background img
const bgUpgrade = [
    './img/Background.jpg',
    './img/Background-2.jpg',
    './img/Background-3.jpg',
    './img/Background-4.jpg',
    './img/Background-5.jpg'
]

const bg = new Image();
let btnUp = 0
bg.src = bgUpgrade[btnUp];


// Game frame rate
let gameFrame = 0;
const staggerFrames = 5;

// Geting random position
function generateRandomPositionOnCanvas(){
    let positionX = Math.round(Math.random() * (canvasWidth - spriteWidth * 5));
    let positionY = Math.round(Math.random() * (canvasHeight - spriteHeight * 5));
    return { x: positionX, y: positionY };
}

// Storing mole position
let molePosition = []

// Generating random mole positions
function generateMoles(count) {
    for (let i = 0; i < count; i++){
        molePosition.push(generateRandomPositionOnCanvas());
    }
}

function drawMoles(){
    for(let i = 0; i< molePosition.length; i++){
        ctx.drawImage(moleIMG, frameX * spriteWidth, frameY * spriteHeight,  spriteWidth,  spriteHeight,
            molePosition[i].x,molePosition[i].y, spriteWidth * 5, spriteHeight * 5 );
    }
}

function handleClick(event){
    const mouseX = event.clientX - canvas.getBoundingClientRect().left;
    const mouseY = event.clientY - canvas.getBoundingClientRect().top;

    for(let i = 0; i < molePosition.length; i++){
        const mole =molePosition[i];
        if(
            mouseX >= mole.x && mouseX <= mole.x + spriteWidth * 5 &&
            mouseY >= mole.y && mouseY <= mole.y + spriteHeight * 5
        ) {
            molePosition.splice(i, 1);
            score += 1 + btnUpTask;
            fullScore += 1 + btnUpTask;
            break;
        }
    }
}

// Adding the event listener for a click to a canvas
canvas.addEventListener('click', handleClick);


// Btn Event listener
function btnPressOffice() {
    if (score >= 20 && !(btnUp >= bgUpgrade.length - 1)){
        btnUp++;
        bg.src = bgUpgrade[btnUp];
        score = score -20;
    }
    
}
document.getElementById('upgradeOffice').addEventListener('click', btnPressOffice);

function btnPressTask() {
    if(score >= 10 && !(btnUpTask >= PlayerUpgrades.length - 1)){
        btnUpTask++
        moleIMG.src = PlayerUpgrades[btnUpTask];
        score = score -10;
    }
}
document.getElementById('upgradeTask').addEventListener('click', btnPressTask);



// Score sistem
let score = 0
let fullScore = 0;


function taskUpgrade() {
    if(btnUpTask < PlayerUpgrades.length - 1){
    
        if (score >= 10){
            const upgradeBtnTask = document.getElementById('upgradeTask');
            upgradeBtnTask.src = './img/btn-Active.png';

            const upgradeBtnTaskText = document.getElementById('upgradeTaskText');
            upgradeBtnTaskText.classList.remove("scoreText");
            upgradeBtnTaskText.classList.remove("upgradeTaskText");
            upgradeBtnTaskText.classList.add("scoreTextActive");
            upgradeBtnTaskText.classList.add("upgradeTaskTextActive");
        }
        if (score < 10){
            const upgradeBtnTask = document.getElementById('upgradeTask');
            upgradeBtnTask.src = './img/btn-notActive.png';

            const upgradeBtnTaskText = document.getElementById('upgradeTaskText');
            upgradeBtnTaskText.classList.add("scoreText");
            upgradeBtnTaskText.classList.add("upgradeTaskText");
            upgradeBtnTaskText.classList.remove("scoreTextActive");
            upgradeBtnTaskText.classList.remove("upgradeTaskTextActive");
        }
    }
    else{
        const upgradeBtnTask = document.getElementById('upgradeTask');
            upgradeBtnTask.src = './img/btn-notActive.png';

            const upgradeBtnTaskText = document.getElementById('upgradeTaskText');
            upgradeBtnTaskText.classList.add("scoreText");
            upgradeBtnTaskText.classList.add("upgradeTaskText");
            upgradeBtnTaskText.classList.remove("scoreTextActive");
            upgradeBtnTaskText.classList.remove("upgradeTaskTextActive");

            
            upgradeBtnTaskText.innerText = 'Fully upgraded!'

    }
}

function officeUpgrade() {
    if(btnUp < bgUpgrade.length - 1){
        if (score >= 20){
            const upgradeBtnOffice = document.getElementById('upgradeOffice');
            upgradeBtnOffice.src = './img/btn-Active.png';

            const upgradeBtnTaskTextOffice = document.getElementById('upgradeOfficeText');
            upgradeBtnTaskTextOffice.classList.remove("scoreText");
            upgradeBtnTaskTextOffice.classList.remove("upgradeOfficeText");
            upgradeBtnTaskTextOffice.classList.add("scoreTextActive");
            upgradeBtnTaskTextOffice.classList.add("upgradeOfficeTextaActive");

        }
        if (score < 20){
            const upgradeBtnOffice = document.getElementById('upgradeOffice');
            upgradeBtnOffice.src = './img/btn-notActive.png';

            const upgradeBtnTaskTextOffice = document.getElementById('upgradeOfficeText');
            upgradeBtnTaskTextOffice.classList.add("scoreText");
            upgradeBtnTaskTextOffice.classList.add("upgradeOfficeText");
            upgradeBtnTaskTextOffice.classList.remove("scoreTextActive");
            upgradeBtnTaskTextOffice.classList.remove("upgradeOfficeTextaActive");
        }
        
    }
    else{
        {
            const upgradeBtnOffice = document.getElementById('upgradeOffice');
            upgradeBtnOffice.src = './img/btn-notActive.png';

            const upgradeBtnTaskTextOffice = document.getElementById('upgradeOfficeText');
            upgradeBtnTaskTextOffice.classList.add("scoreText");
            upgradeBtnTaskTextOffice.classList.add("upgradeOfficeText");
            upgradeBtnTaskTextOffice.classList.remove("scoreTextActive");
            upgradeBtnTaskTextOffice.classList.remove("upgradeOfficeTextaActive");

            upgradeBtnTaskTextOffice.innerText = 'Fully upgraded!'
            upgradeBtnTaskTextOffice.classList.add("upgradeOfficeTextFinal");
            
        }
    }
}



function animate() { 
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    // Drawing bacground
    ctx.drawImage(bg, 0, 0, canvasWidth, canvasHeight );
    
    drawMoles()
    
    // Seting framerate - skipping frame update in requestAnimationFrame
    if (gameFrame % 5 == 0){
        if (frameX < 6) frameX++;
        else frameX = 0;
    }

    // White stroke
    ctx.font = '32px pixel, Arial'
    ctx.strokeStyle = '#474747';
    ctx.lineWidth = 6; // Adjust the width of the stroke as needed
    ctx.strokeText(`Score ${score}$`, 35, 580)

    // Dark gray fill
    ctx.fillStyle = 'white';
    ctx.fillText(`Score ${score}$`, 35, 580)

    taskUpgrade()
    officeUpgrade()

    gameFrame++;

    if (gameFrame % 102 ==0){
        molePosition = [];
        generateMoles(Math.floor(Math.random() * 3) + 1)
    }
    requestAnimationFrame(animate)
}

animate()
generateMoles(3)