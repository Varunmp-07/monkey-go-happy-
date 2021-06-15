var backImage,backgr;
var player, player_running;
var ground,ground_img;
var food,obstacle,foodImg,obstacleImg,foodGroup,obstacleGroup;
var score;
var END =0;
var PLAY =1;
var gameState = PLAY;

function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  foodImg=loadImage("banana.png")
  obstacleImg=loadImage("stone.png")
}

function setup() {
  createCanvas(800,400);
text("score"+score,150,280)

 
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-10;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;
  
  foodGroup=new Group();
  obstacleGroup=new Group();
  
  player.setCollider("circle",0,0,300);
  //player.debug=true
  score=0
  
  
  }

function draw() { 
  background(0);
  drawSprites();
  text("score"+score,150,50)
  
  if(gameState===PLAY){
   
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  
  if(keyDown("space")){
    player.velocityY=-15
  }

  if(player.isTouching(foodGroup)){
    score=score+2
    player.scale+=+0.1
    foodGroup.destroyEach();
  }

 
  
    player.velocityY = player.velocityY + 0.8;

    spwanFood();
    spawnobstacle();

    if(obstacleGroup.isTouching(player)){
      
      gameState=END
    }
    
  }
  else if(gameState===END){
    backgr.velocityX=0;
    player.velocityY=0;
    //player.changeAnimation("stop",playerCollided)
    obstacleGroup.setLifetimeEach(-1);
    foodGroup.setLifetimeEach(-1);
    obstacleGroup.setVelocityXEach(0);
    foodGroup.setVelocityXEach(0);
  }
  
  
    player.collide(ground);
  
  

  
}


function spwanFood(){
  if(frameCount%120===0){
    var banana=createSprite(770, 250, 40, 10)
    banana.y=random(120,200)
    banana.addImage(foodImg)
    banana.scale=0.05
    banana.velocityX=-8
    banana.lifetime=300
    player.depth=banana.depth+1
    foodGroup.add(banana);
  }
}

function spawnobstacle() {
  if(frameCount%90===0){
    var obstacles=createSprite(770,300,40,10)
    obstacles.addImage(obstacleImg)
    obstacles.scale=0.2
    obstacles.velocityX=-10
    obstacles.lifetime=300
    player.depth=obstacles.depth+1
    obstacleGroup.add(obstacles)
  }
}



