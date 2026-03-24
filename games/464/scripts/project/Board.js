import Vector from './Vector.js';
import {boardSettings} from './Settings.js';
import {rand,lerp} from './Utils.js';
import LinearMoveAnim from './LinearAnim.js';

export default class Board extends ISpriteInstance{

	constructor()
	{
		super();
		this.boardTop = this.runtime.objects.BoardTop.getFirstInstance();
		this.gridSize = new Vector(5,6);
		this.padding = boardSettings.padding;
		this.spacing = boardSettings.spacing;
		this.pendingBlockDropSpeed = boardSettings.pendingBlockDropSpeed;
		this.confirmBlockDropSpeed = boardSettings.confirmBlockDropSpeed;
		
		this.nextBlock = [...this.runtime.objects.Block.instances()].find(b=>b.instVars.Tag === 'NextBlock');
		
		this.columnHighlightEffect = this.runtime.objects.ColumnHighlightEffect.getFirstInstance();
		
		this.tileSize = (this.width - 2*this.padding - (this.gridSize.x-1)*this.spacing)/this.gridSize.x;
		this.grids = [];
		
		this.generateGrid();
		this.hasStartedDropping = false;
		this.lastDropIndex = -1;
		this.droppingBlock = null;
		this.lastMergeBlock = null;
		this.nextBlockValue = -1;
		this.currentDropBlockState = "none"; 
		this.updatables = [];
		this.mergedNumberEvent = null;
		this.filledEvent = null;
		this.isBoardFilled = false;
		
		
	}
	

	
	getNextBlockValue()
	{
		const blocks = this.grids.filter(g=>g.block).map(g=>g.block);
		const maxValue = blocks.length===0?2: Math.max(...blocks.map(b=>b.value));
		console.log(blocks,maxValue);
		return Math.pow(2,rand(1,Math.log2(maxValue)));
	}
	
	generateGrid()
	{
		const bottomLeft = new Vector(this.x-this.width/2+this.padding,this.y+this.height/2-this.padding).add(new Vector(this.tileSize/2,-this.tileSize/2));
		
		for(let y=0;y<this.gridSize.y;y++)
		{
			for(let x=0;x<this.gridSize.x;x++)
			{
				const holder = {
					coordinate:new Vector(x,y),
					position : bottomLeft.add(new Vector(x*(this.tileSize+this.spacing),-y*(this.tileSize+this.spacing))),
					block:null
				};
				
				this.grids.push(holder); 
			}
		}
	}
	
	startDroppingBlocks()
	{
		if(this.hasStartedDropping)
			return;
		console.log('start dropping blocks');
		this.hasStartedDropping = true;
		this.dropTheNextNumber();
	}
	
	dropTheNextNumber()
	{
		if(!this.boardTop)
		this.boardTop = this.runtime.objects.BoardTop.getFirstInstance();
		
		if(this.lastDropIndex<0)
			this.lastDropIndex = rand(0,this.gridSize.x);
			
		if(this.nextBlockValue<=0)
		this.setRandomNextBlockValue();
			
		this.droppingBlock = this.runtime.objects.Block.createInstance(this.layer.index,this.getGrid(this.lastDropIndex,0).position.x,this.boardTop.y);
		
		this.droppingBlock.setValue(this.nextBlockValue);
		this.droppingBlock.setSize(this.tileSize);
		this.currentDropBlockState = "pending";
		this.setRandomNextBlockValue();
		
		console.log('dropTheNextNumber');
		
	}
	
	setRandomNextBlockValue()
	{
		if(!this.nextBlock)
					this.nextBlock = [...this.runtime.objects.Block.instances()].find(b=>b.instVars.Tag === 'NextBlock');
					
		console.log([...this.runtime.objects.Block.instances()]);
		this.nextBlockValue = this.getNextBlockValue();
		this.nextBlock.setValue(this.nextBlockValue);
	}
	
