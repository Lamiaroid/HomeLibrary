let canvas = document.getElementById("matrix-canvas");
let context = canvas.getContext("2d");
let symbolSet = "九 七 二 人 入 八 力 十 下 三 千 上 口 土 夕 大 女 子 小 山 川 五 天 中 六 円 手 文 日 月 木 水 火 犬 王 正 出 本 右 四 左 玉 生 田 白 目 石 立 百 年 休 先 名 字 早 気 竹 糸 耳 虫 村 男 町 花 見 貝 赤 足 車 学 林 空 金 雨 青 草 音 校 森";
// This one looks really nice**********************************************************************************************************************************************************************************************************************/
// let symbolSet = "九七二人入八力十下三千上口土夕大女子小山川五天中六円手文日月木水火犬王正出本右四左玉生田白目石立百年休先名字早気竹糸耳虫村男町花見貝赤足車学林空金雨青草音校森";
// ************************************************************************************************************************************************************************************************************************************************/
let fontSize = 10;

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

let columns = canvas.width/fontSize; 
let drops = [];

symbolSet = symbolSet.split("");	
for (let x = 0; x < columns; x++) {
	drops[x] = canvas.height/fontSize; 
}

function matrixRain(colorBG, colorText, distanceBetweenLetters, textBlurColor = null, textShadowBlur = 0, dropBeginingPos = canvas.height/fontSize) {
	context.fillStyle = colorBG;
	context.shadowColor = null;
	context.shadowBlur = 0;

	context.fillRect(0, 0, canvas.width, canvas.height);	

	context.fillStyle = colorText;
	context.shadowColor = textBlurColor;
	context.shadowBlur = textShadowBlur;
	context.font = fontSize + "px arial";

	for (let i = 0; i < drops.length; i ++) {
		let text = symbolSet[Math.floor(Math.random()*symbolSet.length)];
		context.fillText(text, i*fontSize, drops[i]*fontSize);		
		drops[i] = Math.random() * 108;
	}
}