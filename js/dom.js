/**
 * DOM操作类
 * @class Dom
 * @constructor
 */
class Dom {
	/**
	 * 获取选中单选按钮值
	 * @method getRadioValue
	 * @for Dom
	 * @param {String} radioName：单选按钮name属性值
	 * @return {String} 选中单选按钮value值
	 */
	getRadioValue(radioName) {
		let value = "";
		let radios = document.getElementsByName(radioName);
		for(let i = 0; i < radios.length; i++) {
			if(radios[i].checked === true) {
				value = radios[i].value;
				break;
			}
		}
		return value;
	}
	/**
	 * 设置元素文本内容
	 * @method setText
	 * @for Dom
	 * @param {String，String} id：元素id， content：需要设置的文本
	 * @return {} 
	 */
	setText(id, content) {
		let el = document.getElementById(id);
		el.innerHTML = content;
	}
}