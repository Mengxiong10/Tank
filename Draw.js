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
	c.lineWidth = 2;
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
	c.arc(bullet.x,bullet.y,4,0,2*Math.PI);//子弹半径是2
	c.fillStyle = bullet.color;
	c.fill();
}