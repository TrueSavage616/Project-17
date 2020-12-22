var monkey, monkey_running
var banana, bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score;
var sun, sunImage;
var background, backgroundImage;
var lemon, lemonImage;

function preload() {


  monkey_running = loadAnimation("monkey_0.png", "monkey_1.png", "monkey_2.png", "monkey_3.png", "monkey_4.png", "monkey_5.png", "monkey_6.png", "monkey_7.png", "monkey_8.png")

  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
  backgroundImage = loadImage("backgroung0.png");
  sunImage = loadImage("sun_PNG13449.png");
  lemonImage = loadImage("lemon-tree.png");
}



function setup() {
  createCanvas(600, 400);

  background = createSprite(300, 200, 20, 20);
  background.addImage(backgroundImage);
  background.scale = 2;

  lemon = createSprite(100, 300, 20, 20);
  lemon.addImage(lemonImage);
  lemon.scale = 0.2;

  var survivalTime = 0;

  //creating monkey
  monkey = createSprite(100, 315, 20, 20);
  monkey.addAnimation("moving", monkey_running);
  // monkey.addImage(bananaImage)
  monkey.scale = 0.1

  sun = createSprite(490, 100, 20, 20);
  sun.addImage(sunImage)
  sun.scale = 0.4

  ground = createSprite(420, 380, 900, 10);
  ground.velocityX = -4;
  ground.visible = false;
  ground.x = ground.width / 2;
  console.log(ground.x)

  FoodGroup = new Group();
  obstaclesGroup = new Group();

  score = 0;


}


function draw() {




  if (ground.x < 0) {
    ground.x = ground.width / 2;
  }



  if (keyDown("space")) {
    monkey.velocityY = -12;
  }
  monkey.velocityY = monkey.velocityY + 0.8;

  monkey.collide(ground);
  spawnFood();
  spawnObstacles();

  drawSprites();
  textSize(20);
  fill("cyan");
  score = Math.ceil(frameCount / frameRate())
  text("Score: " + score, 500, 50);


  if (obstaclesGroup.isTouching(monkey)) {
    ground.velocityX = 0;
    monkey.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);
    obstaclesGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);


  }


  textSize(40);
  fill("yellow");
  survivalTime = Math.ceil(frameCount / frameRate())
  text("Survival Time: " + survivalTime, 100, 50);
}



function spawnFood() {
  //write code here to spawn the Food
  if (frameCount % 80 === 0) {
    banana = createSprite(600, 100, 40, 10);
    banana.y = random(120, 300);
    banana.velocityX = -5;

    //assign lifetime to the variable
    banana.lifetime = 300;
    monkey.depth = banana.depth + 1;

    //add image of banana
    banana.addImage(bananaImage);
    banana.scale = 0.05;

    //add each banana to the group
    FoodGroup.add(banana);
  }
}

function spawnObstacles() {
  if (frameCount % 300 === 0) {
    obstacle = createSprite(800, 350, 10, 40);
    obstacle.velocityX = -6;

    //add image to the obstacle 
    obstacle.addImage(obstaceImage);
    obstacle.scale = 0.15;

    //lifetime to the obstacle     
    obstacle.lifetime = 300;

    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}