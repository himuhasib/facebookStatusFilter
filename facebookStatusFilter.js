console.log("A watchful protector is watching over YOU!!!");


MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

var myFilter = new facebookStatusFilter();


var observer = new MutationObserver(function(mutations, observer) {
	// Fired when a change occurs
	myFilter.filter();
});

observer.observe(document, {
	subtree: true,
	attributes: true
});









function facebookStatusFilter()
{
	this.lastTimeExecuted = 0;

	this.filter = function()
	{
		if(this.lastTimeExecuted == 0)
		{
			this.lastTimeExecuted = new Date().getTime();
		}
		else
		{
			var time = new Date().getTime();
			if(time - this.lastTimeExecuted < 100)
			{
				return;
			}
			else
			{
				this.lastTimeExecuted = time;
			}
		}

		var status = document.getElementsByClassName("fbUserPost");

		var len = status.length;

		for(var i=0; i<len; i++)
		{
			/*
			if(this.isSpam(this.getText(status[i])))
			{
				status[i].parentNode.style.display = 'none';
			}
			*/

			if(this.isSponsoredPost(status[i]))
			{
				status[i].style.display = 'none';
			}
		}
	}

	this.isSponsoredPost = function(obj)
	{
		var text = obj.innerText;
		var pattern = new RegExp("(S|s)ponsored");
		return pattern.test(text);
	}


	this.getText = function(obj)
	{
		//return obj.textContent || obj.innterText || ""; //it can be done this way too.
		var child = obj.firstChild;

		if(child != null)
		{
			if(child.nodeName == "P")
			{
				// paragraph
				// most likely the status is here

				return child.textContent || child.innterText || "";
			}
			else
			{
				// div
				// most likely the paragraph is inside it.
				return this.getText(child);
			}
		}
		else
		{
			return "";
		}
		
	}


	this.isSpam = function(text)
	{
		return true;
	}

}
