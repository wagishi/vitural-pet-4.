//Create variables here
var database ;
var dog,happyDog,happydogImage,dogImage;
var washroom,bedroom,garden;
var feed,addFood,Bath,Sleep,Play,PlayInGarden,buttons;
var foodStock,foodS;
var lastfeed,feedTime;
var foodObj;
var gameState = "Hungry";
var milkBottle2;

function preload()
{
	//load images here
  dogImage = loadImage("images/dogImg.png");
  happydogImage = loadImage("images/dogImg1.png");
  garden = loadImage("images/Garden.png");
  washroom = loadImage("images/Wash Room.png");
  bedroom = loadImage("images/Bed Room.png");
  livingroom = loadImage("images/Living Room.png")
  milkImg = loadImage("images/Milk.png");
}

function setup() {
	createCanvas(1300, 600);

  database = firebase.database();
  foodStock = database.ref('food')
  foodStock.on("value",readStock);
 
  dog = createSprite(1000,300,10,10);
  dog.addImage(dogImage)
  dog.scale=0.2

  foodObj = new food();

  //read game state from datbase
  readState = database.ref("gameState");
  readState.on("value",function(data){
    gameState = data.val();
  });

  milkBotltle1 = createSprite(140,435,10,10);
  milkBotltle1.addImage(milkImg);
  milkBotltle1.scale = 0.025;

  milkBotltle2 = createSprite(210,280,10,10);
  milkBotltle2.addImage(milkImg);
  milkBotltle2.scale = 0.025;
  milkBotltle2.visible = false;

}

function draw() {  
  background(46, 139, 87);

  if(foodS == 0){
    dog.addImage(happyDog);
    milkBotltle2.visible=false;
  }else{
    dog.addImage(dogImage);
    milkBotltle2.visible=true;
  }

  foodObj.display();
  writeStock(foodS);

  if(gameState === 1){
    dog.addImage(happydogImage);
    dog.scale = 0.175;
    dog.y = 250;
  }

  if(gameState === 2){
    dog.addImage(dogImage);
    dog.scale = 0.175;
    milkBottle2.visible = false;
    dog.y = 250;
  }

  var Bath=createButton("I want to take bath");
  Bath.position(580,125);
  if(Bath.mousePressed(function(){
    gameState=3;
    database.ref('/').update({'gameState':gameState});
  }));

  if(gameState === 3){
    dog.addImage(washroom);
    dog.scale = 1;
    milkBottle2.visible = false;
  }

  var Sleep=createButton("I am very sleepy");
  Sleep.position(710,125);
  if(Sleep.mousePressed(function(){
    gameState=4;
    database.ref('/').update({'gameState':gameState});
  }));

  if(gameState === 4){
    dog.addImage(bedroom);
    dog.scale = 1;
    milkBottle2.visible = false;
  }

  var Play=createButton("Lets play !");
  Play.position(500,160);
  if(Play.mousePressed(function(){
    gameState=5;
    database.ref('/').update({'gameState':gameState});
  }));

  if(gameState === 5){
    dog.addImage(livingroom);
    dog.scale = 1;
    milkBottle2.visible = false;
  }

  var PlayInGarden=createButton("Lets play in park");
  PlayInGarden.position(585,160);
  if(PlayInGarden.mousePressed(function(){
    gameState=6;
    database.ref('/').update({'gameState':gameState});
  }));

  if(gameState === 6){
    dog.addImage(garden);
    dog.scale = 1;
    milkBottle2.visible = false;
  }

drawSprites();
textSize(17);
  fill("black");
  text("Milk Bottles Remaining  "+foodS,170,440);
}

function readStock(data){
  foodS = data.val()
}

function writeStock(x){
  database.ref('/').update(
    {
      food:x
    }
  )
}

