
var rocket, monsters, bullet;
var leftEdge, rightEdge;
var bulletGroup;
var bgImg, roktImg, monstrImg, bulltImg;

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
    bullet.visible = false;
    bullet.lifetime = 130;

    // Creating Edges
    leftEdge = createSprite(6, height/2, 10, 900);
    rightEdge = createSprite(894, height/2, 10, 900);
    
    bulletGroup = new Group();
}


function draw()
{
    background(bgImg);
    
    monsters.bounceOff(rightEdge);
    monsters.bounceOff(leftEdge);
    rocket.collide(leftEdge);
    rocket.collide(rightEdge);

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

    if(keyDown("Space"))
    {
        bullet.visible = true;
        bullet.velocityY = -7;
    }
    
    drawSprites();
}

function creatingBullet()
{
    // creating Bullets
    bullet = createSprite(405, 480, 20, 40);
    bullet.addImage(bulltImg);
    bullet.scale = 0.1;
    bullet.visible = false;
    bullet.lifetime = 130;
    bulletGroup.add(bullet);
}