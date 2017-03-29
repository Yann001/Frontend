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
		let el = document.querySelector(".all-canvas");
		let canvasWidth = (el.currentStyle ? el.currentStyle : window.getComputedStyle(el, null)).width;
		let canvasHeight = (el.currentStyle ? el.currentStyle : window.getComputedStyle(el, null)).height;
		//		let deviceWidth = window.screen.width;
		//		let deviceHeight = window.screen.height;
		//		if(deviceWidth <= 414) {
		//			canvasWidth = deviceWidth;
		//			canvasHeight = deviceHeight;
		//		} else {
		//			canvasWidth = WIDTH;
		//			canvasHeight = HEIGHT;
		//		}
		canvasWidth = parseFloat(canvasWidth);
		canvasHeight = parseFloat(canvasHeight);
		canvasWidth = canvasWidth < 640 ? canvasWidth : canvasHeight;
		document.querySelector(".container").style.width = canvasWidth + "px";
		WIDTH = canvasWidth;
		HEIGHT = canvasHeight;
		UNIT = Math.floor(WIDTH / 10);
		OUT_RADIUS = UNIT;
		INNER_RADIUS = UNIT * 0.5;
		PATH_WIDTH = UNIT * 0.3;
		this.canvas.width = canvasWidth;
		this.canvas.height = canvasHeight;
	}
	/**
	 * 绘制背景
	 * @method drawBackground
	 * @for App
	 * @param 
	 * @return 
	 */
	drawBackground() {
		let circle = new Circle();
		for(let row = 0; row < 3; row++) {
			for(let col = 0; col < 3; col++) {
				circle.draw(this.context, UNIT * 2 + UNIT * 3 * col, UNIT * 2 + UNIT * 3 * row, OUT_RADIUS, PAINT_COLOR);
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
			circle.drawSolid(this.context, pointArr[0].x, pointArr[0].y, INNER_RADIUS, "#e74c3c");
			for(let i = 0; i < len - 1; i++) {
				line.draw(this.context, pointArr[i].x, pointArr[i].y, pointArr[i + 1].x, pointArr[i + 1].y, PATH_WIDTH, "#e74c3c");
				circle.drawSolid(this.context, pointArr[i + 1].x, pointArr[i + 1].y, INNER_RADIUS, "#e74c3c");
			}
		}
	}
}