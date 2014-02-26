define(['services/datacontext', 'services/model-data'], function(datacontext, modelData){
	var socials = ko.observableArray([]);
	return {
		activate: function(){			
		},
		socials: modelData.socials
	}
});