	moveDroppingBlockToIndex(index)
	{
	console.log(index);
		this.droppingBlock.x = this.getGrid(index,0).position.x;
		this.lastDropIndex = index;
	}
	
	
	setBlockToHolder(block,holder)
	{
		if(holder) holder.block = block;
		
		if(block)block.holder = holder;
	}
	
	handleUpdateDroppingBlock()
	{
		if(!this.droppingBlock) return;
		
		
		if(this.currentDropBlockState !== 'none')
		{
			const speed = this.currentDropBlockState == 'pending' ? this.pendingBlockDropSpeed : this.confirmBlockDropSpeed;
			
			this.droppingBlock.y += speed*this.runtime.dt;
		}
		
		const holderData = this.getNearestHolder(new Vector(this.droppingBlock.x,this.droppingBlock.y));
		let {holder} = holderData;
		const {distance} = holderData;
		
		if((holder.position.y>this.droppingBlock.y && distance<1) || (holder.position.y<this.droppingBlock.y))
		{
			while(holder.block && holder.coordinate.y<this.gridSize.y-1)
			{
				holder = this.getGrid(holder.coordinate.x,holder.coordinate.y+1);
			}
			
			if(holder.coordinate.y===0 || this.getGrid(holder.coordinate.x,holder.coordinate.y-1).block)
			{
				this.onDroppingBlockDropped(holder);
			}
		}
		
	}
	
	onDroppingBlockDropped(holder)
	{
		this.droppingBlock.x = holder.position.x;
		this.droppingBlock.y = holder.position.y;
		
		this.setBlockToHolder(this.droppingBlock,holder);
		
		this.onBlockDropped(this.droppingBlock);
		console.log(holder.coordinate);
		this.handleBlockMerge();
		
	}
	
	
		async dropBlockTo(block,holder,speed=5)
	{
		const startPoint = new Vector(block.x,block.y);
		const targetPoint = holder.position;
		console.log('drop block to:'+holder.coordinate.y);
		await this.linearAnimAsync(speed,n=>{
			block.x = lerp(startPoint.x,targetPoint.x,n);
			block.y = lerp(startPoint.y,targetPoint.y,n);
			console.log(startPoint,targetPoint);
		});
		
		if(block.holder.block === block)
			this.setBlockToHolder(null,block.holder);
			
		this.setBlockToHolder(block,holder);
		this.onBlockDropped(block);
	}
	
	onBlockDropped(block)
	{
		if(!this.columnHighlightEffect)
			this.columnHighlightEffect = this.runtime.objects.ColumnHighlightEffect.getFirstInstance();
		this.columnHighlightEffect.isVisible = false;
		block.dropAnim();
		this.playClipIfCan('drop');
	
	}
	
	async handleBlockMerge()
	{
		let blockMerges = this.getCurrentMerges()
		this.droppingBlock = null;
		this.currentDropBlockState = 'none';
		this.processing = true;
		console.log('handle block merges:'+blockMerges);
		do
		{
			if(blockMerges.length)
			{
				await this.mergeParallel(blockMerges.map(d=>async()=>{await this.mergeBlock(d);}));
				this.lastMergeBlock = blockMerges[blockMerges.length-1].firstBlock;
			}
			
			await this.dropHanggingBlocks();
			blockMerges = this.getCurrentMerges();
		if(blockMerges.length)
		await this.delay(100);
			
			
		}while(blockMerges.length);
		
		this.lastMergeBlock = null;
		this.processing = false;
		console.log(this.grids);
		if(this.hasBoardFilled())
		{
			this.markAsBoardFilled();
		}
		else
		{
			this.dropTheNextNumber();
		}
	}
	
