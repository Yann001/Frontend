/**
 * 画线操作类
 * @class Line
 * @constructor
 */
class Line {
	/**
	 * 画线
	 * @method draw
	 * @for Circle
	 * @param {Object,Number,Number,Number,Number,Number,String} 
	 * ctx：canvas对象， startX：起点横坐标， startY：起点纵坐标，endX：终点横坐标，endY：终点纵坐标， width：线宽， color：画笔颜色
	 * @return {}
	 */
	draw(ctx, startX, startY, endX, endY, width, color) {
		ctx.beginPath();
		ctx.moveTo(startX, startY);
		ctx.lineTo(endX, endY);
		ctx.lineWidth = width;
		ctx.lineCap = "round";
		ctx.strokeStyle = color;
		ctx.stroke();
		ctx.closePath();
	}
}