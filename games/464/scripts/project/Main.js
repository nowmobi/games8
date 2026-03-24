import MainScene from './MainScene.js';
import Block from './Block.js';
import Board from './Board.js';

export let scene = null; // current scene


runOnStartup(async runtime =>
{
	// Code to run on the loading screen.
	// Note layouts, objects etc. are not yet available.

	runtime.getLayout("Game").addEventListener("beforelayoutstart",()=>{
		scene = new MainScene(runtime);
	
	});
	runtime.objects.Board.setInstanceClass(Board);
	runtime.objects.Block.setInstanceClass(Block);
	runtime.addEventListener("beforeprojectstart", () => OnBeforeProjectStart(runtime));
	
});

//Load The Game
function LoadGame(runtime)
{
	runtime.goToLayout("Game");
}

function sendEvent(runtime,eventName)
{
	const evt = runtime.objects.SimpleEvent.createInstance(0);
			evt.instVars.EventName = eventName;
			evt.destroy();
}



//Load Categories.json Before Project Start
async function OnBeforeProjectStart(runtime)
{
	runtime.addEventListener("tick", () => Tick(runtime));
}


function Tick(runtime)
{
	//update the scene.
	if(scene)
	{
		scene.update(runtime);
	}
}
