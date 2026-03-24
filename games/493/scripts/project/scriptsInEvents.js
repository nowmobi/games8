


const scriptsInEvents = {

	async Ads_Event5_Act1(runtime, localVars)
	{
		FBInstant.loadBannerAdAsync(
		  '280093117844519_280093994511098'
		).then(() => {
		  runtime.globalVars.banner_load = 1;
		
		});
	}

};

self.C3.ScriptsInEvents = scriptsInEvents;