	async dropHanggingBlocks()
	{
		const actions = [];
		
		for(let i=0;i<this.gridSize.x;i++)
		{
			let emptyIndex = -1;
			for(let j=0;j<this.gridSize.y;j++)
			{
				if(emptyIndex<0 && !this.getGrid(i,j).block)
				{
					emptyIndex = j;
					
				}
				else if(emptyIndex>=0&&this.getGrid(i,j).block)
				{
				console.log('empty index:'+emptyIndex);
					const index = emptyIndex;
					const x = i;
					const y =j;
					actions.push(async()=>{
					await this.dropBlockTo(this.getGrid(x,y).block,this.getGrid(x,index));
					});
					emptyIndex++;
				}
			}
		}
		
		if(actions.length)
		{
			await this.mergeParallel(actions);
		}
		
	}
	
	markAsBoardFilled()
	{
		this.isBoardFilled = true;
		if(this.filledEvent)this.filledEvent();
	}
	
	async mergeBlock(data)
	{
		const startPoint = new Vector(data.secondBlock.x,data.secondBlock.y);
		const targetPoint = new Vector(data.firstBlock.x,data.firstBlock.y).sub(startPoint).mul(0.8).add(startPoint);
		let haveDoubled = false;
		
		await this.linearAnimAsync(5,n=>{
			if(n>0.5 && !haveDoubled)
			{
				data.firstBlock.doubleTheNumberWithAnim(2*5);
				data.secondBlock.number.destroy();
				haveDoubled = true;
			}
			
			data.secondBlock.x = lerp(startPoint.x,targetPoint.x,n);
			data.secondBlock.y = lerp(startPoint.y,targetPoint.y,n);
		});
		
		this.setBlockToHolder(null,data.secondBlock.holder);
		this.playClipIfCan('merge');
		data.secondBlock.destroy();
		if(this.mergedNumberEvent)
			this.mergedNumberEvent(data.firstBlock);
	}
	
	onTouchDown(x,y)
	{
		this.onTouchDownOrDragging(x,y);
	}
	
	onTouchDragging(x,y)
	{
		this.onTouchDownOrDragging(x,y);
	}
	
	onTouchUp(x,y)
	{
			if(!this.droppingBlock || this.currentDropBlockState !== 'pending')
		return;
		
		const xGrid = this.getNearestXForPosition(new Vector(x,y));
		if(xGrid>=0 && xGrid<this.gridSize.x&& Math.abs(this.getGrid(xGrid,0).position.x - this.droppingBlock.x)<1)
		{
			this.confirmDroppingBlock();
		}
		
		
	}
	
	onTouchDownOrDragging(x,y)
	{
		
		if(!this.droppingBlock || this.currentDropBlockState !== 'pending')
		return;
	
		const xGrid = this.getNearestXForPosition(new Vector(x,y));
		console.log("x grid:"+xGrid);
		
		if(xGrid<this.gridSize.x&&xGrid>=0)
		{
			if(this.canMoveDroppingBlockToIndex(xGrid))
			{
				this.moveDroppingBlockToIndex(xGrid)
			}
		}
	}
	
	confirmDroppingBlock()
	{
		console.log('confirm dropping block');
		this.currentDropBlockState = 'confirmed';

		
		if(!this.columnHighlightEffect)
		{
			this.columnHighlightEffect = this.runtime.objects.ColumnHighlightEffect.getFirstInstance();
		}
				this.columnHighlightEffect.colorRgb = this.droppingBlock.colorRgb.slice();
				this.columnHighlightEffect.x = this.droppingBlock.x;
				this.columnHighlightEffect.y = this.y;
		this.columnHighlightEffect.isVisible = true;
		
	}
	
	update()
	{
		this.updatables.forEach(item=>item.update(this.runtime.dt));
		this.handleUpdateDroppingBlock();
	}
	
	
	addToUpdatable(updatable)
	{
		this.updatables.push(updatable);
	}

	removeUpdatable(updatable)
	{
		this.updatables.splice(this.updatables.indexOf(updatable),1);
	}
	
