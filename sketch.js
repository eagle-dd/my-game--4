var bg, player;
var goldBlockGroup, normalBlockGroup;
var coinGroup;
var score=0, reward, rewardImg
var enemyImg, gameOverImg
var gameState = "PLAY"
var playButton, playButtonImg;
var coin, coinImg;
var prize, prizeImg;
var bomb, bombImg;
var gun, gunImg
var bullet, bulletImg
var kill;
function preload(){
 bg2 =loadImage("images/background2.png")
  bg3=loadImage("images/background5.png")
  goldImage = loadImage("images/gold.png")
  normalImage = loadImage("images/brown-removebg-preview.png")
  Img = loadAnimation("images/1.png", "images/2.png", "images/3.png", "images/4.png", "images/5.png", "images/6.png", "images/7.png", "images/8.png")
  rewardImg = loadImage("images/reward.png")
  enemyImg = loadAnimation("images/r1.png", "images/r2.png",  "images/r4.png", "images/r5.png", "images/r6.png", "images/r7.png", "images/r8.png")
  gameOverImg = loadImage("images/game over.png")
  playButtonImg = loadImage("images/play-button.png")
  coinImg = loadImage("images/coin.png")
  prizeImg = loadImage("images/finish.png")
  bombImg= loadImage("images/bomb.png")
  gunImg = loadImage("images/gun.png")
  bulletImg = loadImage("images/bullet.png")
 
}
function setup(){
  canvas = createCanvas(displayWidth-20, displayHeight-20);
  bg=createSprite(displayWidth/2, displayHeight/2,displayWidth, displayHeight)
  bg.addImage(bg3)
  bg.velocityX=-4

  player = createSprite(50, displayHeight-100)
  player.addAnimation("player", Img)
  player.scale=0.7
  

  invisibleGround=createSprite(displayWidth/2, displayHeight-50,displayWidth, 3);
  invisibleGround.visible=false

  reward = createSprite(displayWidth-1300, 150, 100, 50)
  reward.addImage(rewardImg);
  reward.scale=0.2
  reward.visible=false;
  
  gameOver = createSprite(displayWidth-650, 400)
  gameOver.addImage(gameOverImg)
  gameOver.visible=false;

  playButton = createSprite(displayWidth-650, 600);
  playButton.addImage(playButtonImg);
  playButton.scale =0.2
  playButton.visible=false;

  prize = createSprite(displayWidth-1200, 150)
  prize.addImage(prizeImg)
  prize.scale=0.2
  prize.visible=false;

  kill= createSprite(displayWidth-1200, 730)
  kill.addImage(gunImg)
  kill.scale=0.3
  kill.visible=false;

  
  

 
  


  goldBlockGroup = new Group();
  normalBlockGroup = new Group();
enemyGroup = new Group();
coinGroup = new Group();
bombGroup = new Group();
gunGroup = new Group();
  bulletGroup = new Group();


  
  
}


