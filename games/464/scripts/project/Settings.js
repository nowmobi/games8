//Customize your settings Here

// 0/255, 255/255, 157/255
// 0/255, 255/255, 238/255
// 255/255, 234/255, 0/255
// 255/255, 115/255, 0/255
// 122/255, 205/255, 240/255
// 255/255, 0/255, 123/255
// 225/255, 0/255, 255/255
const hexColors = [
'#fe7b9e', //2
'#ff938a', //4
'#ff887f', //8
'#3D8FDB', //16
'#d9504e', //32
'#9786FE', //64
'#A1958E', // 128
'#FAB441', //256
'#F6607C', //512
'#4e70c9', //1024
'#b94631', //2028
'#da8ade', //4056
'#376bd3', //4056
'#9e4bb1' //4056
];

//Random Tiles Colors
export let colors = hexColors.map(c=>hexToRgb(c));

export const boardSettings = {
	padding: 5,
	spacing : 10,
	pendingBlockDropSpeed:100,
	confirmBlockDropSpeed:3500
};




function hexToRgb(hex) 
{
  let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? [
    parseInt(result[1], 16)/255,
    parseInt(result[2], 16)/255,
    parseInt(result[3], 16)/255
  ] : null;
}