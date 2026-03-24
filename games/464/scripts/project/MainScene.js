// import {paddingSide,tileSpacing,gridSize} from './Settings.js';
import {rand,lerp} from './Utils.js';
import LinearMoveAnim from './LinearAnim.js';
import WaitUntil from './WaitUntil.js';


export default class MainScene{


	constructor(runtime)
	{
		this.gameState = "none"; // game state
		this.runtime = runtime;
		this.updatables = [];		//store updatables
		this.board = runtime.objects.Board.getFirstInstance();
		this.board.filledEvent = this.onBoardFilled.bind(this);
		this.board.mergedNumberEvent = this.onBoardMergeNumber.bind(this);
		
		setTimeout(()=>this.startPlay(),300);
	}
	
	

	onBoardFilled()
	{
		this.overTheGame();
	}
	
	onBoardMergeNumber(block)
	{
		this.runtime.globalVars.Score += block.value;
		
		if(this.runtime.globalVars.BestScore<this.runtime.globalVars.Score)
		{
			this.runtime.globalVars.BestScore = this.runtime.globalVars.Score;
		}
	}
	

		onTouchDown(x,y)
	{
		this.board.onTouchDown(x,y);
	}
	
	onTouchDragging(x,y)
	{
		this.board.onTouchDragging(x,y);
	}
	
	onTouchUp(x,y)
	{
		this.board.onTouchUp(x,y);
	}

	
	
	//Start Playing
	startPlay()
	{
		this.gameState = "playing";
		this.board.startDroppingBlocks();
		this.sentEvent("play");
	}

	overTheGame()
	{
		this.gameState = "over";
		this.sentEvent('over');
		console.log("Game Over");
	}
	
	update(runtime)
	{
		this.updatables.forEach(item=>item.update(runtime.dt));
		this.board.update();
	
		if(this.gameState !== "playing")
		return;
		
		
		
		for(const item of this.runtime.objects.Block.instances())
		{
			item.update();
		}
	}
	
	
	//Play sound effect
	playSound(name)
	{
	if(!this.runtime.globalVars.Sound)
	return;
		const ist = this.runtime.objects.SoundEffect.createInstance(0,0,0);
		ist.instVars.name = name;
		ist.destroy();
	}
	
	sentEvent(name)
	{
		const ist = this.runtime.objects.SimpleEvent.createInstance(0,0,0);
		ist.instVars.EventName = name;
		ist.destroy();
	}

	addToUpdatable(updatable)
	{
		this.updatables.push(updatable);
	}

	removeUpdatable(updatable)
	{
		this.updatables.splice(this.updatables.indexOf(updatable),1);
	}
	
	
	//delay milli seconds
	delay(s)
	{
		return new Promise((resolve,reject)=>{
			setTimeout(resolve,s);
		});
	}
	
	async waitUntil(condition)
	{
		return	new Promise((resolve,_)=>{
		let anim = null;
		anim = new WaitUntil(condition,()=>{
			this.removeUpdatable(anim);
			resolve();
		});
		
		this.addToUpdatable(anim);
		
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