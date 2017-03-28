/**
 * 启动系统方法
 * @method start
 * @for 
 * @param {} 
 * @return {} 
 */
(function strat() {
	let bg = new App("bg-canvas");
	let app = new App("main-canvas");
	let message = new App("message-canvas");
	let circle = new Circle();
	let line = new Line();
	let util = new Util();
	let data = new Data();
	let words = new Text();
	let dom = new Dom();
	let userpwd = [],
		temppwd = [];
	let pathPoint = [];
	let operate = "";
	let mouseX = 0,
		mouseY = 0,
		mouseStatus = "";
	let isAgain = false;
	//初始化canvas背景面板
	bg.init();
	//初始化信息提示面板
	words.write(message.context, FONT, MSG_INPUT, 100, 450, FONT_COLOR);
	//绑定canvas事件
	bindCanvasEvent(app.canvas);
	//单选按钮点击事件
	document.getElementsByClassName("setting")[0].addEventListener("click", function(e) {
		words.write(message.context, FONT, MSG_INPUT, 100, 450, FONT_COLOR);
	}, false);

	function bindCanvasEvent(canvasObj) {
		//PC端鼠标事件
		canvasObj.addEventListener("mousemove", function(e) {
			if(mouseStatus === "DOWN") {
				drawPassword(e);
			} else if(mouseStatus === "") {;
			} else if(mouseStatus === "UP") {
				verifyPassword();
			}
		}, false);
		canvasObj.addEventListener("mousedown", function(e) {
			mouseStatus = "DOWN";
		}, false);
		canvasObj.addEventListener("mouseup", function(e) {
			mouseStatus = "UP";
		}, false);
		//移动端触摸事件
		canvasObj.addEventListener("touchstart", function(e) {;
		}, false);
		canvasObj.addEventListener("touchmove", function(e) {
			drawPassword(e);
		}, false);
		canvasObj.addEventListener("touchend", function(e) {
			verifyPassword();
		}, false);

	}

	function drawPassword(e) {
		let ev = e || window.event;
		let util = new Util();
		let data = new Data();
		if(e.offsetX || e.touches) {
			let rect = e.currentTarget.getBoundingClientRect();
			let mx = ev.offsetX == undefined ? ev.touches[0].clientX - rect.left : ev.offsetX;
			let my = ev.offsetY == undefined ? ev.touches[0].clientY - rect.top : ev.offsetY;
			let point = util.isTouch(mx, my);
			if(point !== null) {
				if(!data.isContainObj(point, pathPoint)) {
					pathPoint.push(point);
				}
			}
			app.clearPath(0, 0, WIDTH, HEIGHT);
			//画密码路径
			app.drawPath(pathPoint);
			//画最后跟随鼠标部分路径
			line.draw(app.context, pathPoint[pathPoint.length - 1].x, pathPoint[pathPoint.length - 1].y, mx, my, PATH_WIDTH, PAINT_COLOR);
		}
	}

	function verifyPassword() {
		app.clearPath(0, 0, WIDTH, HEIGHT);
		//去除重复点，移动鼠标操作时会一直push()所以导致重复
		pathPoint = data.getDistinct(pathPoint)
		app.drawPath(pathPoint);
		userpwd = userpwd.concat(util.pointArrToNumber(pathPoint));
		operate = dom.getRadioValue("operate").toUpperCase();
		if(operate === "SET") {
			if(!isAgain) {
				if(userpwd.length < 5) {
					words.write(message.context, FONT, MSG_SHORT, 100, 450, FONT_COLOR);
				} else {
					temppwd = userpwd;
					words.write(message.context, FONT, MSG_AGAIN, 100, 450, FONT_COLOR);
					isAgain = true;
				}
			} else if(isAgain) {
				if(userpwd.join("") === temppwd.join("")) {
					words.write(message.context, FONT, MSG_SUCCESS, 100, 450, FONT_COLOR);
					data.savePassword(userpwd);
				} else {
					words.write(message.context, FONT, MSG_DIFF, 100, 450, FONT_COLOR);
				}
				isAgain = false;
			}
		} else if(operate === "VALIDATE") {
			if(userpwd.join("") === data.getPassword()) {
				words.write(message.context, FONT, MSG_RIGHT, 100, 450, FONT_COLOR);
			} else {
				words.write(message.context, FONT, MSG_ERROR, 100, 450, FONT_COLOR);
				app.errorDrawPath(pathPoint);
			}
		}
		setTimeout(function() {
			app.clearPath(0, 0, WIDTH, HEIGHT);
		}, 300);
		pathPoint = [];
		userpwd = [];
		mouseStatus = "";
	}

})();