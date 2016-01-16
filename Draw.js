// 画坦克
function drawTank(tank) {
	c.save();
	c.translate(tank.x, tank.y);
	c.rotate(tank.direct*Math.PI/2);
	// 坦克的长宽是20
	c.fillStyle = tank.color[0];
	c.fillRect(-tank.w/2, -tank.h/2, tank.w/4, tank.h);
	c.fillRect(tank.w/4, -tank.h/2, tank.w/4, tank.h);
	c.fillRect(-tank.w/4+1, -tank.h/3, tank.w/2-2, 2/3*tank.h);
	c.fillStyle = tank.color[1];
	c.beginPath();
	c.arc(0, 0, tank.w/4-3, 0, 2 * Math.PI);
	c.fill();
	c.beginPath();
	c.lineWidth = tank.w/8;
	c.strokeStyle = tank.color[2];
	c.moveTo(0, 0);
	c.lineTo(0, -tank.h/2);
	c.closePath();
	c.stroke();
	c.restore();
}
// 画子弹
function drawBullet(bullet){
	c.beginPath();
	c.arc(bullet.x,bullet.y,4,0,2*Math.PI);//子弹半径是4
	c.fillStyle = bullet.color;
	c.fill();
}

//画地图

function drawMap(num) {
	for (var i = 0; i < map[num].length; i++) {
		for(var j = 0; j<map[num][i].length; j++){
			if (map[num][i][j] == 1) {
				c.fillStyle = '#BCBCBC';
				c.fillRect(30*j,30*i,30,30);
				c.fillStyle = '#FFFFFF';
				c.fillRect(30*j+6,30*i+6,18,18);
			}
		}
	}
}


