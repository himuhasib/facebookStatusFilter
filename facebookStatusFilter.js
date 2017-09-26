class FacebookStatusFilter
{
	constructor() {
		console.log("A watchful protector is watching over you. --Facebook Status Filter");
		this.lastTimeExecuted = 0;
		this.possibleStatusClassNames = ["fbUserContent", "fbUserPost"];
		this.statusClassName = "";
		this.findProperClassName();
	}

	findProperClassName() {
		var len = this.possibleStatusClassNames.length;
		for(var i=0; i<len; i++) {
			var statuses = document.getElementsByClassName(this.possibleStatusClassNames[i]);
			if(statuses.length > 0) {
				this.statusClassName = this.possibleStatusClassNames[i];
				break;
			}
		}
	}

	filter() {
		if(this.statusClassName.length == 0) {
			findProperClassName();
			if(this.statusClassName.length == 0) {
				return;
			}
		}

		if(this.lastTimeExecuted == 0) {
			this.lastTimeExecuted = new Date().getTime();
		} else {
			var time = new Date().getTime();
			if(time - this.lastTimeExecuted < 100) {
				return;
			} else {
				this.lastTimeExecuted = time;
			}
		}

		var statuses = document.getElementsByClassName(this.statusClassName);
		var len = statuses.length;

		for(var i=0; i<len; i++) {
			/*
			if(this.isSpam(this.getText(statuses[i])))
			{
				statuses[i].parentNode.style.display = 'none';
			}
			*/

			if(this.isSponsoredPost(statuses[i])) {
				statuses[i].style.display = 'none';
			}
		}
	}

	isSponsoredPost(obj) {
		var text = obj.innerText;
		var pattern = new RegExp("(S|s)ponsored");
		return pattern.test(text);
	}


	getText(obj) {
		//return obj.textContent || obj.innterText || ""; //it can be done this way too.
		var child = obj.firstChild;

		if(child != null) {
			if(child.nodeName == "P") {
				// paragraph
				// most likely the status is here

				return child.textContent || child.innterText || "";
			} else {
				// div
				// most likely the paragraph is inside it.
				return this.getText(child);
			}
		} else {
			return "";
		}
	}

	isSpam(text) {
		return true;
	}
}


MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
var facebookStatusFilter = new FacebookStatusFilter();
var observer = new MutationObserver(function(mutations, observer) {
	// Fired when a change occurs
	facebookStatusFilter.filter();
});

observer.observe(document, {
	subtree: true,
	attributes: true
});
