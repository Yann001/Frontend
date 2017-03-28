/**
 * 数据操作类
 * @class Data
 * @constructor
 */
class Data {
	/**
	 * 保存密码至localStorage
	 * @method savePassword
	 * @for Data
	 * @param {Array} pwd：密码
	 * @return {Boolean} 成功：true，失败：false
	 */
	savePassword(pwd) {
		if(pwd.length < 5) {
			return false;
		} else {
			if(typeof(Storage) !== "undefined") {
				localStorage.removeItem("userpwd");
				localStorage.setItem("userpwd", pwd.join(""));
				return true;
			} else {
				alert("您的浏览器不支持Web存储密码！");
				return false;
			}
		}
	}
	/**
	 * 从localStorage读取密码
	 * @method getPassword
	 * @for Data
	 * @param {} 
	 * @return {}
	 */
	getPassword() {
		return localStorage.getItem("userpwd").toString();
	}
	/**
	 * 去除数组中重复项目
	 * @method getDistinct
	 * @for Data
	 * @param {Array} arr：需要操作的数组
	 * @return {Array}  去除重复后的数组
	 */
	getDistinct(arr) {
		let len = arr.length;
		let ret = [];
		if(len !== 0) {
			if(typeof(arr[0]) !== "object") {
				for(let i = 0; i < len; i++) {
					if(ret.indexOf(arr[i]) === -1) {
						ret.push(arr[i]);
					}
				}
			} else {
				ret[0] = arr[0];
				for(let j = 0; j < len; j++) {
					if(this.isContainObj(arr[j], ret)) {
						continue;
					} else {
						ret.push(arr[j]);
					}
				}
			}
		}
		return ret;
	}
	/**
	 * 判断数组中是否包含该对象
	 * @method isContainObj
	 * @for Data
	 * @param {Object,Array} obj：对象, objArr：对象数组
	 * @return {Boolean} 包含：true，不包含：false
	 */
	isContainObj(obj, objArr) {
		for(let i = 0; i < objArr.length; i++) {
			if(this.isEqualObj(obj, objArr[i])) {
				return true;
			}
		}
		return false;
	}
	/**
	 * 比较两个对象是否相等（属性名与属性值皆相同）
	 * @method isEqualObj
	 * @for Data
	 * @param {Object,Object} obj1, obj2：要比较的两个对象
	 * @return {Boolean} 相等：true，不相等：false
	 */
	isEqualObj(obj1, obj2) {
		let obj1Props = Object.getOwnPropertyNames(obj1);
		let obj2Props = Object.getOwnPropertyNames(obj2);
		if(obj1Props.length !== obj2Props.length) {
			return false;
		}
		for(let i = 0; i < obj1Props.length; i++) {
			let propName = obj1Props[i];
			if(obj1[propName] !== obj2[propName]) {
				return false;
			}
		}
		return true;
	}
}