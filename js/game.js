var anim;
var timer;
var music;
var background;
var badgers;
var numBadgers = 0;
var snake;
var startButton;
var startGame = false;
const MAX_BADGERS = 12;
const HORIZON = .43;
var badgerCounter=0;
var mushroomCounter = 0;
var scene;
var mushroom1;
var mushroom2;
var badgerPhase = true;
var mushroomPhase = false;
var snakePhase = false;
var badgerRound = 1;
class Example extends Phaser.Scene {
  constructor() {
    super();
  }
  preload() {
    scene = this;
    this.load.path = './assets/images/';
    this.load.image('background','background.png');
    this.load.image('startButton','start button.png');
    this.load.image('mushroom','mushroom.png');
    this.load.spritesheet('badger', 'badger.png', { frameWidth: 320, frameHeight: 300 });
    this.load.spritesheet('snake', 'snake.png', { frameWidth: 294, frameHeight: 240 });

    this.load.path = '../assets/sounds/';
    this.load.audio('theme', 'badgers.wav');
  }

  create() {
    background = this.add.image(0,0,'background').setOrigin(0,0).setScale(2);
    startButton = this.add.image(config.width*.3,config.height*.4,'startButton').setOrigin(0,0).setScale(3); 
    startButton.setInteractive();
    startButton.on('pointerdown', () => 
      {
        buttonDown();
        startGame = true;
      });
      badgers = this.add.group();  
      mushroom1 = this.add.sprite(0,game.config.height/2,'mushroom').setOrigin(0,0).setScale(.5).setVisible(false);
      mushroom2 = this.add.image(400,game.config.height/2,'mushroom').setOrigin(0,0).setScale(.5).setVisible(false);
      snake = this.add.sprite(-100,game.config.height/2,'snake').setOrigin(0,0).setVisible(false);
      scene.anims.create({
        key: 'snake',
        frames: scene.anims.generateFrameNumbers('snake',
          {
            start: 0,
            end: 3
          }),
        frameRate: 16,
        repeat: -1
      });
      snake.anims.play('snake');    
    }

  update() {
  if(startGame)
  {
    console.log(badgerRound);
    if(badgerPhase)
      if(numBadgers < MAX_BADGERS)   
       {
        if(++badgerCounter>50)
        {
        createBadger(this);
        badgerCounter=0;
        }
      }
      else
      {
        let allSprites = this.children.list.filter(x => x instanceof Phaser.GameObjects.Sprite && x.name=='badger');
        allSprites.forEach(x => x.destroy());
        numBadgers = 0;
      
        
      badgerRound = badgerRound==1? 2 : 1;      
      badgerPhase = false;
      mushroomPhase = true;
    }
  } 
if(mushroomPhase)
  {

    mushroom1.setVisible(true);
    if(++mushroomCounter>100)
    {
      mushroom2.setVisible(true);
    }
    if(mushroomCounter>200)
    {
      mushroom1.setVisible(false);
      mushroom2.setVisible(false);
      if(badgerRound==2)
      {
        badgerPhase = true;
        mushroomPhase = false;
      }
      if(badgerRound==1)
      {
        snakePhase = true;
        mushroomPhase = false;
      }
      mushroomPhase = false;
      mushroomCounter = 0;
    }
  }
  
if(snakePhase)
    {
snake.visible = true;
snake.x++;
if(snake.x> game.config.width)
{
  badgerPhase = true;
  snakePhase = false;
  snake.x = -100;
  snake.visible = false;
  badgerRound = 1;
}
    }
} 
}
function buttonDown() {
    music = scene.sound.add('theme');
    startButton.visible = false;
}

function createBadger(scene){
  var badgerX = game.config.width * Phaser.Math.FloatBetween(.05, 1);
  var badgerY = game.config.height * Phaser.Math.FloatBetween(HORIZON, .8);
  var badgerScale = Math.abs(((game.config.height*HORIZON)-badgerY)/200);
  var badger = scene.add.sprite(badgerX, badgerY, 'badger');
  badger.setScale(badgerScale);
  scene.anims.create({
  key: 'badgerDance'+numBadgers,
  frames: scene.anims.generateFrameNumbers('badger',
    {
      start: 0,
      end: 5
    }),
  frameRate: 16,
  repeat: -1
});
badger.anims.play('badgerDance'+numBadgers);
badger.setDepth(badgerScale);
badger.name='badger';
badgers.create(badger);
numBadgers++;
}
  

const config = {
  type: Phaser.AUTO,
  parent: 'phaser-example',
  width: 800,
  height: 600,
  scene: Example
};

const game = new Phaser.Game(config);