/**
 * 启动系统方法
 * @method start
 * @for 
 * @param {} 
 * @return {} 
 */
(function strat() {
	let bg = new App("bg-canvas");
	bg.init();
	let app = new App("main-canvas");
	app.init();
	let message = new App("message-canvas");
	message.init();

	let circle = new Circle();
	let line = new Line();
	let util = new Util();
	let data = new Data();
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
	bg.drawBackground();
	//初始化信息提示面板
	dom.setText("info", MSG_INPUT);
	//绑定canvas事件
	bindCanvasEvent(app.canvas);
	//单选按钮点击事件
	document.querySelector(".setting").addEventListener("click", function(e) {
		dom.setText("info", MSG_INPUT);
	}, false);
	//绑定转屏事件
	window.addEventListener('orientationchange', function(e) {
		orient();
	});

	function bindCanvasEvent(canvasObj) {
		//PC端鼠标事件
		canvasObj.addEventListener("mousemove", function(e) {

			if(mouseStatus === "DOWN") {
				drawPassword(e);
			} else if(mouseStatus === "UP") {
				if(pathPoint.length) {
					verifyPassword();
				}
			}
		}, false);
		canvasObj.addEventListener("mousedown", function(e) {
			mouseStatus = "DOWN";
			drawPassword(e);
		}, false);
		canvasObj.addEventListener("mouseup", function(e) {
			console.log('up');
			mouseStatus = "UP";
		}, false);
		//移动端触摸事件
		canvasObj.addEventListener("touchstart", function(e) {
			e.preventDefault();
			drawPassword(e);
		}, false);
		canvasObj.addEventListener("touchmove", function(e) {
			drawPassword(e);
		}, false);
		canvasObj.addEventListener("touchend", function(e) {
			if(pathPoint.length) {
				verifyPassword();
			}
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
			if(pathPoint.length) {
				line.draw(app.context, pathPoint[pathPoint.length - 1].x, pathPoint[pathPoint.length - 1].y, mx, my, PATH_WIDTH, PAINT_COLOR);
			}

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
					dom.setText("info", MSG_SHORT);
				} else {
					temppwd = userpwd;
					dom.setText("info", MSG_AGAIN);
					isAgain = true;
				}
			} else if(isAgain) {
				if(userpwd.join("") === temppwd.join("")) {
					dom.setText("info", MSG_SUCCESS);
					data.savePassword(userpwd);
				} else {
					dom.setText("info", MSG_DIFF);
					app.errorDrawPath(pathPoint);
					setTimeout(function() {
						dom.setText("info", MSG_FRESH);
					}, 1000);
				}
				isAgain = false;
			}
		} else if(operate === "VALIDATE") {
			if(userpwd.join("") === data.getPassword()) {
				dom.setText("info", MSG_RIGHT);
			} else {
				dom.setText("info", MSG_ERROR);
				app.errorDrawPath(pathPoint);
				setTimeout(function() {
					dom.setText("info", MSG_FRESH);
				}, 1000);
			}
		}
		setTimeout(function() {
			app.clearPath(0, 0, WIDTH, HEIGHT);
		}, 300);
		pathPoint = [];
		userpwd = [];
		mouseStatus = "";
	}

	function orient() {
		var orientation = window.orientation;
		if(orientation == 90 || orientation == -90) {
			alert("请使用竖屏访问！");
		}
	}
})();