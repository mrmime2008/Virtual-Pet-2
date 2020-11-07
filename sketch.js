//Create variables here
var dog, happyDog, normDog, database, foodS, foodStock;
var feed, addfoods;
var fedTime, lastFed;
var foodObj;
var changeState;
var readState;
var bedroom, washroom, garden;
var currenttime;
var gameState;


function preload()
{
  happyDog = loadImage("happydog.png");
  normDog = loadImage("Dog.png");
  bedroom = loadImage("Bedroom.png");
  garden = loadImage("Garden.png");
  washroom = loadImage("Washroom.png");
  
}

function setup() {
  createCanvas(1000, 400);
  database = firebase.database();

  foodObj = new Food();

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);

  dog = createSprite(250,250,20,20);
  dog.addImage(normDog);
  dog.scale = 0.15;
  

  feed = createButton("Feed Dog");
  feed.position(700,95);
  feed.mousePressed(feedDog); 

  addFoods = createButton("Add More Food");
  addFoods.position(800,95);
  addFoods.mousePressed(addFood);

  readState = database.ref('gameState');
  readState.on("value", function(data){
    gameState = data.val();
  })

  fedTime = database.ref('FeedTime');
  fedTime.on("value", function(data){
    lastFed = data.val();
  })
  
}



function draw() {  
  background("green");

  fill(255,255,254);
  textSize(15);
  

  if(currenttime === lastFed + 1){
    // text("Current Time: "+ currenttime%12 + " PM",10,30);
    foodObj.garden();
  }else if (currenttime === lastFed + 2){
    // text("Current Time: 12 AM",10,30);
    foodObj.bedroom();
  }else if(currenttime > lastFed + 2 && currenttime <= lastFed + 4){
    // text("Current Time: " + currenttime + " AM",10,30);
    foodObj.washroom();
  }else{
    foodObj.display();
  }
  

  if(gameState !== "hungry"){
    feed.hide;
    addFoods.hide;
    dog.remove;
  }else{
    feed.show;
    dog.show;
    dog.addImage(normDog);
  }


  // if(currenttime === lastFed + 1){
  //   foodObj.garden();
  //   gameState = "playing";
  //   database.ref('/').update({
  //     gameState: "playing"
  //   })

  // }
  
  foodObj.display();
  
  drawSprites();

}

function readStock(data){
  foodS = data.val;
  foodObj.updateFoodStock(foodS);
}

function feedDog(){
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food: foodObj.getFoodStock(),
    FeedTime: hour(),
    gameState: "hungry"
  })
}

function addFood(){
  foodS++;
  database.ref('/').update({
    Food: foodS
  })
}



function update(state){
  database.ref('/').update({
    gameState: state
  })
}


