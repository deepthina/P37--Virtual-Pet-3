var dog, dogImage, dogHappyImage;

var database;
var readFood, food;

var bottle, bottleImage;

var form, milk;

var readLastFeed, lastFed;

var gameState;

var bck;


function preload() {
  dogImage = loadImage("images/dogImg.png");
  dogHappyImage = loadImage("images/dogImg1.png");
  sadDogImage = loadImage("images/Lazy.png");
  gardenImage = loadImage("images/Garden.png");
  bedroomImage = loadImage("images/Bed Room.png");
  washroomImage = loadImage("images/Wash Room.png");
}

function setup() {
  createCanvas(800, 800);

  dog = createSprite(600, 500);
  dog.addImage("dog", dogImage);
  dog.addImage("dog happy", dogHappyImage);
  dog.addImage("sad dog", sadDogImage);

  dog.scale = 0.3;

  database = firebase.database();

  readFood = database.ref("Food");
  readFood.on("value", readMilk);

  readLastFeed = database.ref("lastFed");
  readLastFeed.on("value", readFeed);

  readGameState = database.ref("gameState");
  readGameState.on("value", readGame);

  bck = createSprite(400, 400, 1000, 800);
  bck.visible = false;

  form = new Form();
  milk = new Food();

}


function draw() {
  background("green");

  form.display();
  milk.display();

  drawSprites();

  textSize(15);
  fill("white");

  if (lastFed > 12)
    text("Last Feed: " + (lastFed % 12) + " PM", 230, 65);

  else if (lastFed == 0)
    text("Last Feed: " + 12 + "AM", 230, 65);

  else
    text("Last Feed: " + lastFed + "AM", 230, 65);


  if (hour() === lastFed + 1) {
    gameState = "playing";
    writeGame(gameState);
    bck.visible = true;
    bck.y = 150;
    bck.scale = 1.7;
    bck.addImage("garden", gardenImage);
  }

  if (hour() === lastFed + 2) {
    gameState = "sleeping";
    writeGame(gameState);
    bck.visible = true;
    bck.scale = 2;
    bck.addImage("bedroom", bedroomImage);
  }

  if (hour() > lastFed + 2 && (hour() < lastFed + 4)) {
    gameState = "bathroom";
    writeGame(gameState);
    bck.visible = true;
    bck.y = 150;
    bck.scale = 1.7;
    bck.addImage("washroom", washroomImage);
  }

  else
    form.display();


}


function writeMilk(food) {
  database.ref("/").update({ Food: food });
  lastFed = hour();
  writeFeed(lastFed);
}



function readMilk(data) {
  food = data.val();
}

function readFeed(data) {
  lastFed = data.val();
}


function writeFeed(lastFed) {
  database.ref("/").update({ lastFed: lastFed });
}


function readGame(data) {
  gameState = data.val();
}


function writeGame(state) {
  database.ref("/").update({ gameState: state });
}