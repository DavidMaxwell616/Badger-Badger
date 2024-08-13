var anim;
var timer;
var music;
var background;
var badgers = [];
var numBadgers = 0;
const MAX_BADGERS = 10;
const HORIZON = .46;
var badgerCounter=0;

class Example extends Phaser.Scene {
  constructor() {
    super();
  }

  preload() {
    this.load.path = './assets/images/';
    this.load.image('background','background.png');
    this.load.spritesheet('badger', 'badger.png', { frameWidth: 320, frameHeight: 300 });

    this.load.path = '../assets/sounds/';
    this.load.audio('theme', 'badgers.wav');
  }

  create() {
    background = this.add.image(0,0,'background').setOrigin(0,0).setScale(2);
 
    //   music = this.sound.add('theme');
    //   timer = this.time.addEvent({
    //     delay: 5000,
    //     callback: ()=>{music.play()},
    //     loop: false
    // });
      
  }
  update() {
    if(numBadgers < MAX_BADGERS)   
    {
      if(++badgerCounter>100)
      {
      createBadger(this);
      badgerCounter=0;
    }  
  }
  }
}

function createBadger(scene){
  var badgerX = game.config.width * Phaser.Math.FloatBetween(.01, 1);
  var badgerY = game.config.height * Phaser.Math.FloatBetween(HORIZON, .9);
  var badgerScale = Math.abs(((game.config.height*HORIZON)-badgerY)/200);
  var badger = scene.add.sprite(badgerX, badgerY, 'badger');
  badger.setScale(badgerScale);
  scene.anims.create({
  key: 'badgerDance'+numBadgers,
  frames: scene.anims.generateFrameNumbers('badger',
    {
      start: 0,
      end: 12
    }),
  frameRate: 16,
  repeat: -1
});
badger.anims.play('badgerDance'+numBadgers);
badger.setDepth(badgerScale);
badgers.push[badger];
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
