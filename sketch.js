var PLAY
var END
var gameState

var ObstaclesGroup, obstacleImage, obstacle
var BananasGroup, bananasImage, banana

var monkey, monkeyA

var ground

var invisibleGround

var scene

var score


var restart, restartSprite

var lives

function preload() {

  monkeyA = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png")

  obstacleImage = loadImage("stone.png")

  bananasImage = loadImage("banana.png")

  scene = loadImage("jungle.jpg")

  restart = loadImage("restart.png")
}

function setup() {
  createCanvas(400, 400);

  PLAY = 1;
  END = 0;
  gameState = PLAY;

  ObstaclesGroup = new Group();
  BananasGroup = new Group();

  monkey = createSprite(200, 350, 20, 50);
  monkey.addAnimation("monkey", monkeyA);
  monkey.scale = 0.1;
  monkey.x = 50;

  backGround = createSprite(200, 200, 50, 50)
  backGround.addAnimation("bg", scene)

  lives = 2

  ground = createSprite(200, 380, 800, 10);

  invisibleGround = createSprite(200, 385, 400, 5);
  invisibleGround.visible = false;

  monkey.collide(invisibleGround);

  survivalTime = 0;

  score = 0;

  restartSprite = createSprite(200, 200, 100, 100)
  restartSprite.addImage("restart", restart)
  restartSprite.scale = 0.1
  restartSprite.visible = false
}

function draw() {

  background("scene");

  switch (score) {
    case 10:
      monkey.scale = 0.2
      break;
    case 20:
      monkey.scale = 0.3
      break;
    case 30:
      monkey.scale = 0.4
      break;
    case 40:
      monkey.scale = 0.5
      break;
    case 50:
      monkey.scale = 0.6
      break;
    case 60:
      monkey.scale = 0.7
      break;
    case 70:
      monkey.scale = 0.8
      break;
    case 80:
      monkey.scale = 0.9
      break;
  }

  backGround.velocityX = -2
  if (backGround.x < 400) {
    backGround.x = backGround.width / 2;
  }
console.log(backGround.x)

  if (gameState === PLAY) {

    ground.velocityX = -(6 + 3 * survivalTime / 100);

    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }

    ground.visible = false

    survivalTime = Math.ceil(World.frameCount / World.frameRate);

    if (monkey.isTouching(BananasGroup)) {
      score = score + 2
      BananasGroup.destroyEach()
    }

    if (keyDown("space") && monkey.y >= 10) {
      monkey.velocityY = -12;

    }

    monkey.velocityY = monkey.velocityY + 0.8;
    spawnObstacles();
    spawnBanana();


    if (ObstaclesGroup.isTouching(monkey)) {
      gameState = END;

    }

    if (monkey.isTouching(ObstaclesGroup)){
      lives = lives-1
      monkey.scale = monkey.scale-0.1
    }
    

  } else if (gameState === END) {

    restartSprite.visible = true

    ground.velocityX = 0;
    monkey.velocityY = 0;
    ObstaclesGroup.setVelocityXEach(0);
    BananasGroup.setVelocityXEach(0);

    ObstaclesGroup.setLifetimeEach(-1);
    BananasGroup.setLifetimeEach(-1);

    backGround.velocityX = 0
  }

  monkey.collide(invisibleGround);
  monkey.depth = backGround.depth + 1

  drawSprites();
  text("SURVIVAL TIME: " + survivalTime, 250, 100);
  text("SCORE: " + score, 250, 50);
  text("LIVES:" + lives, 5,100)
}


function spawnObstacles() {
  if (World.frameCount % 60 === 0) {
    var obstacle = createSprite(400, 365, 10, 40);
    obstacle.addAnimation("Stone", obstacleImage)
    obstacle.velocityX = -4

    obstacle.scale = 0.1;
    obstacle.lifetime = 400;

    ObstaclesGroup.add(obstacle);
  }
}

function spawnBanana() {

  
  if (World.frameCount % 60 === 0) {
    var banana = createSprite(400, 320, 40, 10);
    banana.y = random(280, 320);
    banana.addAnimation("Banana", bananasImage);
    banana.scale = 0.1;
    banana.velocityX = -3;


    banana.lifetime = 134;


    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    BananasGroup.add(banana)


  }

}