var canvas1 = document.getElementById('tankMap');
var width = canvas1.width;
var height = canvas1.height;
var c = canvas1.getContext('2d');
//坦克父类
function Tank(x, y, speed, direct) {
	this.x = x; //坦克中心的x坐标
	this.y = y;//坦克中心的x坐标
	this.speed = speed;//坦克移动速度
	this.direct = direct; //坦克的方向
	this.top = false;
	this.bottom = false;
	this.left = false;
	this.right = false;
}
Tank.prototype = {
	moveUp: function() {
		this.y -= this.speed;
		this.direct =0;
		if (this.y <= 10) {
			this.y = 10;
		}
	},
	moveDown: function() {
		this.y += this.speed;
		this.direct = 2;
		if (this.y >=height-10) {
			this.y =height-10;
		}
	},
	moveLeft: function() {
		this.x -= this.speed;
		this.direct = 3;
		if (this.x <= 10) {
			this.x = 10;
		}
	},
	moveRight: function() {
		this.x += this.speed;
		this.direct = 1;
		if (this.x >= width-10) {
			this.x = width-10;
		}
	},
	shot:function(){
	var temp; 
	switch(this.direct){
		case 0:
			temp = new Bullet(this.x,this.y-10,5,0);
			break;
		case 1:
			temp = new Bullet(this.x+10,this.y,5,1);
			break;
		case 2:
			temp = new Bullet(this.x,this.y+10,5,2);
			break;
		case 3:
			temp = new Bullet(this.x-10,this.y,5,3);
			break;
	}
		bullets.push(temp);
	},
};
// 自己坦克子类
function OwnTank(x,y,speed,direct) {
	Tank.apply(this,arguments);
	this.color = ['RGB(255,153,51)','RGB(153,102,0)','RGB(255,204,102)'];
}
OwnTank.prototype = new Tank();
// 敌人坦克子类
function EnemyTank(x,y,speed,direct) {
	Tank.apply(this,arguments);
	this.color = ['RGB(45,81,180)','RGB(50,137,130)','RGB(45,76,131)'];
}
EnemyTank.prototype = new Tank();
// 定义子弹类
function Bullet(x,y,speed,direct) {
	this.x = x;
	this.y = y;
	this.direct = direct;
	this.speed = speed;
	this.timer = setInterval ((function (context) { 
	return function () { 
	Bullet.prototype.move.call (context);
	} ;
}) (this), 30); 
}
Bullet.prototype.move = function () {
	switch(this.direct){
		case 0:
			this.y -= this.speed;
			break;
		case 1:
			this.x += this.speed;
			break;
		case 2:
			this.y += this.speed;
			break;
		case 3:
			this.x -= this.speed;
			break;
	}
		
};

var ownTank = new OwnTank(100, 200, 4,0);

var enemys = [];
for (var i = 0; i < 3; i++) {
	enemys.push(new EnemyTank((width/2-10)*i+10,10,4,2));
}
var bullets = [];


// 画坦克
function drawTank(tank) {
	c.save();
	c.translate(tank.x, tank.y);
	c.rotate(tank.direct*Math.PI/2);
	// 坦克的长宽是20
	c.fillStyle = tank.color[0];
	c.fillRect(-10, -10, 5, 20);
	c.fillRect(5, -10, 5, 20);
	c.fillRect(-4, -6, 8, 12);
	c.fillStyle = tank.color[1];
	c.beginPath();
	c.arc(0, 0, 3, 0, 2 * Math.PI);
	c.fill();
	c.beginPath();
	c.lineWidth = 1.5;
	c.strokeStyle = tank.color[2];
	c.moveTo(0, 0);
	c.lineTo(0, -10);
	c.closePath();
	c.stroke();
	c.restore();
}
// 画子弹
function drawBullet(bullet){
	c.beginPath();
	c.arc(bullet.x,bullet.y,2,0,2*Math.PI);
	c.fillStyle = 'red';
	c.fill();
}

drawTank(ownTank);
// 打开一个定时器，不停的刷新画布，同时让自己坦克处于准备移动状态，当按下某个方向键，就改变值为true，不然掉转方向会有延迟。
setInterval(function () {
	c.clearRect(0, 0, width, height);	
	if (ownTank.top) {
		ownTank.moveUp();
	}else if (ownTank.left) {
		ownTank.moveLeft();
	}else if (ownTank.bottom) {
		ownTank.moveDown();
	}else if (ownTank.right) {
		ownTank.moveRight();
	}
	drawTank(ownTank);
	for (var i = 0; i < enemys.length; i++) {
		drawTank(enemys[i]);
	}
	for (var j = 0; j < bullets.length; j++) {
		drawBullet(bullets[j]);
	}

}, 30);


// 键盘事件
document.onkeydown = function() {
	var event = event ? event : window.event;
	// alert(event.keyCode);
	switch (event.keyCode) {
		case 87:
			ownTank.top =true;
			break;
		case 83:
			ownTank.bottom = true;
			break;
		case 65:
			ownTank.left = true;
			break;
		case 68:
			ownTank.right = true;
			break;
		case 75:    //键k
			ownTank.shot();
	}
};
document.onkeyup = function() {
	var event = event ? event : window.event;
	switch (event.keyCode) {
		case 87:
			ownTank.top =false;
			break;
		case 83:
			ownTank.bottom = false;
			break;
		case 65:
			ownTank.left = false;
			break;
		case 68:
			ownTank.right = false;
			break;
	}
};

