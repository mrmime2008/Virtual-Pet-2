//Create variables here
var dog, happyDog, normDog, database, foodS, foodStock;
var feed, addfood;
var fedTime, lastFed;
var foodObj;



function preload()
{
  happyDog = loadImage("happydog.png");
  normDog = loadImage("Dog.png")
}

function setup() {
  createCanvas(1000, 400);
  database = firebase.database();

  foodObj = new Food();

  foodStock = database.ref('Food')
  foodStock.on("value",readStock);

  dog = createSprite(250,250,20,20);
  dog.addImage(normDog);
  dog.scale = 0.15;
  

  feed = createButton("Feed Dog");
  feed.position(700,95);
  feed.mousePressed(feedDog); 

  addFood = createButton ("Add More Food");
  addFood.position(800,95);
  addFood.mousePressed(addFood)
  
}



function draw() {  
  background(46, 139, 87);
  drawSprites();

  foodObj.display();

  fedTime = database.ref('FeedTime')
  fedTime.on("value", function(data){
    lastFed = data.val();
  })
  
  fill(255,255,254);
  textSize(15);
  if(lastFed >= 12){
    text("Last Fed: "+ lastFed%12 + "PM",350,30);
  }else if (lastFed === 0){
    text("Last Fed: 12 AM",350,30);
  }else{
    text("Last Fed: " + lastFed + "AM",350,30);
  }

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
    FeedTime:hour()
  })
}

function addFood(){
  foodS++;
  database.ref('/').update({
    Food: foodS
  })
}
