var monkey, monkeyImage;
var ground, groundImage;
var stone, stoneGroup, stoneImage;
var bg, bgImage;
var score = 0;
var banana, bananaImage, bananaGroup;
var edge;

var PLAY = 1;
var END = 0;
var gameState = PLAY;
var restart, restartImage;
var gameOver, gameOverImage;

function preload(){
  groundImage = loadImage("jungle.jpg");
  
  
  monkeyImage = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png",)
  stoneImage = loadImage("stone.png");
  restartImage = loadImage("RESTART.PNG");
  gameOverImage = loadImage("GAME OVER.PNG");
}


function setup() {
  createCanvas(400, 400);
  
  bg = createSprite(50,50,50,50);
  bg.addImage("Image1",groundImage);
  bg.velocityX = -3;
  
  
 monkey = createSprite(100,320);
  monkey.addAnimation("monkey", monkeyImage);
  monkey.scale = 0.1;
  
  ground = createSprite(200,350,400,5);
  bananaImage = loadImage("banana.png");
  stoneImage = loadImage("stone.png");
  
  edge = createSprite(200,0,400,2);
  edge.visible = false;
  stoneGroup = createGroup();
  bananaGroup = createGroup();
         restart = createSprite(200,200);
         restart.addImage("restart",restartImage);
  restart.visible = false;
         gameOver = createSprite(200,100);
         gameOver.addImage("gameOver", gameOverImage);
  gameOver.visible = false;
}

function draw() {
  createEdgeSprites();
  monkey.collide(edge);
  monkey.collide(ground);
  
  ground.visible = false;
  if(bg.x < 0){
    bg.x = bg.width/2;
  }
   monkey.velocityY = monkey.velocityY + 1;
  if(gameState === PLAY){
 
  if(keyWentDown("space")){
    monkey.velocityY = -12;
  }
  
 spawnbanana();
 spawnrocks();

  if(monkey.isTouching(bananaGroup)){
     monkey.scale = monkey.scale + 0.02; 
     bananaGroup.destroyEach();
    score = score  + 2;
     switch(score){
    case 10 :monkey.scale = 0.12;
      break;
    case 20 :monkey.scale = 0.14;
      break;
    case 30 :monkey.scale = 0.16; 
      break;
    case 40 :monkey.scale = 0.18;
      break;
         default : break;
         }
     }
  
}else if(gameState === END) {
         bg.velocityX = 0;
        bananaGroup.destroyEach();
        stoneGroup.destroyEach();
        restart.visible = true;
        gameOver.visible = true;
        monkey.scale = 0.1;      
  }
        
  if(stoneGroup.isTouching(monkey)){
    gameState = END;
  }
  
  if(mousePressedOver(restart)&& gameState === END){
    gameState = PLAY;
    score = 0;
    bg.velocityX = -3;
    r = 0;
    restart.visible = false;
    gameOver.visible = false;
  }

  
  drawSprites();
  stroke("white");
  textSize(20);
  fill("white");
  text("score" + score,300,30);
}



function spawnbanana(){
  var y = random(50,250);
  if(World.frameCount%100===0){
  
  banana = createSprite(400,y,10,10);
  banana.addImage("banana",bananaImage);
  banana.velocityX = -3;
  banana.lifetime = 300;
  banana.scale = 0.06;
    banana.addToGroup(bananaGroup);
  }
}
function spawnrocks(){
  if(World.frameCount%100===0){
  stone = createSprite(400,320);
  stone.addImage("stone",stoneImage);
  stone.velocityX = -3;
  stone.lifetime = 300;
  stone.scale = 0.2;
  stone.addToGroup(stoneGroup);
  }
}


