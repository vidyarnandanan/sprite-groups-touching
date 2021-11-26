var spaceShip, ssimg
var space
var space1img
var space1
var alien, alienimg, alienGroup
var bullet, bulletGroup
var score = 0
var blastimg
var gameState = "play"
var gameover, overImg


function preload() {
    ssimg = loadImage("spaceship.png")
    space1img = loadImage("um.jpg")
    alienimg = loadImage("aliens.png")
    blastimg = loadImage("blast.png")
    overImg = loadImage("gameOver.jpg")


}

function setup() {
    createCanvas(500, 500);

    space1 = createSprite(250, 250, 10, 10)
    space1.addImage(space1img)
    space1.velocityY = 1
    space1.scale = 0.7


    spaceShip = createSprite(250, 400, 10, 10)
    spaceShip.addImage(ssimg)
    spaceShip.scale = 0.3
    spaceShip.debug = true


    bulletGroup = new Group()
    alienGroup = new Group()




}

function draw() {
    background("black");

    if (gameState === "play") {
        if (keyDown("RIGHT_ARROW")) {
            spaceShip.x = spaceShip.x + 5
        }

        if (keyDown("LEFT_ARROW")) {
            spaceShip.x = spaceShip.x - 5
        }

        if (space1.y > 500) {
            space1.y = 100
        }

        spawnAlien()

        if (keyDown("ENTER")) {
            bullet = createSprite(spaceShip.x, spaceShip.y, 5, 20)
            bullet.velocityY = -4
            bullet.shapeColor = "white"
            bulletGroup.add(bullet)
        }

        for (var i = 0; i < alienGroup.length; i++) {
            for (var j = 0; j < bulletGroup.length; j++) {
                // console.log(alienGroup.get(i))
                if (alienGroup.get(i) && bulletGroup.get(j) && alienGroup.get(i).isTouching(bulletGroup.get(j))) {
                    console.log('test')
                    alienGroup.get(i).destroy();
                    bulletGroup.get(j).destroy()
                    // spaceShip.addImage(blastimg)
                    // gameState="end"
                    score = score + 1

                }
            }
        }

        for (var i = 0; i < alienGroup.length; i++) {

            if (alienGroup.get(i).isTouching(spaceShip)) {
                alienGroup.get(i).destroy();
                // bulletGroup.get(j).destroy()
                spaceShip.addImage(blastimg)
                gameState = "end"


            }





        }


    }

    if (gameState === "end") {
        gameover = createSprite(250, 250, 10, 10)
        gameover.addImage(overImg)
        gameover.scale = 0.5

        space1.velocityY = 0
        alienGroup.setVelocityEach(0)
        spaceShip.velocityX = 0



    }


    edges = createEdgeSprites()
    spaceShip.bounceOff(edges)

    // console.log("minha")








    drawSprites()
    textSize(25)
    fill("white")
    text("score:"+score, 400, 50)
}

function spawnAlien() {
    if (frameCount % 80 === 0) {
        alien = createSprite(Math.round(random(0, 500)), 0, 10, 10)
        alien.debug = true
        alien.velocityY = 3
        alien.addImage(alienimg)
        alien.scale = 0.1
        alienGroup.add(alien)
    }

}



