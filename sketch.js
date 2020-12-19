
var monkey , monkey_running
var ground
var banana ,bananaImage, obstacle, obstacleImage
var foodGroup, obstacleGroup
var score
var PLAY, END;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(500,500);
  
  PLAY = 1;
  gameState=PLAY;
  END = 0;
  
  foodGroup = createGroup();
  obstacleGroup = createGroup();

  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale = 0.1;

  ground = createSprite(80,400,900,10);
  ground.velocityX = -4;
  ground.x=ground.width/2;
  console.log(ground.x);
  
}


function draw() {
  background("white");
  
  if (gameState === PLAY){
    
    if(ground.x<0){
      ground.x=ground.width/2;
    }
    

    
    if(keyDown("space")){
    monkey.velocityY = -18;
  }
    monkey.velocityY = monkey.velocityY + 0.8;
    monkey.collide(ground);
    
    if(foodGroup.isTouching(monkey)){
      foodGroup.destroyEach();
    }
    
   
  
  Food();
  Obstacles();
  
  if(obstacleGroup.isTouching(monkey)){
    gameState = END;
  }
  
  }
  
else if(gameState === END){
  ground.velocityX = 0;
  obstacleGroup.setVelocityEach(0);
  foodGroup.setVelocityEach(0);
  foodGroup.setLifetimeEach(-1);
  obstacleGroup.setLifetimeEach(-1);

  monkey.velocityY = monkey.velocityY + 0.9;
  monkey.collide(ground);
}  
  drawSprites();
}

function Food(){
  
  if(frameCount%80 === 0){
   var banana = createSprite(500,10,10,20);
    banana.addImage(bananaImage);
    banana.velocityX = -5;
    banana.y = Math.round(random(120,200));
    banana.scale = 0.1;
    foodGroup.add(banana);
    foodGroup.setLifetimeEach(100);
    banana.setCollider("rectangle",0,0,400,400)
  }
  
}

function Obstacles(){
  
  if(frameCount%100 === 0){
    var obstacle = createSprite(500,365,23,32);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.2;
    obstacle.velocityX = -5;
    obstacleGroup.add(obstacle);
    obstacleGroup.setLifetimeEach(100);
    obstacle.setCollider("circle",0,0,200);
  }
  
}






