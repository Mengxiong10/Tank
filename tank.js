var canvas1 = document.getElementById('tankMap');
var width = canvas1.width;
var height = canvas1.height;
var c = canvas1.getContext('2d');

// 自己的坦克
var ownTank = new OwnTank(430, 550, 4, 0); //我的坦克速度3，方向向上
// 敌人的坦克
var enemys = [];
for (var i = 0; i < 15; i++) {
	enemys.push(new EnemyTank((width / 15 - 10) * i + 10, 15+400, 5, 0)); //敌人坦克速度3，方向向下。a
}
// 合并坦克
var allTank = enemys.concat(ownTank);
// 键盘事件
document.onkeydown = function() {
	var event = event ? event : window.event;
	// alert(event.keyCode);
	switch (event.keyCode) {
		case 87: //键W
			ownTank.moveStates[0] = true;
			break;
		case 68: //键D
			ownTank.moveStates[1] = true;
			break;
		case 83: //键S
			ownTank.moveStates[2] = true;
			break;
		case 65: //键A
			ownTank.moveStates[3] = true;
			break;
		case 75: //键k
			ownTank.shot();
	}
};
document.onkeyup = function() {
	var event = event ? event : window.event;
	switch (event.keyCode) {
		case 87:
			ownTank.moveStates[0] = false;
			break;
		case 68:
			ownTank.moveStates[1] = false;
			break;
		case 83:
			ownTank.moveStates[2] = false;
			break;
		case 65:
			ownTank.moveStates[3] = false;
			break;
	}
};
// 打开一个定时器，不停的刷新画布，同时让自己坦克处于准备移动状态，
// 当按下某个方向键，就改变值为true，不然掉转方向会有延迟。
setInterval(function() {
	checkDead();
	if (ownTank.isDead) {
	ownTank.newLife();
}
	c.clearRect(0, 0, width, height);
	if (ownTank.moveStates[0]) {
		ownTank.moveUp();
	} else if (ownTank.moveStates[1]) {
		ownTank.moveRight();
	} else if (ownTank.moveStates[2]) {
		ownTank.moveDown();
	} else if (ownTank.moveStates[3]) {
		ownTank.moveLeft();
	}
	drawMap(0);
	for (var i = 0; i < allTank.length; i++) {
		drawTank(allTank[i]);
		for (var k = 0; k < allTank[i].bullets.length; k++) {
			drawBullet(allTank[i].bullets[k]);
		}
	}
}, 30);

//碰撞检测函数
function coincident(one, two, width,height) {
	var x = Math.abs(one.nextX - two.nextX);
	var y = Math.abs(one.nextY - two.nextY);
	if (x < width && y < height) {
		one.isBlock = two.isBlock = true;
	}
}
//坦克之间的碰撞检测！！！
function checkBlock() {
	for (var i = 0; i < allTank.length; i++) {
		for (var j = 0; j < allTank.length; j++) {
			if (j == i) {
				continue;
			}
			coincident(allTank[i],allTank[j],allTank[i].w,allTank[i].h);
		}
	}
}

function mapBlock() {
	for (var i = 0; i < map[0].length; i++) {
		for (var j = 0; j < map[0][i].length; j++) {
			if (map[0][i][j] == 1) {
				for (var m = 0; m < allTank.length; m++) {
					if (allTank[m].nextX + 14 > j * 30 && allTank[m].nextX - 14 < j * 30 + 30 && allTank[m].nextY + 14 >i * 30 && allTank[m].nextY - 14 < i * 30 + 30) {
						allTank[m].isBlock = true;
					}
				}
			}
		}
	}
}



// 检查生死，删除Dead
function checkDead() {
	for (var i = 0; i < allTank.length; i++) {
		var temp = allTank[i];
		if (temp.isDead) {
			allTank.deleteElement(temp);
		}
	}
	// 检查坦克子弹生死
	for (var i = 0; i < allTank.length; i++) {
		for (var j = 0; j < allTank[i].bullets.length; j++) {
			if (allTank[i].bullets[j].isBlock) {
				allTank[i].bullets.deleteElement(allTank[i].bullets[j]);

			}
		}
	}
}