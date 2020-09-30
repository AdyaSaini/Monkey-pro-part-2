//Sprites
var monkey, obstacleGroup, foodGroup, jungle, ground;
//Images
var player_Jog, BananaImg, StoneImg, JungleImg;
//score
var score;

function preload(){
  JungleImg = loadImage("jungle.jpg")
  player_Jog = loadAnimation("Monkey_01.png",   "Monkey_02.png", "Monkey_03.png", "Monkey_04.png",   "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");
  Monkey = loadAnimation("Monkey_08.png");
  BananaImg = loadImage("banana.png");
  StoneImg = loadImage("stone.png");
}

function setup() {
  createCanvas(500, 300);
  
  jungle = createSprite(100,150,20,20);
  jungle.addImage(JungleImg); 
  jungle.velocityX = -2;
  
  monkey = createSprite(70,280,20,20);
  monkey.addAnimation("Mjogging",player_Jog);
  monkey.addAnimation("collide",Monkey);
  monkey.scale = 0.2;
  
  invisibleGround = createSprite(250,295,500,10);
  invisibleGround.visible = false;
  
  obstacleGroup = new Group();
  foodGroup = new Group();
  
  score=0  
}

function draw() {
  background(220);
  
  monkey.collide(invisibleGround);
  
  if (jungle.x < 0){
    jungle.x = jungle.width/2;
  }
  
  if(keyDown("space") && monkey.y >= 200 ){
    monkey.velocityY = -12;
  }
  monkey.velocityY = monkey.velocityY + 0.8;
  
  spawnObstacle();
  spawnFood();
  
  if(monkey.isTouching(foodGroup)){
    score = score+2;
    foodGroup.destroyEach();
  }
  switch(score) {
      case 10: monkey.scale=0.12;
              break;
      case 20: monkey.scale=0.14;
              break;
      case 30: monkey.scale=0.16;
              break;
      case 40: monkey.scale=0.18;
              break;
      default: break;
  }
  
  if(obstacleGroup.isTouching(monkey)){
    monkey.scale=0.08;
    score=0; 
    monkey.changeAnimation("collide",Monkey);
    obstacleGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    foodGroup.setVelocityXEach(0);
    foodGroup.setLifetimeEach(-1);
    jungle.velocityX=0;
  }
  
  drawSprites();
  
  fill("white");
  textSize(20);
  text("Score: "+ score, 320,50);
}

function spawnObstacle() {
  if(frameCount % 300 === 0) {
    var stone = createSprite(501,260,10,40);
    stone.velocityX = -(4+score*3/100);
    stone.addImage(StoneImg);
    stone.scale = 0.2;
    stone.lifetime = 300;
    obstacleGroup.add(stone);
  }
}  
function spawnFood() {
 if (frameCount % 150 === 0) {
    var food = createSprite(600,120,40,10);
    food.y = Math.round(random(80,200));
    food.addImage(BananaImg);
    food.scale = 0.07;
    food.velocityX = -3;
    food.lifetime = 200;
    foodGroup.add(food);
  }
}