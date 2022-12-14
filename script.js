//캔버스 세팅
let canvas;
let ctx;
let container;

canvas = document.getElementById("canvas")
ctx = canvas.getContext("2d");
canvas.width = "400";
canvas.height = "600";

container = document.getElementById("container");
container.appendChild(canvas);

//이미지를 받아오는 변수
let backgroundImg, catImg, heartImg, poopImg, gameoverImg, fishImg, arrowImg;

//스코어, 게임오버 변수
let gameOver = false; //true면 게임 오버
let score = 0;

//고양이 좌표
let catImgX = canvas.width / 2 - 32;
let catImgY = canvas.height - 68;

//하트를 저장하는 리스트
let heartList = [];
//하트를 만들고 처리하기 위한 함수(클래스로 만들수있음)
function Heart() {
  this.x = 0;
  this.y = 0;

  //하트의 위치값을 하트리스트에 저장, 초기화해주는 함수
  this.init = function () {
    this.x = catImgX + 15;
    this.y = catImgY;
    this.alive = true; //하트의 활성화를 담당
    heartList.push(this);
  }

  //하트를 업데이트해주는 함수(내려오는 속도 조절)
  this.update = function () {
    //하트가 장애물 생성 위치 위로 올라가지 못하게함
    if(this.y <= canvas.height-550) {
      this.alive = false;
    } else {
      this.y -= 7;
    }
  }

  //하트와 장애물이 닿았을때를 처리하는 함수
  this.checkHit = function () {
    for (let i = 0; i < poopList.length; i++) {
      if (
        this.y <= poopList[i].y + 48 && 
        this.x >= poopList[i].x && 
        this.x <= poopList[i].x + 55
        ) {
        //하트와 장애물이 사라짐, 점수 획득
        score++;
        this.alive = false;
        poopList.splice(i, 1);
      } 
    }
  }

  //하트와 보너스가 닿았을때를 처리하는 함수
  this.checkBonus = function () {
    for (let i = 0; i < fishList.length; i++) {
      if (
        this.y <= fishList[i].y + 48 && 
        this.x >= fishList[i].x && 
        this.x <= fishList[i].x + 30
        ) {
        //하트와 보너스가 사라짐, 점수 획득
        score += 100;
        this.alive = false;
        fishList.splice(i, 1);
      } 
    }
  }
}

//장애물을 저장하는 리스트
let poopList = [];
//랜덤한 장애물의 값을 반환해주는 함수
function generateRandomValue(min, max) {
  let randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomNum;
}
//장애물을 만드는 함수
function Poop() {
  this.x = 0;
  this.y = 0;

  //장애물의 위치값을 장애물리스트에 저장,초기화 해주는 함수
  this.init = function () {
    this.x = generateRandomValue(0, canvas.width - 64); //랜덤함수를 통해 반환된 리턴값이 x에 저장됨
    this.y = 0;
    poopList.push(this);
  }

  //장애물의 업데이트 해주는 함수(내려오는 속도 조절)
  this.update = function () {
    this.y += 2;

    //장애물이 바닥에 닿으면 게임오버
    if (this.y >= canvas.height - 48) {
      gameOver = true;
    }
  }
}

//보너스를 저장하는 리스트
let fishList = [];
//랜덤한 보너스의 값을 반환해주는 함수
function generateRandomValue(min, max) {
  let randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomNum;
}
//보너스를 만드는 함수
function Fish() {
  this.x = 0;
  this.y = 0;

  //보너스의 위치값을 보너스리스트에 저장,초기화 해주는 함수
  this.init = function () {
    this.x = generateRandomValue(0, canvas.width - 64); //랜덤함수를 통해 반환된 리턴값이 x에 저장됨
    this.y = 0;
    fishList.push(this);
  }

  //보너스를 업데이트 해주는 함수(내려오는 속도 조절)
  this.update = function () {
    this.y += 7;
  }
}

//화살표를 저장하는 리스트
let arrowList = [];
//화살표를 만들고 처리하기 위한 함수(클래스로 만들수있음)
function Arrow() {
  this.x = 0;
  this.y = 0;

  //화살표의 위치값을 화살표리스트에 저장, 초기화해주는 함수
  this.init = function () {
    this.x = catImgX + 15;
    this.y = catImgY;
    this.alive = true; //화살표의 활성화를 담당
    arrowList.push(this);
  }

  //화살표를 업데이트해주는 함수(올라가는 속도 조절)
  this.update = function () {
    //화살표가 장애물 생성 위치 위로 올라가지 못하게함
    if(this.y <= canvas.height-550) {
      this.alive = false;
    } else {
      this.y -= 10;
    }
  }

  //화살표와 보너스가 닿았을때를 처리하는 함수
  this.checkBonus = function () {
    for (let i = 0; i < fishList.length; i++) {
      if (
        this.y <= fishList[i].y + 48 && 
        this.x >= fishList[i].x && 
        this.x <= fishList[i].x + 50
        ) {
        //화살표와 보너스가 사라짐, 점수 획득
        score += 100;
        this.alive = false;
        fishList.splice(i, 1);
      } 
    }
  }
}

