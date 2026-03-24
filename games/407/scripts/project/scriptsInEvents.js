


const scriptsInEvents = {

	async LoadingEvents_Event1_Act1(runtime, localVars)
	{
		console.log("Version GM 0.1");
	},

	async LoadingEvents_Event5_Act1(runtime, localVars)
	{
		
		var gameName = 'emoji-couple-puzzle';
		var domainName = document.referrer;
		if (domainName == "")
		{
		domainName = window.location.href;
		}
		var domain_parts = domainName.split("://");
		var domain_subparts = domain_parts[1].split("/");
		var hostNames = domain_subparts[0];
		window.open("https://bestgamespot.com?utm_campaign=" + gameName + "&utm_source=" + hostNames + "&utm_medium=game_referral&utm_content=Loader", "_blank");
		
	},

	async GlobalVariable_Event7_Act1(runtime, localVars)
	{
		console.log("Adv is Active");
	},

	async GlobalVariable_Event9_Act1(runtime, localVars)
	{
		console.log("Adv Not Active");
	}

};

self.C3.ScriptsInEvents = scriptsInEvents;

