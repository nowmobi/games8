
export default class WaitUntil{

	

	constructor(condition,completed)
	{
		this.condition = condition;
		this.completed = completed;
		this.isCompelted = false;
	}

	update(_)
	{
		if(this.isCompleted)
		return;
	
		if(this.condition())
		{
			this.isCompleted = true;
			this.completed();
		}
	}

}