//이미지를 불러오는 함수
function loadImage() {
  backgroundImg = new Image();
  backgroundImg.src = "img/background.png"

  catImg = new Image();
  catImg.src = "img/cat.png"

  gameoverImg = new Image();
  gameoverImg.src = "img/gameover.png";

  heartImg = new Image();
  heartImg.src = "img/heart.png";

  poopImg = new Image();
  poopImg.src = "img/poop.png";

  fishImg = new Image();
  fishImg.src = "img/fish.png"

  arrowImg = new Image();
  arrowImg.src = "img/arrow.png"
}

//이미지를 그리는 함수
function renderImg() {
  ctx.drawImage(backgroundImg, 0, 0, canvas.width, canvas.height);
  ctx.drawImage(catImg, catImgX, catImgY, 64, 68);
  ctx.fillText(`Score: ${score}`, 20, 40);
  ctx.fillStyle = "green";
  ctx.font ="30px bold"

  //하트 그려주기
  for (let i = 0; i < heartList.length; i++) {
    //활성화된 하트만 보여줌
    if (heartList[i].alive) {
      ctx.drawImage(heartImg, heartList[i].x, heartList[i].y);
    }
  }

  //장애물 그려주기
  for (let i = 0; i < poopList.length; i++) {
    ctx.drawImage(poopImg, poopList[i].x, poopList[i].y);
  }

  //보너스 그려주기
  for (let i = 0; i < fishList.length; i++) {
    ctx.drawImage(fishImg, fishList[i].x, fishList[i].y);
  }

  //화살표 그려주기
  for (let i = 0; i < arrowList.length; i++) {
    //활성화된 화살표만 보여줌
    if (arrowList[i].alive) {
      ctx.drawImage(arrowImg, arrowList[i].x, arrowList[i].y);
    }
  }
}

//눌리는 키보드 값을 저장하는 객체
let keysDown = {};

//키보드 이벤트를 처리하는 함수
function setupKeyboardListener() {
  //키보드를 눌렀을때
  document.addEventListener("keydown", function (event) {
    //키다운 객체에 키코드 값을 저장함
    keysDown[event.keyCode] = true;
    // console.log("키다운객체에 들어간 값은?", keysDown);
  })
  //키보드에서 손을 뗐을때
  document.addEventListener("keyup", function (event) {
    //키다운 객체에 저장된 키코드 값을 지움
    delete keysDown[event.keyCode];

    //s를 눌렀을때
    if (event.keyCode == 83) {
      creatHeart(); // 하트 생성
    }

    //a를 눌렀을때
    if(event.keyCode == 65) {
      createArrow(); //화살표 생성
    }
  })
}

function creatHeart() {
  let h = new Heart(); //하트를 하나 생성
  h.init();
}

function createPoop() {
  const interval = setInterval(function () {
    let p = new Poop();
    p.init();
  }, 1000);
}

function createFish() {
  const interval = setInterval(function () {
    let f = new Fish();
    f.init();
  }, 3000);
}

function createArrow() {
  let a = new Arrow();
  a.init();
}


//좌표의 값을 업데이트 하는 함수
function update() {
  // 키코드 up: 38, down: 40, left: 37, right: 39
  if (39 in keysDown) {
    catImgX += 5;
  }
  if (37 in keysDown) {
    catImgX -= 5;
  }
  //고양이 좌표값을 캔버스 안에 묶음
  if (catImgX <= 0) {
    catImgX = 0;
  } else if (catImgX >= canvas.width - 64) {
    catImgX = canvas.width - 64;
  }

  //하트의 y좌표값을 업데이트
  for (let i = 0; i < heartList.length; i++) {
    if(heartList[i].alive) {
      heartList[i].update();
      heartList[i].checkHit();
    }
  }

  //장애물의 y좌표값을 업데이트
  for (let i = 0; i < poopList.length; i++) {
    poopList[i].update();
  }

  //보너스의 y좌표값을 업데이트
  for (let i = 0; i < fishList.length; i++) {
    fishList[i].update();
  }

  //화살표의 y좌표값을 업데이트
  for (let i = 0; i < arrowList.length; i++) {
    if(arrowList[i].alive) {
      arrowList[i].update();
      arrowList[i].checkBonus();
    }
  }
}

//전체 함수를 불러오는 메인 함수
function main() {
  if (!gameOver) {
    renderImg();
    requestAnimationFrame(main); //계속해서 호출해주는 함수
    update();
  } else {
    ctx.drawImage(gameoverImg, 0, 100, 400, 300);
  }
}

loadImage();
setupKeyboardListener();
createPoop();
createFish();
main();