function draw(){
  background("white");
  if(gameState === "PLAY"){
    enemyBlock()
    goldBlock();
    normalBlock();
    coinBlock();
    bombBlock();
    gunBlock();

if(gunGroup.collide(player)){
  gunGroup.destroyEach();
  kill.visible=true;
}

if(mousePressedOver(kill)){
  bullet = createSprite(displayWidth-1250, displayHeight-100)
  bullet.addImage(bulletImg)
  bullet.scale=0.3

  bulletGroup.add(bullet)
kill.visible=false;
bulletGroup.setVelocityXEach(2)
}
if(bulletGroup.collide(enemyGroup)){
enemyGroup.destroyEach();
bulletGroup.destroyEach();
score=score+50
}

   if(coinGroup.collide(player)){
     coinGroup.destroyEach();
     score=score+50
     prize.visible=true;

   }
   
   

    if(bg.x<0){
      bg.x=displayWidth/2
    }
    if(goldBlockGroup.collide(player)){
      goldBlockGroup.destroyEach();
      score=score+200
      reward.visible=true
  
    }                                                      
    if(normalBlockGroup.collide(player)){
      normalBlockGroup.destroyEach();
      score=score+100
    }
    if(mousePressedOver(reward)){
      score=score+100
      reward.visible=false;
    }
    if(mousePressedOver(prize)){
      enemyGroup.destroyEach();
      prize.visible=false;
    }
    player.velocityY=player.velocityY+1
  if(enemyGroup.collide(player) || bombGroup.collide(player)){
    gameState="END"
    score=score-200
    gameOver.visible=true;
    player.visible=false;
    bg.velocityX=0
    enemyGroup.setVelocityXEach(0);
    enemyGroup.destroyEach();
    goldBlockGroup.setVelocityXEach(0);
    goldBlockGroup.destroyEach();
    normalBlockGroup.setVelocityXEach(0);
    normalBlockGroup.destroyEach();
    playButton.visible=true;
    coinGroup.destroyEach();
    coinGroup.setVelocityXEach(0);
    bombGroup.destroyEach();
    bombGroup.setVelocityXEach(0)
    gunGroup.destroyEach();
    gunGroup.setVelocityXEach(0);
    
    
  }
  }
 if(mousePressedOver(playButton)){
   gameState="PLAY";
   gameOver.visible=false;
   playButton.visible=false;
   player.visible=true;
   prize.visible=false;
   bg.velocityX=-4
   score=0;
 }
 
  
 
  player.collide(invisibleGround)
  
 
  
  
  
   drawSprites();
   textSize(30)
    textStyle(BOLD)
    text("Developed By:Divyanshu Dhudhuani Pune Date:3/4/2021", displayWidth-900, 730)
   if(gameState === "PLAY"){
    textSize(30)
    text("score :"+ score,displayWidth-300, 150 )
    
 
   }else if(gameState === "END"){
    textSize(20)
    textStyle(BOLD)
    text("Final score :"+ score,displayWidth/2-100, 250 )
 
   }
   
}
function goldBlock(){
  if(frameCount % 400 == 0){
    gold=createSprite(displayWidth, random(displayHeight/2-200, displayHeight/2))
    gold.addImage(goldImage)
    gold.scale= 0.5
    gold.velocityX=-2
    gold.lifeTime = displayWidth/2
    player.depth=gold.depth+1
    
    goldBlockGroup.add(gold)
  }
  
}
function normalBlock(){
  if(frameCount % 150 == 0){
    normal = createSprite(displayWidth, random(displayHeight/2-50, displayHeight/2+200))
    normal.addImage(normalImage)
    normal.scale=0.5
    normal.velocityX=-2
    normal.lifeTime=displayWidth/2
    player.depth=normal.depth+1
    normalBlockGroup.add(normal)
  }
}
function coinBlock(){
  if(frameCount % 400 == 0){
    coin = createSprite(displayWidth-100, displayHeight-100)
    coin.addImage(coinImg);
    coin.scale=0.2
    coin.velocityX=-4;
    coin.lifetime=displayWidth/4
    player.depth=coin.depth+1
    coinGroup.add(coin)
    

  }
}



function keyPressed(){
  if(keyCode === 32){
  player.velocityY = -30

}
}
function enemyBlock(){
  if(frameCount % 200 === 0){
    enemy = createSprite(displayWidth-50, displayHeight-100)
  enemy.addAnimation("enemy", enemyImg)
  enemy.velocityX=-6
  enemy.scale=0.2
  enemy.lifeTime=displayWidth/6
  enemyGroup.add(enemy)
  


  }
}
function gunBlock(){
  if(frameCount % 450 === 0){
    gun = createSprite(displayWidth-50, displayHeight-100)
    gun.addImage(gunImg)
    gun.velocityX=-4
    gun.scale=0.2
    gun.lifeTime=displayWidth/4
    gunGroup.add(gun)

  }
}
function bombBlock(){
  if(frameCount % 150 === 0){
    bomb = createSprite(displayWidth-50, displayHeight-100)
    bomb.addImage(bombImg);
    bomb.velocityX=-4
    bomb.scale=0.2
    bomb.lifeTime=displayWidth/4
    bombGroup.add(bomb)
    

  }
}
