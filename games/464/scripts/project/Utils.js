export function lerp(x,y,val)
{
	const v = val>1?1:val<0?0:val;
	
	return x + (y-x)*v;
	
}

export function lerpColor(from,to,val)
{
	const v = val>1?1:val<0?0:val;
	
	return [...Array(3).keys()].map(i=>lerp(from[i],to[i],v));
}

export function clamp(val,min,max)
{

	return	val < min ? min : (val > max ? max : val);
}

export function max(val1,val2)
{
	return val1>val2?val1:val2;
}

export function min(x,y)
{
	return x < y ? x:y;
}

export function rand(start,end)
{
	return Math.floor(Math.random()*(end-start)) + start;
}

export function randomize(array)
{
	const ars = array.slice();
	const newArray = [];
	
	while(ars.length)
	{
		const i = rand(0,ars.length);
		newArray.push(ars[i]);
		ars.splice(i,1);
	}
	
	return newArray;

	
}