var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var obstacle , obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6,obstacleGroup;
var cloud,cloudImage,cloudGroup;
var gameOver,gameOverImage;
var restart,restartImage;
var gameState;
var score;

function preload(){
trex_running = loadAnimation ("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  
  groundImage = loadImage("ground2.png")
  
  cloudImage = loadImage("cloud.png");
  
 obstacle1 = loadImage("obstacle1.png");
  obstacle1.scale=0.3;
obstacle2 = loadImage("obstacle2.png");
  obstacle2.scale=0.3;
 obstacle3 = loadImage("obstacle3.png");
  obstacle3.scale=0.3;
  obstacle4 = loadImage("obstacle4.png");
  obstacle4.scale=0.3;
obstacle5 = loadImage("obstacle5.png");
  obstacle5.scale=0.3;
obstacle6 = loadImage("obstacle6.png");
  obstacle6.scale=0.3;
  
gameOverImage= loadImage("gameOver.png");
  
  restartImage=loadImage("restart.png");

}

function setup() {
  createCanvas(400, 400);
  
  trex = createSprite(50,380,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided",trex_collided);
  trex.scale = 0.5;
  
  ground = createSprite(200,380,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -7 ;
  
  invisibleGround = createSprite(200,390,400,10);
  invisibleGround.visible = false;
  
  gameOver=createSprite(200,180,20,20);
  gameOver.addImage(gameOverImage);
  gameOver.scale=0.6
  gameOver.visible=false;
  
  restart=createSprite(200,220,20,20);
  restart.addImage(restartImage);
  restart.scale=0.5;
  restart.visible=false;
  
  gameState="play";
  
  obstacleGroup= new Group();
  cloudGroup=new Group();
  
  score=0;
  textSize(18)
  
  
 
  
  
}

function draw() {
  background("white");
   trex.collide(invisibleGround);
  
  text("score: " + score,230,100);
  
  if(gameState==="play"){
    
      
  if(keyDown("space") && trex.y>340 ) {
    trex.velocityY = -16  ;
  }
  
  trex.velocityY = trex.velocityY + 0.8
  
  if (ground.x < 0){
    ground.x = ground.width/2;}
    
    if(obstacleGroup.isTouching(trex)){
       gameState="end";
       }
 
   score=score+Math.round(getFrameRate()/60);
  
    

 spawnClouds();
  spawnObstacles();

  }
  

  
  
    

    
  else if(gameState==="end"){
    gameOver.visible=true;
    restart.visible=true;
    ground.velocityX=0;
    trex.velocityY=0
    obstacleGroup.setVelocityXEach(0);
    cloudGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
   cloudGroup.setLifetimeEach(-1);
    
  trex.changeAnimation("collided",trex_collided);
  
    if(mousePressedOver(restart) ){
    gameState="play";
    obstacleGroup.destroyEach();
    cloudGroup.destroyEach();
    trex.changeAnimation("running",trex_running);
    gameOver.visible=false;
   restart.visible=false;
      score=0;
      ground.velocityX=-7;
    
  }
  
  
  }

  
   
  
  
  drawSprites(); 
}




function spawnClouds(){
  
  if(frameCount%60===0){
     cloud=createSprite(410,380,20,20);
    cloud.y=Math.round(random(200,350));
    cloud.velocityX=-5;
    cloud.addImage(cloudImage);
    
   cloudGroup.add(cloud);  

    
 }
      
}


function spawnObstacles(){

 if(frameCount%60===0){
   obstacle=createSprite(400,350,20,20);  
 obstacle.velocityX=-7 ; 
   
   var rand=Math.round(random(1,6));
   
   switch(rand) {
     case 1 :obstacle.addImage(obstacle1);
       break;
     case 2 :obstacle.addImage(obstacle2); 
       break;
     case 3 :obstacle.addImage(obstacle3);
       break;
     case 4 :obstacle.addImage(obstacle4);
       break;
     case 5 :obstacle.addImage(obstacle5);
       break;
     case 6 :obstacle.addImage(obstacle6);
       break;
       
 
   }     
     
   
   obstacleGroup.add(obstacle);       
 
 
 }
  
          
          
                 
          
          
          
          
          
          
          

  




}