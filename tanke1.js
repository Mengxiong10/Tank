var canvas1 = document.getElementById('tankMap');
var c = canvas1.getContext('2d');
//坦克对象
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
		if (this.y >=canvas1.height-10) {
			this.y =canvas1.height-10;
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
		if (this.x >= canvas1.width-10) {
			this.x = canvas1.width-10;
		}
	},
};
var ownTank = new Tank(100, 200, 4,0);

// 画出坦克
function drawTank(tank) {
	c.save();
	c.translate(tank.x, tank.y);
	c.rotate(tank.direct*Math.PI/2);
	c.fillStyle = 'RGB(255,153,51)';
	c.fillRect(-10, -10, 5, 20);
	c.fillRect(5, -10, 5, 20);
	c.fillRect(-4, -6, 8, 12);
	c.fillStyle = 'RGB(153,102,0)';
	c.arc(0, 0, 3, 0, 2 * Math.PI);
	c.fill();
	c.beginPath();
	c.lineWidth = 1.5;
	c.strokeStyle = 'RGB(255,204,102)';
	c.moveTo(0, 0);
	c.lineTo(0, -10);
	c.closePath();
	c.stroke();
	c.restore();
}
drawTank(ownTank);
// 先打开一个定时器，让坦克处于准备移动状态，当按下某个方向键，就改变值为true;
// 避免直接用键盘事件，改变方向时会延迟。
setInterval(function () {
	function change() {
		c.clearRect(0, 0, canvas1.width, canvas1.height);
		drawTank(ownTank);
	}
	if (ownTank.top) {
		ownTank.moveUp();
		change();
	}else if (ownTank.left) {
		ownTank.moveLeft();
		change();
	}else if (ownTank.bottom) {
		ownTank.moveDown();
		change();
	}else if (ownTank.right) {
		ownTank.moveRight();
		change();
	}
}, 50);

// 键盘事件
document.onkeydown = function() {
	var event = event ? event : window.event;
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

