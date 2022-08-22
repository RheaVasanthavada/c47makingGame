var PLAY = 1;
var END = 0;
var gameState = PLAY;

var jungleImg, jungle
var man, manImg
var invisibleGround
var monkey, monkeyImg
var banana, bananaImg;


function preload(){

  jungleImg = loadImage("./images/bg.png")
  manImg = loadImage("./images/runningMan.png")
  monkeyImg = loadImage("./images/monkey.png")
  bananaImg = loadImage("./images/peeledBanana.png")
 
}

function setup() {
  createCanvas(1500, 800);
  
  jungle = createSprite(800,400, 400, 20)
  jungle.addImage("jungle",jungleImg);
  jungle.scale = 0.5
  jungle.velocityX = -3

  man = createSprite(150, 650, 50, 50)
  man.addImage("man",manImg);
  man.scale = 0.7
  man.setCollider("rectangle", 0,0, 250,350)
 

  invisibleGround = createSprite(750, 800, 1600, 10)
  invisibleGround.setCollider("rectangle", 0,0, 1600,20)
  //invisibleGround.visible = false;

 
  obstaclesGroup = new Group();

 
}

function draw() {

  background("white");
  
  if(gameState === PLAY){
    
       //infinite moving affect
        if(jungle.x<300){
          jungle.x=width/2
      }

        //jumping of man
      if(keyDown("UP_ARROW") && man.y>550){
        man.velocityY = -20
    }
        //when man collides with monkeyGroup
      if(man.isTouching(obstaclesGroup)){
         gameState = END
     }
   
  
   spawnObstacles();
    
  }

  else if(gameState === END){
    //console.log("inside end")
    jungle.velocityX = 0;
     obstaclesGroup.setLifetimeEach(-1);
     obstaclesGroup.setVelocityXEach(0);
  }

   
     
  //gravity is always there
  man.velocityY = man.velocityY+0.6

  //to make man stay on the ground
  man.collide(invisibleGround);

  

 
  drawSprites();
}



function reset(){
 
}



function spawnObstacles(){
   if(frameCount % 150 === 0){
      obstacle = createSprite(1500, 750, 30, 30);
      obstacle.velocityX = -6;
     // obstacle.debug = true;

      var rand = Math.round(random(1,2));
      switch(rand){
        case 1: obstacle.addImage(bananaImg);
                obstacle.setCollider("rectangle", 0, 0, 300, 280);
                break;
        case 2: obstacle.addImage(monkeyImg);
                obstacle.y = 725;
                obstacle.setCollider("rectangle", 0, 0, 450, 450);
                break;
      }
      obstacle.scale = 0.3;
      obstaclesGroup.add(obstacle);
      obstacle.lifetime = 300;
   }
}


