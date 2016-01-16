// 增加删除数组里的元素的方法
Array.prototype.deleteElement = function (obj) {
	if (obj) {
		for (var i = 0; i < this.length; i++) {
			if(this[i] ===obj){
				this.splice(i,1);
			}
		}
	}
};

//坦克父类
function Tank(x, y, speed, direct) {
	this.x = x; //坦克中心的x坐标
	this.y = y;//坦克中心的x坐标
	this.nextX = this.x;
	this.nextY = this.y;
	this.speed = speed;//坦克移动速度
	this.direct = direct; //坦克的方向
	this.bullets = [];//坦克的子弹夹
	this.bulletsLength = 2; //最多同时发多少子弹
	this.isDead = false;
	this.isBlock = false;
	this.moveStates = [false,false,false,false,true];//移动状态数组——上、右、下、左、停止

}
Tank.prototype = {
	moveUp: function() {
		this.direct =0;
		this.nextY = this.y-this.speed;
		this.nextX = this.x;
		if (this.isBlock) {
			this.y = this.y;
			this.isBlock = false;
		}else{
			this.y =this.nextY;
		}
		
		if (this.y <= 10) {
			this.y = 10;
			this.direct = 2;
		}
	},
	moveDown: function() {
		this.direct = 2;
		this.nextY = this.y +this.speed;
		this.nextX = this.x;
	if (this.isBlock) {
		this.y = this.y;
		this.isBlock = false;
	}else{
		this.y = this.nextY;
	}
		
	
		if (this.y >=height-10) {
			this.y =height-10;
			this.direct = 0;
		}
	},
	moveLeft: function() {
		this.nextX = this.x-this.speed;
		this.nextY = this.y;
		this.direct = 3;
		if (this.isBlock) {
			this.x = this.x;
			this.isBlock = false;
		}else{
			this.x =this.nextX;
		}
		
		if (this.x <= 10) {
			this.x = 10;
			this.direct = 1;
		}
	},
	moveRight: function() {
		this.nextX = this.x +this.speed;
		this.nextY = this.y;
		this.direct = 1;
		if (this.isBlock) {
			this.x = this.x;
			this.isBlock = false;
		}else{
			this.x = this.nextX;
		}
		
		if (this.x >= width-10) {
			this.x = width-10;
			this.direct = 3;
		}
	},
	// 改变方向
	changeDirect:function () {
		var temp = Math.floor(Math.random()*4);
		if (temp !==this.direct) {
			this.direct = temp;
		}
	},
	// 射击子弹
	shot:function(){
	if (this.isDead) {
		return;
	}
	var temp; 
	if (this.bullets.length <this.bulletsLength) {
	switch(this.direct){
		case 0:
			temp = new Bullet(this.x,this.y-10,5,0,this.color[0]);
			break;
		case 1:
			temp = new Bullet(this.x+10,this.y,5,1,this.color[0]);
			break;
		case 2:
			temp = new Bullet(this.x,this.y+10,5,2,this.color[0]);
			break;
		case 3:
			temp = new Bullet(this.x-10,this.y,5,3,this.color[0]);
			break;
	}
			this.bullets.push(temp);
		}
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
	if (this.isBlock) {
		switch(this.direct){
		case 0:
			this.direct = 2;
			break;
		case 1:
			this.direct = 3;
			break;
		case 2:
			this.direct = 0;
			break;
		case 3:
			this.direct = 1;
			break;
	}
	}
	Tank.apply(this,arguments);
	this.color = ['RGB(45,81,180)','RGB(50,137,130)','RGB(45,76,131)'];
	this.timerMove = setInterval((function (context) {
		return function () {
			EnemyTank.prototype.move.call(context);
		};
	})(this),30);
	this.timerChangeDirect = setInterval((function (context) {
		return function () {
			Tank.prototype.changeDirect.call(context);
		};
	})(this),(Math.floor(Math.random()*3+2))*1000);
	this.timerShot = setInterval((function (context) {
		return function () {
			Tank.prototype.shot.call(context);
		};
	})(this),(Math.floor(Math.random()*3))*1000);
}
EnemyTank.prototype = new Tank();
EnemyTank.prototype.move = function () {
	switch(this.direct){
		case 0:this.moveUp();break;
		case 1:this.moveRight();break;
		case 2:this.moveDown();break;
		case 3:this.moveLeft();break;
	}
};

// 定义子弹类
function Bullet(x,y,speed,direct,color) {
	this.x = x;
	this.y = y;
	this.direct = direct;
	this.speed = speed;
	this.color = color;
	this.isDead = false;
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
// 子弹边界碰撞检查
if (this.isDead) {
	clearInterval(this.timer);
}
if (this.x+2<0 || this.x-2>width|| this.y+2<0|| this.y-2> height) {
	clearInterval(this.timer);
	this.isDead = true;
}
// 子弹击中坦克死亡检查
for (var m= 0; m < allTank.length; m++) {
	var temp = allTank[m];
	if (temp.isDead) {
		continue;
	}
	if (!this.isDead) {
	if (this.x >temp.x-11 && this.x <temp.x+11 && this.y>temp.y-11 && this.y<temp.y+11) {
		if (this.color!==temp.color[0]) {
			clearInterval(this.timer);
			this.isDead = true;
			temp.isDead = true;
		}else{
			clearInterval(this.timer);
			this.isDead = true;
		}
	}
}
}
};


