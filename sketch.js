
var hen,henImage;
var basket,basketimage;
var basket1
var egg, eggimage,eggGroup,eggsound;

var ground,score,life;

var gameState="start"; 
function preload(){
  henimage= loadImage("hen.png")
  basketimage =loadImage("basket.png")
  eggimage= loadImage("egg.png")
  eggsound =loadSound("touch.mp3")
}


function setup() {

  createCanvas(500,400);

  for(var i=60;i<500;i=i+70){
     hen = createSprite(i,110,100,100)
     hen.addImage(henimage)
  }
 basket  = createSprite(200,390,10,10);
 basket.addImage(basketimage);
 basket.debug =true;
  ground = createSprite(250,400,500,20)
  ground.shapeColor ="green";

  eggGroup = new Group();
  score =0;
  life=3;

  basket1  = createSprite(100,390,10,10);
 basket1.addImage(basketimage);
 basket1.debug =true;
  

}

function draw() {
  background(255);
  
  //creating ground1-- black color
  fill("black")
  rect(0,0,500,400)

  //creating shelf -- hens to be placed
  fill("maroon");
  rect(0,0,500,150);

  textSize(25)
  fill("white")
  text("score:  "+score,385,20)
  text("life:  "+life,100,20)
 
  // calling egg creation 
  if( gameState==="start"){

    if(keyDown("left")){
      basket.x=basket.x-4
    }
    if(keyDown("right")){
      basket.x =basket.x+4
    }
    
      createegg()
    
     
    if(eggGroup.isTouching(basket)){
       eggsound.play();
      eggGroup.destroyEach();
      score =score+10;
     }

     if(eggGroup.isTouching(ground)){
      eggGroup.destroyEach();
       life = life-1;
     }
       
      if(life===0){
        gameState = "gameOver";
                         
      }

    }      
    else if(gameState==="gameOver"){

          fill("white")
           textSize(25)
        text("gameOver",200,275)
        text("press R to restart",200,300)
        eggGroup.setVelocityYEach(0);
       
      }


      if(keyDown("r")&& gameState==="gameOver"){

        reset();
      }
    
   


 
  
  basket.collide(ground);
  //basket.bounceOff(edges[0]);
  //basket.bounceOff(edges[1]);
drawSprites();

}

function createegg(){
 if(frameCount % 60 === 0){
  var egg= createSprite(60,150,10,10);
  egg.setCollider("rectangle",0,0,10,10)
  egg.debug =true;
  egg.x  = Math.round(random(110,460))
  egg.velocityY = 4;
  egg.addImage(eggimage)
  egg.scale =0.4
  egg.lifetime = 75
  egg.depth = basket.depth;
  basket.depth = basket.depth+1;
  eggGroup.add(egg)
  
 }
}

 function reset(){
 score = 0;
 life = 3;
 gameState="start"

 }



