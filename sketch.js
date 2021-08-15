var rocket, monsters, bullet;
var leftEdge, rightEdge, topEdge;
var bulletGroup;
var database;
var bgImg, roktImg, monstrImg, bulltImg;
var bulletFired;

function preload()
{
    bgImg = loadImage("img/background.png");
    roktImg = loadImage("img/space shp.png");
    monstrImg = loadImage("img/enemy.png");
    bulltImg = loadImage("img/bullet.png");
    // console.log(bulletFired);
}


function setup()
{
    createCanvas(900, 550);
    database = firebase.database();
    // creating Rocket
    rocket = createSprite(width/2, 480, 80, 80);
    rocket.addImage(roktImg);
    rocket.scale = 0.25;


    monsters = createSprite(width/2, 100, 200, 200);
    monsters.addImage(monstrImg);
    monsters.scale = 0.27;
    monsters.velocityX = 5;

    // creating Bullets
    // bullet = createSprite(405, 480, 300, 300);
    // bullet.addImage(bulltImg);
    // bullet.scale = 0.1;
    // bullet.visible = true;
    // bullet.lifetime = 150;

    // Creating Edges
    leftEdge = createSprite(6, height/2, 10, 900);
    rightEdge = createSprite(894, height/2, 10, 900);
    topEdge = createSprite(width/2, 6, 900, 10);
    
    bulletGroup = new Group();

    creatingBullet();
    // creatingMonsters(); 
}


function draw()
{
    background(bgImg);
    text("X:"+mouseX+ " Y:"+mouseY, 100, 50);
    // monsters.debug = true;
    // bullet.debug = true;
    // console.log(bulletGroup);
    monsters.bounceOff(rightEdge);
    monsters.bounceOff(leftEdge);
    rocket.collide(leftEdge);
    rocket.collide(rightEdge);
    // The bug is here
    if(frameCount%50==0)
    {
       creatingMonsters();       
    }
    
    if(monsters.x>855 || monsters.x<40)
    {
        monsters.y = monsters.y+20;
    }

    if(monsters.y>430)
    {
        alert("end");
    }


    // creatingBullet();
    if(bullet.y>300 && bullet.y<330)
    {
        creatingBullet();
        // alert(bullet.y);
    }
    
    if(bullet.y<1)
    {
        bullet.x = rocket.x;
        bullet.y = rocket.y;
        bullet.velocityY = 0;
    }
    
    
    if(bullet.y>470)
    {
        bullet.x = rocket.x;
    }
    
    if(keyDown("left"))
    {
        rocket.x = rocket.x-10;
    }
    if(keyDown("right"))
    {
        rocket.x = rocket.x+10;
    }
    // bullet.x = monsters.x;
    // bullet.y = monsters.y;

    if(monsters.x==bullet.x && monsters.y==bullet.y)
    {
        alert("hello");
        // console.log("shddf");
        // updateBulletCount(bulletFired+2);
    }
    

    
    if(keyDown("Space"))
    {
        // alert(bulletFired);
        // bullet.visible = true;
        bullet.velocityY = -8;
        // updateBulletCount(bulletFired+2);
    }
    
    // if(keyCode==112)
    // {
        
        // }
        
        fill("yellow");
        text("Bullet Fired: "+bulletFired, 790, 50)
        getBullet();
        // mousePressed();
        drawSprites();
    }
    
    function creatingBullet()
    {
        // creating Bullets
        bullet = createSprite(rocket.x, 480, 300, 300);
        bullet.addImage(bulltImg);
        bullet.scale = 0.1;
        bullet.visible = true;
        bulletGroup.add(bullet);
    
}

function creatingMonsters()
{
    //creating Monsters
    monsters = createSprite(width/2, 100, 200, 200);
    monsters.addImage(monstrImg);
    monsters.scale = 0.27;
    monsters.velocityX = 5;
}


function getBullet(){
    bulletCountRef  = database.ref('bulletCount');
    bulletCountRef.on("value", function(data){
       bulletFired = data.val();
    })
  }

function updateBulletCount(fire){
    database.ref('/').update({
        bulletCount : fire
    });
  }

//   function mousePressed()
//   {
//    creatingBullet();

   
//         bullet.visible = true;
//         bullet.velocityY = -7;
// }
