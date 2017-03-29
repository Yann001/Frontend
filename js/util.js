/**
 * 工具类
 * @class Util
 * @constructor
 */
class Util {
	/**
	 * 计算两点之间距离
	 * @method calcDistance
	 * @for Util
	 * @param {Number,Number,Number,Number}
	 * startX：起点横坐标， startY：起点纵坐标，endX：终点横坐标，endY：终点纵坐标
	 * @return {Number} 两点之间距离，单位为px 
	 */
	calcDistance(startX, startY, endX, endY) {
		let x1 = parseFloat(startX);
		let y1 = parseFloat(startY);
		let x2 = parseFloat(endX);
		let y2 = parseFloat(endY);
		let result = Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2));
		return result;
	}
	/**
	 * 判断是否触碰九个圆圈中的某个圆
	 * @method isTouch
	 * @for Util
	 * @param {Number,Number} mouseX：鼠标横坐标， mouseY：鼠标纵坐标
	 * @return {Object} 被触碰圆的圆心坐标对象或null 
	 */
	isTouch(mouseX, mouseY) {
		//算出九个点坐标存入pointArr
		let point = {};
		let pointArr = [];
		for(let row = 0; row < 3; row++) {
			for(let col = 0; col < 3; col++) {
				let point = {};
				point.x = UNIT * 2 + UNIT * 3 * col;
				point.y = UNIT * 2 + UNIT * 3 * row;
				pointArr.push(point);
			}
		}
		//计算距离并判断，距离四舍五入保留两位小数
		let disArr = [];
		for(let i = 0; i < pointArr.length; i++) {
			let distance = this.calcDistance(mouseX, mouseY, pointArr[i].x, pointArr[i].y).toFixed(2);
			if(distance <= OUT_RADIUS) {
				point.x = pointArr[i].x;
				point.y = pointArr[i].y;
				return point;
			}
		}
		return null;
	}
	/**
	 * 将圆心坐标对象转换为对应的数字密码
	 * @method pointToNumber
	 * @for Util
	 * @param {Object} 圆心坐标对象
	 * @return {Number} 对应数字密码
	 */
	pointToNumber(point) {
		let numstr = point.x.toString() + point.y.toString();
		let num = 0;
		let one = UNIT * 2 + "" + UNIT * 2;
		let two = UNIT * 5 + "" + UNIT * 2;
		let three = UNIT * 8 + "" + UNIT * 2;
		let four = UNIT * 2 + "" + UNIT * 5;
		let five = UNIT * 5 + "" + UNIT * 5;
		let six = UNIT * 8 + "" + UNIT * 5;
		let seven = UNIT * 2 + "" + UNIT * 8;
		let eight = UNIT * 5 + "" + UNIT * 8;
		let nine = UNIT * 8 + "" + UNIT * 8;
		switch(numstr) {
			case one:
				{
					num = 1;
					break;
				}
			case two:
				{
					num = 2;
					break;
				}
			case three:
				{
					num = 3;
					break;
				}
			case four:
				{
					num = 4;
					break;
				}
			case five:
				{
					num = 5;
					break;
				}
			case six:
				{
					num = 6;
					break;
				}
			case seven:
				{
					num = 7;
					break;
				}
			case eight:
				{
					num = 8;
					break;
				}
			case nine:
				{
					num = 9;
					break;
				}
			default:
				break;
		}
		return num;
	}
	/**
	 * 将圆心坐标对象数组转换为对应的数字密码数组
	 * @method pointArrToNumber
	 * @for Util
	 * @param {Array} 圆心坐标对象数组
	 * @return {Number} 对应数字密码数组
	 */
	pointArrToNumber(pointArr) {
		let nums = [];
		for(let i = 0; i < pointArr.length; i++) {
			nums.push(this.pointToNumber(pointArr[i]));
		}
		return nums;
	}
}