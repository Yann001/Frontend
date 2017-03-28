/**
 * 文字书写操作类
 * @class Text
 * @constructor
 */
class Text {
	/**
	 * 画线
	 * @method write
	 * @for Text
	 * @param {Object,String,String,Number,Number,String} 
	 * ctx：canvas对象，font：字体大小及字体，content：文字内容，x：起点横坐标， y：起点纵坐标， color：字体颜色
	 * @return {}
	 */
	write(ctx, font, content, x, y, color) {
		ctx.clearRect(0, 0, WIDTH, HEIGHT);	
		ctx.beginPath();
		ctx.font = font;
		ctx.fillStyle = color;
		ctx.fillText(content, x, y);
		ctx.closePath();
	}
}