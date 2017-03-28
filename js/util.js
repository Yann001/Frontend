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
				point.x = 80 + 120 * col;
				point.y = 100 + 120 * row;
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
		switch(numstr) {
			case "80100":
				{
					num = 1;
					break;
				}
			case "200100":
				{
					num = 2;
					break;
				}
			case "320100":
				{
					num = 3;
					break;
				}
			case "80220":
				{
					num = 4;
					break;
				}
			case "200220":
				{
					num = 5;
					break;
				}
			case "320220":
				{
					num = 6;
					break;
				}
			case "80340":
				{
					num = 7;
					break;
				}
			case "200340":
				{
					num = 8;
					break;
				}
			case "320340":
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
	pointArrToNumber(pointArr){
		let nums=[];
		for(let i=0;i<pointArr.length;i++){
			nums.push(this.pointToNumber(pointArr[i]));
		}
		return nums;
	}
}