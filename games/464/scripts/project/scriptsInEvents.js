import {scene} from './Main.js';

export function getScene()
{
	return scene;
}


const scriptsInEvents = {

	async Egame_Event8_Act3(runtime, localVars)
	{
		getScene().onTouchDown(runtime.globalVars.TouchX,runtime.globalVars.TouchY);
	},

	async Egame_Event9_Act3(runtime, localVars)
	{
		getScene().onTouchDragging(runtime.globalVars.TouchX,runtime.globalVars.TouchY);
	},

	async Egame_Event10_Act1(runtime, localVars)
	{
		getScene().onTouchUp(runtime.globalVars.TouchX,runtime.globalVars.TouchY);
	},

	async Egame_Event21_Act7(runtime, localVars)
	{
		console.log('show game over panel');
	}

};

self.C3.ScriptsInEvents = scriptsInEvents;

