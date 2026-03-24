


const scriptsInEvents = {

	async Game_Event3(runtime, localVars)
	{
		
		window.move_chain_piece=(ccc,x,y)=>{
			y-=32;
			
			if(ccc!=null||ccc!=undefined){
				var loopindex_ =0;
				var current_=ccc;
				//while(current_!=null&&current_!=undefined){
					var p=current_.behaviors.Physics;		
					var force = 50;
					
					p.setVelocity(-(force/(1))*(current_.x-x),-(force/(1))*((current_.y-(y+(runtime.globalVars.LINK_HEIGHT*loopindex_) ) )));
					loopindex_++;		
					
				//	current_ = current_.next;
				//}
		
			}
		}
		
		window.create_ends=(framecolor)=>{
			var links  =runtime.objects.chain_link.getAllInstances();
			for(var aaa = 0;aaa<links.length;aaa++){	
				if(links[aaa].next==null||links[aaa].next==undefined){
				
					if(links[aaa].end==null||links[aaa].end==undefined){
						if(links[aaa].animationFrame==framecolor){
						var pos = links[aaa].getImagePoint(2);
							links[aaa].end = runtime.objects.end_chain.createInstance("game",pos[0],pos[1]);
							links[aaa].addChild(links[aaa].end);
							links[aaa].end.parent = links[aaa];
		
						
						}
						
					}			
				}
			}
		}
	},

	async Game_Event8(runtime, localVars)
	{
		var join =runtime.objects.join.getPickedInstances()[0];
		var a =runtime.objects.chain_link.getPickedInstances()[0];
		var b= runtime.objects.chain_link.getPickedInstances()[1];
		if(a.y<b.y){
			
			b.join=join;
			a.next=b;
			b.last=a
		}else{
			a.join=join;
			b.next=a;
			a.last=b;
			
		
		
		
		}
	},

	async Game_Event10(runtime, localVars)
	{
		var links  =runtime.objects.chain_link.getAllInstances();
		window.links_start=new Array();
		for(var aaa = 0;aaa<links.length;aaa++){
			if(links[aaa].last==null||links[aaa].last==undefined){
				links_start[links_start.length]=links[aaa];
			}	
		}
	},

	async Game_Event12(runtime, localVars)
	{
		window.color_count = new Array();
	},

	async Game_Event16(runtime, localVars)
	{
		
		var link_ =runtime.objects.chain_link.getPickedInstances()[0];
		
		color_count[link_.animationFrame]=localVars.count_;
	},

	async Game_Event20(runtime, localVars)
	{
		var a =runtime.objects.chain_link.getPickedInstances()[0];
		create_ends(a.animationFrame);
		//destroy all ends in current chain section selected
		while(a!=undefined&&a!=null){
			try{		a.end.destroy();	}catch(e){}	
			try{		a.end=null;	}catch(e){}	
			a=a.next;
		
		}
			
		a =runtime.objects.chain_link.getPickedInstances()[0];
		//We look for the link above, that will be the one that the user will move.
		while(a.last!=undefined&&a.animationFrame==a.last.animationFrame&&a.last.last!=undefined){	
			
			a = a.last;
		
		}
		a.return=a.last;
		a.last.next=null;
		a.last=null;
		//save current link to move
		window.current_piece = a;
		a.join.destroy();
	},

	async Game_Event24(runtime, localVars)
	{
		var touching_a_end = false;
		//check if the current_piece intersects any end_chain
		runtime.objects.end_chain.getAllInstances().forEach((end)=>{	
			end.opacity=0.5;
			if(end.testOverlap(current_piece)){
				end.opacity=1;
				touching_a_end=true;	
			}
		});
		
		//somewhat complicated solution to only emit sound only once
		if(runtime.globalVars.PLAY_SOUND_TOUCH_A_END==0&&touching_a_end){
			runtime.globalVars.PLAY_SOUND_TOUCH_A_END=1;
		}
		if(!touching_a_end){
			runtime.globalVars.PLAY_SOUND_TOUCH_A_END=0;
		}
		
		
		
		//finally moves the current piece
		if(current_piece!=null&&current_piece!=undefined){
		
			move_chain_piece(current_piece,localVars.t_x,localVars.t_y-50);
		
		}
	},

	async Game_Event27(runtime, localVars)
	{
		
		//check if overlap a end_chain
		var return_end_overlapping =null;
		runtime.objects.end_chain.getAllInstances().forEach((end)=>{	
			if(end.testOverlap(current_piece)){
				return_end_overlapping=end;
			}
		})
		if(return_end_overlapping!=null){
			//if overlaps a end replace current return target with this
			runtime.objects.Particles.createInstance("game",return_end_overlapping.x,return_end_overlapping.y)
			current_piece.return = return_end_overlapping.parent;
			return_end_overlapping.parent.end=null;
			return_end_overlapping.destroy();
			localVars.name_sound= "return_2";
		
		}else{
		
			localVars.name_sound= "return_1";
		
		}
		
		//se the position of current_piece to return
		if(current_piece!=null&&current_piece!=undefined){
			var join =runtime.objects.join.getPickedInstances()[0];	
			current_piece.x=current_piece.return.getImagePoint(2)[0];
			current_piece.y=current_piece.return.getImagePoint(2)[1]+32;
			current_piece.angle=0;
			join.x = current_piece.x;
			join.y = current_piece.y-32;
			join.behaviors.Physics.createRevoluteJoint(0,current_piece);
			join.behaviors.Physics.createRevoluteJoint(0,current_piece.return);	
			current_piece.return.next = current_piece;
			current_piece.last = current_piece.return;
			current_piece.join = join;
		}
		current_piece=null;
		
		runtime.objects.end_chain.getAllInstances().forEach((end)=>{
			end.parent.end=null;
			end.destroy();
		
		});
		
		
		
		//check chains completes
		links_start.forEach((piece)=>{
			
		
			
			var current_color = piece.animationFrame;
			var count_=0;	
				
			var target_ = color_count[piece.animationFrame];
			var last_piece;
			while(piece!=null&&piece!=undefined){
				if(piece.animationFrame==current_color){
					count_++;
				
				}else{
					count_-=9999;
				}
				if(piece.next==null||piece.next==undefined){last_piece=piece;}
				piece = piece.next;
			
			}
			
			//
			if(count_==target_){
				if(last_piece.correct_notification==null||last_piece.correct_notification==undefined){
				
				
					last_piece.correct_notification = runtime.objects.chain_correct_notification.createInstance("game",last_piece.x,last_piece.y);
					last_piece.correct_notification.parent = last_piece;
				}
			}
			
			
		})
		
		
	},

	async Game_Event31(runtime, localVars)
	{
		var link_ =runtime.objects.chain_link.getPickedInstances()[0];
		link_.lv= new Array();
		link_.lv[0]=link_.getChildAt(0);
		link_.lv[1]=link_.getChildAt(1);
		link_.lv[2]=link_.getChildAt(2);
		
	},

	async Game_Event35(runtime, localVars)
	{
		var ends  =runtime.objects.end_chain.getAllInstances();
		for(var aaa=0;aaa<ends.length;aaa++){
			var parent=ends[aaa].parent;
			ends[aaa].x=parent.getImagePoint(2)[0];
			ends[aaa].y=parent.getImagePoint(2)[1];
			
		
		}
		runtime.objects.chain_correct_notification.getAllInstances().forEach((correct)=>{
			var parent=correct.parent;
			correct.x=parent.getImagePoint(2)[0];
			correct.y=parent.getImagePoint(2)[1];
		
		})
		
		links_start.forEach((piece)=>{
			var loopindex_ =0;
			while(piece!=null&&piece!=undefined){
			
				loopindex_++;
				piece.lv[loopindex_%2].moveToBottom();		
				piece=piece.next;
		
			}
		
		});
		
		
	},

	async Game_Event46(runtime, localVars)
	{
		var enter = 1;
		if(enter==1&&runtime.callFunction("CAN_SHOW_INTER",0)==1){
		
			runtime.callFunction("SHOW_INTER",1,localVars.next);
			enter=0;
		}
		if(enter==1){
				
			runtime.goToLayout(localVars.next);
					
		}
	},

	async Prepare_Event5(runtime, localVars)
	{
		var arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50  ,51,52,53,54,55,56,57,58,59,60];
		runtime.globalVars.array_levels_json= JSON.stringify(arr);
	},

	async Prepare_Event8(runtime, localVars)
	{
		window.get_level_number = (level)=>{
			var arr = JSON.parse(runtime.globalVars.array_levels_json);
			var number= arr[level];
			if(number==null||number==undefined){	
				const numbers = [ 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30,,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50   ,51,52,53,54,55,56,57,58,59,60];
				const shuffledNumbers = numbers.sort(() => Math.random() - 0.5);
				arr = arr.concat(shuffledNumbers);	
				runtime.globalVars.array_levels_json= JSON.stringify(arr);
				number= arr[level];	
				
			}
			return number;	
		}
		
		
	}

};

self.C3.ScriptsInEvents = scriptsInEvents;

