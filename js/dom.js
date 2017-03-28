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
		let value="";
		let radios = document.getElementsByName(radioName);
		for(let i = 0; i < radios.length; i++) {
			if(radios[i].checked===true){
				value = radios[i].value;
				break;
			}
		}
		return value;
	}
}