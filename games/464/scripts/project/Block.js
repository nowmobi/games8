import {colors} from './Settings.js';
import {lerp,lerpColor} from './Utils.js';
import LinearMoveAnim from './LinearAnim.js';
import LerpAnim from './LerpAnim.js';

export default class Block extends ISpriteInstance{


	constructor()
	{
		super();
		this.numberOffsetY = 9;
		
		this.number = this.runtime.objects.Number.createInstance(0,this.x,this.y+this.numberOffsetY);
		this.addDefaultChild(this.number);
		
		
		this.highlightEffect = this.runtime.objects.BlockHighlightEffect.createInstance(0,this.x,this.y);
		this.addDefaultChild(this.highlightEffect);
		this.highlightEffect.isVisible = false;
		
		this.setValue(2);
		this.number.text = this.value+"";
		this.defaultFontSize = this.number.sizePt;
		this.updatables = [];
		this.scale = 1;
	}
	

	async doubleTheNumberWithAnim(speed=5)
	{
		const startScale = this.scale;
		const targetScale = startScale*1.1;
		let startColor = [...this.colorRgb];
		
		await this.linearAnimAsync(speed*2,n=>{
			this.setScale(lerp(startScale,targetScale,n));
			this.colorRgb = lerpColor(startColor,[1,1,1],n);
		});
		
		this.setValue(2*this.value);
		console.log(this.value);
		startColor = [...this.colorRgb];
		
		await this.linearAnimAsync(speed*2,n=>{
			this.setScale(lerp(targetScale,startScale,n));
			this.colorRgb = lerpColor([1,1,1],startColor,n);
		});
		
		let doubleHighlighter = this.runtime.objects.DoubleEffect.createInstance(0,this.x,this.y);
		
		this.addDefaultChild(doubleHighlighter);
		
		
		await this.delay(500);
		doubleHighlighter.destroy();
	}
		
	addDefaultChild(child)
	{
		this.addChild(child,{
			transformX:true,
			transformY:true,
			transformAngle:true,
			transformZElevation:true,
			transformWidth:true,
			transformHeight:true,
			destroyWithParent:true
		});
	}

	setSize(width)
	{
		this.width = width;
		this.height = width;
	}
	
	setScale(scale)
	{
		this.setSize(scale*this.width/this.scale);
		this.scale = scale;
	}
	
	async dropAnim()
	{
		this.highlightEffect.isVisible = true;
		
		this.createDropParticlesEffect();
		
		await this.linearAnimAsync(10,n=>{
			this.highlightEffect.opacity = n;
		});
		
		await this.delay(100);
		
		await this.linearAnimAsync(8,n=>{
			this.highlightEffect.opacity = 1-n;
		});
		
		this.highlightEffect.isVisible = false;
		
	}
	
	createDropParticlesEffect()
	{
		const padding = 50;
		const count = 4;
		const space = (this.width-2*padding)/(count-1);
		
		for(let i=0;i<count;i++)
		{
			const x = this.x - this.width/2 + padding + i*space;
			const effect = this.runtime.objects.DropParticles.createInstance(0,x,this.y+0.9*this.height/2);
		this.addDefaultChild(effect);
		
// 		setTimeout(()=>{effect.destroy();},1000);
		}
			
	}
	
	update()
	{
		this.updatables.forEach(item=>item.update(this.runtime.dt));
	}
	
	
	addToUpdatable(updatable)
	{
		this.updatables.push(updatable);
	}

	removeUpdatable(updatable)
	{
		this.updatables.splice(this.updatables.indexOf(updatable),1);
	}
	
	setValue(value)
	{
		this.value = value;
		this.number.text = this.value+"";
		
		if(this.number.text.length >=4)
		{
			this.number.sizePt = this.defaultFontSize * 0.65;
		}
		else if(this.number.text.length >= 3)
		{
			this.number.sizePt = this.defaultFontSize * 0.75;
		}
		console.log(this.value);
		this.colorRgb = colors[((Math.log(Math.max(this.value,2))/Math.log(2))-1)%colors.length];
		
	}
	
		delay(s)
	{
		return new Promise((resolve,reject)=>{
			setTimeout(resolve,s);
		});
	}
	
	async lerpAnimAsync(speed,start,end,onFrame)
	{
		return	new Promise((resolve,_)=>{
		let anim = null;
		anim = new LerpAnim(speed,start,end,onFrame,()=>{
			this.removeUpdatable(anim);
			resolve();
		});
		
		this.addToUpdatable(anim);
		
		});
	}
	
	async linearAnimAsync(speed,onFrame)
	{
		return	new Promise((resolve,_)=>{
		let anim = null;
		anim = new LinearMoveAnim(speed,onFrame,()=>{
			this.removeUpdatable(anim);
			resolve();
		});
		
		this.addToUpdatable(anim);
		
		});
			
		
	}
}