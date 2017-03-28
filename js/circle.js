/**
 * 画圆操作类
 * @class Circle
 * @constructor
 */
class Circle {
	/**
	 * 画圆
	 * @method draw
	 * @for Circle
	 * @param {Object,Number,Number,Number,String}
	 * ctx：canvas对象， x：圆心横坐标，y：圆心纵坐标， radius：圆半径， color ：画笔颜色
	 * @return {} 
	 */
	draw(ctx, x, y, radius, color) {
		ctx.beginPath();
		ctx.arc(x, y, radius, 0, 2 * Math.PI);
		ctx.lineWidth = 1;
		ctx.strokeStyle = color;
		ctx.stroke();
		ctx.closePath();
	}
	/**
	 * 画实心圆
	 * @method drawSolid
	 * @for Circle
	 * @param {Object,Number,Number,Number,String}
	 * ctx：canvas对象， x：圆心横坐标，y：圆心纵坐标， radius：圆半径， color ：画笔颜色
	 * @return 
	 */
	drawSolid(ctx, x, y, radius, color) {
		ctx.beginPath();
		ctx.arc(x, y, radius, 0, 2 * Math.PI);
		ctx.lineWidth = 1;
		ctx.fillStyle = color;
		ctx.fill();
		ctx.closePath();
	}
}