	canMoveDroppingBlockToIndex(index)
	{
		const orderedList = [...Array(this.gridSize.y).keys()].map(i=>this.getGrid(index,i)).filter(g=>g.block).sort((a,b)=>a.coordinate.y - b.coordinate.y);
		
		const topBlock = orderedList.length ? orderedList[orderedList.length-1] : null;
		
		return !topBlock || topBlock.position.y - this.tileSize > this.droppingBlock.y;
	}
	
	hasBoardFilled()
	{
		return [...Array(this.gridSize.x).keys()].some(x=> [...Array(this.gridSize.y).keys()].every(y=> this.getGrid(x,y).block));
	}
	
	getCurrentMerges()
	{
		if(!this.lastMergeBlock)
		this.lastMergeBlock = this.droppingBlock;
		
		if(!this.lastMergeBlock)
			throw Error();
		
		
		let pendingBlocksForMerge = this.grids.filter(g=>g.block).map(g=>g.block).filter(b=>b!==this.lastMergeBlock);
		
		pendingBlocksForMerge = [this.lastMergeBlock,...pendingBlocksForMerge];
		
		const list = [];
		
		while(pendingBlocksForMerge.length)
		{
			const holder = pendingBlocksForMerge[0].holder;
			const adjacentHolders = this.getAdjacentHolderInOrder(holder.coordinate);
			
			for(const gridHolder of adjacentHolders)
			{
				console.log(gridHolder.block,pendingBlocksForMerge.includes(gridHolder.block))
				if(gridHolder.block && pendingBlocksForMerge.includes(gridHolder.block) && gridHolder.block.value == holder.block.value)
				{
					const firstHolder = gridHolder.coordinate.y > holder.coordinate.y ? gridHolder : holder;
					
					const secondHolder = gridHolder === firstHolder ? holder :gridHolder;
					
					list.push({firstBlock:firstHolder.block,secondBlock:secondHolder.block});
					pendingBlocksForMerge.splice(pendingBlocksForMerge.indexOf(gridHolder.block),1);
					break;
				}
			}

pendingBlocksForMerge.splice(pendingBlocksForMerge.indexOf(holder.block),1);
		}
		
		return list;
	}
	
	getAdjacentHolderInOrder(coordinate)
	{
		const coordinates = [];
		
		if(coordinate.y>0)
			coordinates.push(coordinate.sub(new Vector(0,1)));
			
			
		if(coordinate.y<this.gridSize.y-1)
			coordinates.push(coordinate.add(new Vector(0,1)));
			
		if(coordinate.x>0)
			coordinates.push(coordinate.sub(new Vector(1,0)));
		
		if(coordinate.x < this.gridSize.x-1)
			coordinates.push(coordinate.add(new Vector(1,0)));
			
		return coordinates.map(c=>this.getGrid(c.x,c.y));
		
	}
	
	getNearestXForPosition(position)
	{
		return Math.round((position.x - (-this.width/2+this.x+this.padding+this.tileSize/2))/(this.tileSize+this.spacing));
	}
	
		getNearestHolder(position)
	{
		const holder = this.grids.sort((a,b)=>(a.position.sub(position).mag() - b.position.sub(position).mag()))[0];
		const distance = position.sub(holder.position).mag();
		
		return {holder,distance};
	}
	
	getGrid(x,y)
	{
		return this.grids.find(g=>g.coordinate.x === x && g.coordinate.y === y);
	}
	
	playClipIfCan(clip)
	{
			if(!this.runtime.globalVars.Sound)
			return;
	
		const effect = this.runtime.objects.SoundEffect.createInstance(0,0,0);
		effect.instVars.name = clip;
		effect.destroy();
	}
	
	async withCallback(action,callback)
	{
		await action();
		callback();
	}
	
	async mergeParallel(actions)
	{
		return new Promise((resolve,_)=>{
			const acts = actions.map(a=>async()=>{
				await a();
				actions.splice(actions.indexOf(a),1);
				if(actions.length<=0)
				{
					resolve();
				}
			});
			acts.forEach(a=>a());
		});
		
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