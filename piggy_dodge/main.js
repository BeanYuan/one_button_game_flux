title = "FLUX";

description = `
[Tap] Switch
`;

characters = [
  `
 l  l
 l  l
llllll
ll l l
ll l l
llllll
`
];

options = {
  isPlayingBgm: true,
  isReplayEnabled: true,
	theme: "crt"
};

let red_block_index = 0;
let blue_block_index = 0;
let baseSpeed = 0.5; 
let spawnInterval = 25 / baseSpeed; 
let transparentRed = false;
let transparentBlue = false;
let changeToggle = 0;

let red_block_list = [];
let blue_block_list = [];
let trigger = null;

function generateRedBlock() {
  const redBlock = { x: 100, y: 10, width: 10, height: 85 };
  red_block_list.push(redBlock);
}

function generateBlueBlock() {
  const blueBlock = { x: 100, y: 10, width: 10, height: 85 };
  blue_block_list.push(blueBlock);
}

function moveBlock() {
  for (let i = 0; i < red_block_list.length; i++) {
    if (transparentRed) {
      color("green");
    } else {
      color("red");
    }
    red_block_list[i].x -= baseSpeed;
    rect(red_block_list[i].x, red_block_list[i].y, red_block_list[i].width, red_block_list[i].height);
  }
  for (let i = 0; i < blue_block_list.length; i++) {
    if (transparentBlue) {
      color("green");
    } else {
      color("blue");
    }
    blue_block_list[i].x -= baseSpeed;
    rect(blue_block_list[i].x, blue_block_list[i].y, blue_block_list[i].width, blue_block_list[i].height);
  }
}

function transparentBlock() {
  if (changeToggle == 0) {
    play("select");
    changeToggle = 1;
    transparentRed = true;
    transparentBlue = false;
  } else if (changeToggle == 1) {
    play("click");
    changeToggle = 0;
    transparentRed = false;
    transparentBlue = true;
  }
}

function update() {
  if (!ticks) {
    red_block_list = [];
    blue_block_list = [];
    changeToggle = 0;
    transparentRed = false;
    transparentBlue = false;
    baseSpeed = 0.5
  }
  // 每个游戏刻移动红块
  moveBlock();
  
  // 绘制字符
  color("cyan");
  let player = char("a", 4, 50);
  
  // 每隔一段时间生成一个新的红块
  if (ticks % spawnInterval === 0) {
    if (Math.random() < 0.5) {
      generateRedBlock();
    } else {
      generateBlueBlock();
    }
  }
  
  if (player.isColliding.rect.green) {
    score += 1;
    if ((score % 300) == 0) {
      baseSpeed += 0.1;
    }
  }

  if (player.isColliding.rect.blue || player.isColliding.rect.red) {
    play("explosion")
    end();
  }

  if (input.isJustPressed) {
    transparentBlock();
  }
}


