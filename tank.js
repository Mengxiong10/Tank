var canvas1 = document.getElementById('tankMap');
var width = canvas1.width;
var height = canvas1.height;
var c = canvas1.getContext('2d');

// 自己的坦克
var ownTank = new OwnTank(100, 200, 3,0);//我的坦克速度3，方向向上
// 敌人的坦克
var enemys = [];
for (var i = 0; i < 3; i++) {
	enemys.push(new EnemyTank((width/2-10)*i+10,10,3,2));//敌人坦克速度3，方向向下。
}
// 键盘事件
document.onkeydown = function() {
	var event = event ? event : window.event;
	// alert(event.keyCode);
	switch (event.keyCode) {
		case 87:  //键W
			ownTank.top =true;
			break;
		case 83:     //键S
			ownTank.bottom = true;
			break;
		case 65:   //键A
			ownTank.left = true;
			break;
		case 68:   //键D
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
// 打开一个定时器，不停的刷新画布，同时让自己坦克处于准备移动状态，
// 当按下某个方向键，就改变值为true，不然掉转方向会有延迟。
setInterval(function () {
	checkDead();
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
		for (var k = 0; k < enemys[i].bullets.length; k++) {
			drawBullet(enemys[i].bullets[k]);
		}
	}
	for (var j = 0; j < ownTank.bullets.length; j++) {
		drawBullet(ownTank.bullets[j]);
	}

}, 30);
// 检查生死，删除Dead
function checkDead() {
	// 检查自己坦克子弹生死
	for (var i = 0; i < ownTank.bullets.length; i++) {
		if(ownTank.bullets[i].isDead){
			ownTank.bullets.deleteElement(ownTank.bullets[i]);
		}
	}
	for (var j = 0; j < enemys.length; j++) {
		for (var k = 0; k < enemys[j].bullets.length; k++) {
			if (enemys[j].bullets[k].isDead) {
				enemys[j].bullets.deleteElement(enemys[j].bullets[k]);
			}
		}
	}
}

