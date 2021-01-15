var dog,happyDog,dogImg;
var database;
var foodS,foodStock;
var feedTime, lastFed, feed, addFood, foodObj;
var garden, washroom, bedroom;
var gameState, readState;
var currentTime;

function preload(){
  dogImg = loadImage("dogImg.png");
  happyDog = loadImage("dogImg1.png");
  garden = loadImage("Garden.png");
  washroom = loadImage("Washroom.png");
  bedroom = loadImage("Bedroom.png");
}

function setup() {
  createCanvas(700,600);
  database = firebase.database();
  
  foodObj = new Food();
  
  foodStock = database.ref('Food');
  foodStock.on("value", readStock);

  //read game state from database
  readState= database.ref('gameState');
  readState.on("value",function(data){
    gameState=data.val();
  });

  feedTime=database.ref('feedTime');
  feedTime.on("value",function(data){
    lastFed=data.val();
  });

  dog = createSprite(450,220,20,20);
  dog.addImage(dogImg);
  dog.scale = 0.25;
  
  feed = createButton("FEED");
  feed.position(400, 100);
  feed.mousePressed(feedDog);

  addFood = createButton("ADD FOOD");
  addFood.position(500, 100);
  addFood.mousePressed(addMilk);
}

function draw() {  
  background(100,150,100);
  currentTime= hour();

  if(currentTime===(lastFed+1)){
      update("Playing");
      foodObj.garden();
   }
   
   else if(currentTime===(lastFed+2)){
    update("Sleeping");
    foodObj.bedroom();
   }
   
   else if(currentTime>(lastFed+2) && currentTime<=(lastFed+4)){
    update("Bathing");
    foodObj.washroom();
   }
   
   else{
    update("Hungry")
    foodObj.display();
   }
   
   if(gameState!="Hungry"){
     feed.hide();
     addFood.hide();
     dog.remove();
   }
   
   else{
    feed.show();
    addFood.show();
    dog.addImage(dogImg);
   }
 
  drawSprites();
}


//function to read values from DB
function readStock(data){
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}

  function feedDog(){
    dog.addImage(happyDog);
    foodObj.updateFoodStock(foodObj.getFoodStock()-1)
    database.ref('/').update({
      Food:foodObj.getFoodStock(),
      feedTime:hour(),
      gameState:"Hungry"
    })
  }

  function addMilk(){
    foodS++
    database.ref('/').update({
      Food:foodS
    })
  }

//update gameState
function update(state){
  database.ref('/').update({
    gameState:state
  })
}
