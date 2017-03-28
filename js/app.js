/**
 * canvas操作类
 * @class App
 * @constructor
 */
class App {
	/**
	 * 对象构造器
	 */
	constructor(id) {
		this.canvas = document.getElementById(id);
		this.context = this.canvas.getContext("2d");
	}
	/**
	 * 初始化解锁面板
	 * @method init
	 * @for App
	 * @param 
	 * @return 
	 */
	init() {
		var circle = new Circle();
		for(let row = 0; row < 3; row++) {
			for(let col = 0; col < 3; col++) {
				circle.draw(this.context, 80 + 120 * col, 100 + 120 * row, OUT_RADIUS, PAINT_COLOR);
			}
		}
	}
	/**
	 * 绘制路径
	 * @method drawPath
	 * @for App
	 * @param {Array} pointArr 点坐标对象数组
	 * @return 
	 */
	drawPath(pointArr) {
		let circle = new Circle();
		let line = new Line();
		let len = pointArr.length;
		if(len !== 0) {
			circle.drawSolid(this.context, pointArr[0].x, pointArr[0].y, INNER_RADIUS, PAINT_COLOR);
			for(let i = 0; i < len - 1; i++) {
				line.draw(this.context, pointArr[i].x, pointArr[i].y, pointArr[i + 1].x, pointArr[i + 1].y, PATH_WIDTH, PAINT_COLOR);
				circle.drawSolid(this.context, pointArr[i + 1].x, pointArr[i + 1].y, INNER_RADIUS, PAINT_COLOR);
			}
		}
	}
	/**
	 * 清除矩形区域路径
	 * @method clearPath
	 * @for App
	 * @param {Number,Number,Number,Number} startX, startY, width, height 路径起点坐标及宽高
	 * @return 
	 */
	clearPath(startX, startY, width, height) {
		this.context.clearRect(startX, startY, width, height);
	}
	/**
	 * 绘制错误密码路径
	 * @method errorDrawPath
	 * @for App
	 * @param {Array} pointArr 点坐标对象数组
	 * @return 
	 */
	errorDrawPath(pointArr) {
		let circle = new Circle();
		let line = new Line();
		let len = pointArr.length;
		if(len !== 0) {
			circle.drawSolid(this.context, pointArr[0].x, pointArr[0].y, INNER_RADIUS, "red");
			for(let i = 0; i < len - 1; i++) {
				line.draw(this.context, pointArr[i].x, pointArr[i].y, pointArr[i + 1].x, pointArr[i + 1].y, PATH_WIDTH, "red");
				circle.drawSolid(this.context, pointArr[i + 1].x, pointArr[i + 1].y, INNER_RADIUS, "red");
			}
		}
	}
}