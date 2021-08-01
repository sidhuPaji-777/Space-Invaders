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
}


function setup()
{
    createCanvas(900, 550);
    database = firebase.database();
    // creating Rocket
    rocket = createSprite(width/2, 480, 80, 80);
    rocket.addImage(roktImg);
    rocket.scale = 0.25;


    // creating Monsters
    monsters = createSprite(width/2, 100, 50, 50);
    monsters.addImage(monstrImg);
    monsters.scale = 0.3;
    monsters.velocityX = 5;

    // creating Bullets
    bullet = createSprite(405, 480, 20, 40);
    bullet.addImage(bulltImg);
    bullet.scale = 0.1;
    bullet.visible = true;
    // bullet.lifetime = 150;

    // Creating Edges
    leftEdge = createSprite(6, height/2, 10, 900);
    rightEdge = createSprite(894, height/2, 10, 900);
    topEdge = createSprite(width/2, 6, 900, 10);
    
    bulletGroup = new Group();

    console.log(bulletFired);
    
}


function draw()
{
    background(bgImg);
    
    // console.log(bulletGroup);
    monsters.bounceOff(rightEdge);
    monsters.bounceOff(leftEdge);
    rocket.collide(leftEdge);
    rocket.collide(rightEdge);
    
    if(bulletGroup.isTouching(topEdge))
    {
        bullet.destroy();
    }

    if(bullet.y>300 && bullet.y<330)
    {
        creatingBullet();
        // alert(bullet.y);
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
    // to read the bullet count firest
    // if(keyDown("S"))
    // {
    //     alert(bulletFired);
    
    // }
    
    if(keyDown("Space"))
    {
        // alert(bulletFired);
        bullet.visible = true;
        bullet.velocityY = -7;
        updateBulletCount(bulletFired+2);
    }
    
    // if(keyCode==112)
    // {
        
        // }
        
        fill("yellow");
        text("Bullet Fired: "+bulletFired, 790, 50)
        getBullet();
        drawSprites();
    }
    
    function creatingBullet()
    {
        // creating Bullets
        bullet = createSprite(405, 480, 20, 40);
        bullet.addImage(bulltImg);
        bullet.scale = 0.1;
        bullet.visible = false;
        bulletGroup.add(bullet);
        if(bullet.y>100){

            bullet.lifetime = 150;
        }
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
